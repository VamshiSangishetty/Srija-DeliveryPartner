import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum OrderStatus {
  NEW = "NEW",
  CUTTING = "CUTTING",
  ON_THE_WAY = "ON_THE_WAY",
  DELIVERED = "DELIVERED",
  READY_FOR_PICKUP = "READY_FOR_PICKUP"
}

type EagerOrderProduct = {
  readonly id?: string | null;
  readonly weight: number;
  readonly amount: number;
  readonly productName: string;
  readonly ProductImage?: string | null;
  readonly orderID?: string | null;
}

type LazyOrderProduct = {
  readonly id?: string | null;
  readonly weight: number;
  readonly amount: number;
  readonly productName: string;
  readonly ProductImage?: string | null;
  readonly orderID?: string | null;
}

export declare type OrderProduct = LazyLoading extends LazyLoadingDisabled ? EagerOrderProduct : LazyOrderProduct

export declare const OrderProduct: (new (init: ModelInit<OrderProduct>) => OrderProduct)

type EagerDeliveryPartner = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DeliveryPartner, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDeliveryPartner = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DeliveryPartner, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DeliveryPartner = LazyLoading extends LazyLoadingDisabled ? EagerDeliveryPartner : LazyDeliveryPartner

export declare const DeliveryPartner: (new (init: ModelInit<DeliveryPartner>) => DeliveryPartner) & {
  copyOf(source: DeliveryPartner, mutator: (draft: MutableModel<DeliveryPartner>) => MutableModel<DeliveryPartner> | void): DeliveryPartner;
}

type EagerCartProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CartProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly weight: number;
  readonly amount: number;
  readonly userSub?: string | null;
  readonly productName?: string | null;
  readonly productImage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCartProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CartProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly weight: number;
  readonly amount: number;
  readonly userSub?: string | null;
  readonly productName?: string | null;
  readonly productImage?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CartProduct = LazyLoading extends LazyLoadingDisabled ? EagerCartProduct : LazyCartProduct

export declare const CartProduct: (new (init: ModelInit<CartProduct>) => CartProduct) & {
  copyOf(source: CartProduct, mutator: (draft: MutableModel<CartProduct>) => MutableModel<CartProduct> | void): CartProduct;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly customerID: string;
  readonly total: number;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly orderItems?: OrderProduct[] | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly dpName?: string | null;
  readonly dpPhone?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly customerID: string;
  readonly total: number;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly orderItems?: OrderProduct[] | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly dpName?: string | null;
  readonly dpPhone?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerCustomer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Customer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly street: string;
  readonly landmark: string;
  readonly pincode: string;
  readonly lat: number;
  readonly lng: number;
  readonly Orders?: (Order | null)[] | null;
  readonly flatNo: string;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCustomer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Customer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly phoneNumber: string;
  readonly street: string;
  readonly landmark: string;
  readonly pincode: string;
  readonly lat: number;
  readonly lng: number;
  readonly Orders: AsyncCollection<Order>;
  readonly flatNo: string;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Customer = LazyLoading extends LazyLoadingDisabled ? EagerCustomer : LazyCustomer

export declare const Customer: (new (init: ModelInit<Customer>) => Customer) & {
  copyOf(source: Customer, mutator: (draft: MutableModel<Customer>) => MutableModel<Customer> | void): Customer;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly description?: string | null;
  readonly weights?: number[] | null;
  readonly price?: number | null;
  readonly isAvailable?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly description?: string | null;
  readonly weights?: number[] | null;
  readonly price?: number | null;
  readonly isAvailable?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}