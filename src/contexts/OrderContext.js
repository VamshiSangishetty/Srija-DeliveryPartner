import React, { createContext, useContext, useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Order,DeliveryPartner } from '../models'; // Assuming you have imported the necessary models
import '@azure/core-asynciterator-polyfill';
import { Auth,Hub } from 'aws-amplify';

const OrderContext = createContext({});

// Inside the OrderContextProvider component
function OrderContextProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [dbUser, setDbUser] = useState(null);
  const [sub, setSub] = useState(null);

  const fetchUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
      const sub =
        user?.attributes?.sub ||
        user?.accessToken?.payload?.sub ||
        user?.username;
      setSub(sub);

      fetchDeliveryPartnerData(sub);
      observeDeliveryPartnerChanges(sub);
    } catch (error) {
      // Handle error fetching user data
    }
  };

  const fetchDeliveryPartnerData = async (sub) => {
    try {
      const deliverypartners = await DataStore.query(DeliveryPartner, (user) =>
        user.sub.eq(sub)
      );
      if (deliverypartners.length > 0) {
        setDbUser(deliverypartners[0]);
      } else {
        setDbUser(null);
      }
    } catch (error) {
      // Handle error fetching customer data
    }
  };

  const observeDeliveryPartnerChanges = async (sub) => {
    let subscription;
    try {
      subscription = DataStore.observe(DeliveryPartner, (model) =>
        model.sub.eq(sub)
      ).subscribe({
        next: (data) => {
          if (data.opType === 'INSERT' || data.opType === 'UPDATE') {
            const updatedCustomer = data.element;
            setDbUser(updatedCustomer);
          }
        },
        error: (error) => {
          // Handle error observing customer changes
        },
      });
    } catch (error) {
      // Handle error subscribing to customer changes
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  };

  useEffect(() => {
    const authListener = (data) => {
      switch (data.payload.event) {
        case 'signIn':
          // Handle sign-in event
          fetchUserData();
          break;
        case 'signOut':
          // Handle sign-out event
          setDbUser(null);
          break;
        default:
          break;
      }
    };

    Hub.listen('auth', authListener);

    return () => {
      Hub.remove('auth', authListener);
    };
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders
        await DataStore.query(Order, (o) => o.dpName.eq(dbUser.name))
  .then((orders) => {
    const filteredOrders = orders.filter((o) => o.status !== "DELIVERED");
    setOrders(filteredOrders);
  });
   
      } catch (error) {
      }
    };

    fetchOrders();

    const subscription = DataStore.observe(Order).subscribe(() => {
      fetchOrders();
    });

    return () => subscription.unsubscribe();
  }, [sub,dbUser]);

  return (
    <OrderContext.Provider value={{ orders }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContextProvider;
export const useOrderContext = () => useContext(OrderContext);
