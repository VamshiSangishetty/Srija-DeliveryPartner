import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Linking, TouchableOpacity, Alert } from 'react-native';
import ButtonText from '../../Components/ButtonText/ButtonText';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Order, Customer,DeliveryPartner } from '../../models';
import { DataStore } from 'aws-amplify';
import * as Location from 'expo-location'; 
import CustomButton from '../../Components/AuthenticationComponents/CustomButton';
import { ScrollView } from 'react-native';

const StatusEnum = {
  ON_THE_WAY:"ON_THE_WAY",
  DELIVERED: 'DELIVERED',
};

function OrderDetailsScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const fetchOrderWithCustomer = async () => {
      try {
        const orderResult = await DataStore.query(Order, id);
        setOrder(orderResult);

        const customerId = orderResult.customerID;
        const customerResult = await DataStore.query(Customer, customerId);
        setCustomer(customerResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOrderWithCustomer();

    const subscription = DataStore.observe(Order, id).subscribe(() => {
      fetchOrderWithCustomer();
    });

    return () => subscription.unsubscribe();
  }, [id]);

  useEffect(() => {
    const subscribeToLocationUpdates = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Location permission not granted');
        }

        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          location => {
            setCurrentLocation(location.coords);
          }
        );

        return () => {
          if (locationSubscription) {
            locationSubscription.remove();
          }
        };
      } catch (error) {
        console.error('Error subscribing to location updates:', error);
      }
    };

    subscribeToLocationUpdates();
  }, []);

  const handleCall = () => {
    Linking.openURL(`tel:${customer.phoneNumber}`);
  };

  const updateOrderStatusToOnTheWay = async () => {
    try {
      await DataStore.save(Order.copyOf(order, (updated) => {
        updated.status = StatusEnum.ON_THE_WAY;
      }));
    } catch (error) {
      Alert.alert('Failed to update order status. Please try again later.');
    }
  };
  

  const handleShowDirections = () => {
    const destinationLatitude = order.latitude;
    const destinationLongitude = order.longitude;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destinationLatitude},${destinationLongitude}`;
    updateOrderStatusToOnTheWay();

    Linking.openURL(url);
  };

  const onCompleteOrderPress = async () => {
    // Show a confirmation prompt before completing the order
    Alert.alert(
      'Complete Order',
      'Are you sure you want to complete this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await DataStore.save(Order.copyOf(order, (updated) => {
                updated.status = StatusEnum.DELIVERED;
              }));
              navigation.goBack();
            } catch (error) {
              Alert.alert('Failed to complete order. Please try again later.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  

  if (!order || !customer || !currentLocation) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView style={styles.page}>
      <Text style={styles.head}>Order Details:</Text>
      <Text style={styles.head}>Total: ₹ {order.total}</Text>
      <Text style={styles.head}>Order Items:</Text>
      {order.orderItems.map((item) => (
        <Text key={item.id} style={styles.item}>{item.productName} - {item.weight} KG = <Text style={{ fontWeight: "bold" }}>₹ {item.amount}</Text></Text>
      ))}
      <Text style={styles.head}>Delivery Details:</Text>
      <Text style={styles.detail}>Name: {customer.name}</Text>
      <TouchableOpacity onPress={handleCall}>
        <Text style={styles.detail}>
          Phone Number:
          <Text style={styles.phone}> {customer.phoneNumber}</Text> (Click to Call)
        </Text>
      </TouchableOpacity>
      <Text style={styles.detail}>Flat no: {customer.flatNo}</Text>
      <Text style={styles.detail}>Street: {customer.street}</Text>
      <Text style={styles.detail}>Area/Landmark: {customer.landmark}</Text>
      <Text style={styles.detail}>Pincode: {customer.pincode}</Text>
      <View style={{ marginTop: 20 }}>
          <ButtonText text="Show Directions" onPress={handleShowDirections} />
          <CustomButton text="Complete Order" onPress={onCompleteOrderPress} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 0,
    padding: 16,
    marginBottom:16
  },
  head: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    marginBottom: 8,
    fontSize: 16,
  },
  detail: {
    marginBottom: 8,
    fontSize: 16,
  },
  phone: {
    marginBottom: 8,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default OrderDetailsScreen;
