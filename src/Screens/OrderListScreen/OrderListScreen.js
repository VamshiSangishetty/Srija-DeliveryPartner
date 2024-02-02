import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView,Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import OrderItem from '../../Components/OrderItem/OrderItem';
import { useOrderContext } from '../../contexts/OrderContext';

// Function to calculate the distance between two lat/lng points using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (angle) => (Math.PI / 180) * angle;
  const R = 6371; // Radius of the Earth in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function OrderListScreen(props) {
  const { orders } = useOrderContext();
  const [deliveryPartnerLocation, setDeliveryPartnerLocation] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    let locationSubscription;

    const fetchDeliveryPartnerLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 10000, distanceInterval: 10 },
        (position) => {
          const { latitude, longitude } = position.coords;
          setDeliveryPartnerLocation({ lat: latitude, lng: longitude });
        }
      );
    };

    if (isFocused) {
      fetchDeliveryPartnerLocation();
    }

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [isFocused]);

  // Calculate the distance between the delivery partner and each customer, and sort the orders based on distance
  const sortedOrders = [...orders].sort((orderA, orderB) => {
    if (!deliveryPartnerLocation) return 0;

    const distanceA = calculateDistance(
      orderA.latitude,
      orderA.longitude,
      deliveryPartnerLocation.lat,
      deliveryPartnerLocation.lng
    );

    const distanceB = calculateDistance(
      orderB.latitude,
      orderB.longitude,
      deliveryPartnerLocation.lat,
      deliveryPartnerLocation.lng
    );

    return distanceA - distanceB;
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      {orders.length > 0 ? (
        sortedOrders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))
      ) : (
        <Text style={styles.message}>No orders are available</Text>
      )}
    </ScrollView>
  );
   
  
      };

const styles = StyleSheet.create({
  page: {
    marginTop: 0,
  },
  message:{
    textAlign:"center",
    fontSize:24,
    color:"red",
  }
});

export default OrderListScreen;
