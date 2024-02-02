// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "CUTTING": "CUTTING",
  "ON_THE_WAY": "ON_THE_WAY",
  "DELIVERED": "DELIVERED",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP"
};

const { DeliveryPartner, CartProduct, Order, Customer, Product, OrderProduct } = initSchema(schema);

export {
  DeliveryPartner,
  CartProduct,
  Order,
  Customer,
  Product,
  OrderStatus,
  OrderProduct
};