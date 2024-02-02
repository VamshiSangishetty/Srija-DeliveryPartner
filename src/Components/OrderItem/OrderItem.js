import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ButtonText from '../ButtonText/ButtonText';
import { useNavigation } from '@react-navigation/native';

function OrderItem({ order }) {
  const navigation = useNavigation();

  const orderDate = new Date(order.createdAt);

  const formattedOrderDate = orderDate.toLocaleString('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const onAcceptPress = () => {
    navigation.navigate('OrderDetail',{id:order.id});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Order Details:</Text>
      <Text style={styles.orderDate}>Order Date: {formattedOrderDate}</Text>
      <Text style={styles.head}>Total: ₹ {order.total}</Text>
      <Text style={styles.head}>Order Items:</Text>
      {order.orderItems.map((item) => (
        <Text key={item.id} style={styles.orderItem}>
        {item.productName} ({item.weight}KG) -{' '}
        <Text style={{ fontWeight: 'bold' }}>₹{item.amount}</Text>
      </Text>
      ))}
      <View style={{ marginTop: 20 }}>
        <ButtonText text='Open' onPress={onAcceptPress} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 18,
    height: 'auto',
    width: 'auto',
  },
  head: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  text: {
    marginBottom: 4,
  },
  orderItem: {
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 6,
  },
  orderDate: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default OrderItem;
