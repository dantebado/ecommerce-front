import axios from "axios";
import {
  Address,
  AddressGeoCodingResponse,
  AddressGeoCodingResult,
  Cart,
  IndividualPurchase,
  Page,
  Payment,
  Product,
  ProductCategory,
  ProductReview,
  Purchase,
  Shipment,
  User,
} from "../interface/misc.model";

const API_ROOT = process.env.NEXT_PUBLIC_ROOT_API;

export interface Wrapper<T> {
  data: T;
}

export function queryProducts(
  page: number,
  category: string | number,
  query: string | number,
  tag: string
): Promise<Wrapper<Page<Product>>> {
  return axios.get(
    API_ROOT +
      `/products/?page=${page}${category ? "&category=" + category : ""}${
        tag ? "&tag=" + tag : ""
      }${query ? "&search=" + query : ""}`
  );
}

export function retrieveProduct(
  productId: number | string
): Promise<Wrapper<Product>> {
  return axios.get(API_ROOT + `/products/${productId}`);
}

export function retrieveCategories(): Promise<Wrapper<Page<ProductCategory>>> {
  return axios.get(API_ROOT + `/products/categories?page=1`);
}

export function retrieveCategory(
  categoryId: string | number
): Promise<Wrapper<ProductCategory>> {
  return axios.get(API_ROOT + `/products/categories/${categoryId}`);
}

export function retrieveProductReviews(
  productId: number | string
): Promise<Wrapper<Page<ProductReview>>> {
  return axios.get(API_ROOT + `/products/${productId}/reviews`);
}

export function createProductReview(
  productId: number | string,
  payload: ProductReview | any
): Promise<Wrapper<ProductReview>> {
  return axios.post(API_ROOT + `/products/${productId}/new_review/`, payload);
}

export function createCart(): Promise<Wrapper<Cart>> {
  return axios.post(API_ROOT + `/carts/`, {});
}

export function retrieveCart(cartId: number | string): Promise<Wrapper<Cart>> {
  return axios.get(API_ROOT + `/carts/${cartId}`);
}

export function addProductToCart(
  cartId: number | string,
  products: { productId: number | string; count: number }[]
): Promise<Wrapper<Cart>> {
  return axios.post(
    API_ROOT + `/carts/${cartId}/products/`,
    products.map((v) => {
      return {
        product: v.productId,
        count: v.count,
      };
    })
  );
}

export function modifyProductInCart(
  cartId: number | string,
  productId: number | string,
  count: number
): Promise<Wrapper<Cart>> {
  return axios.post(API_ROOT + `/carts/${cartId}/products/`, [
    { product: productId, count: count },
  ]);
}

export function createPurchase(
  cartId: number | string,
  shipmentAreaCenter: Address,
  clientsTargetNumber: number
): Promise<Wrapper<Purchase>> {
  return axios.post(API_ROOT + `/purchases/`, {
    cart_id: cartId,
    shipment_area_center: shipmentAreaCenter,
    clients_target: clientsTargetNumber,
  });
}

export function retrievePurchase(
  purchaseIdOrCode: string | number
): Promise<Wrapper<Purchase>> {
  return axios.get(API_ROOT + `/purchases/${purchaseIdOrCode}`);
}

export function createIndividualPurchaseFromPurchase(
  purchaseId: number | string,
  shipmentAddress: Address,
  clientEmail: string
): Promise<Wrapper<IndividualPurchase>> {
  return axios.post(API_ROOT + `/purchases/${purchaseId}/individuals`, {
    client_email: clientEmail,
    shipment_address: shipmentAddress,
  });
}

export function retrieveIndividualPurchase(
  individualPurchaseId: number | string
): Promise<Wrapper<IndividualPurchase>> {
  return axios.get(API_ROOT + `/purchases/individuals/${individualPurchaseId}`);
}

export function retrievePayment(
  paymentId: string | number
): Promise<Wrapper<Payment>> {
  return axios.get(API_ROOT + `/purchases/payments/${paymentId}`);
}

export function processPayment(
  paymentId: string | number,
  payload?: any
): Promise<Wrapper<Payment>> {
  return axios.put(
    API_ROOT + `/purchases/payments/${paymentId}/vendor`,
    payload
  );
}

export function retrieveShipment(
  shipmentId: string | number
): Promise<Wrapper<Shipment>> {
  return axios.get(API_ROOT + `/purchases/shipments/${shipmentId}`);
}

export function checkUserExistence(email: string) {
  return axios.get(API_ROOT + `/users/${email}`);
}

export function signupUser(payload, token) {
  return axios.post(API_ROOT + `/users/new/`, payload, {
    headers: {
      Authorization: token,
    },
  });
}

export function retrieveUserDetails(email: string, token: string) {
  return axios.get(API_ROOT + `/users/profile/${email}`, {
    headers: {
      Authorization: token,
    },
  });
}

export function retrieveUserHistory(email: string, token: string) {
  return axios.get(API_ROOT + `/purchases/${email}/history`, {
    headers: {
      Authorization: token,
    },
  });
}

export function updateUserDetails(email: string, token: string, payload: any) {
  return axios.put(API_ROOT + `/users/profile/${email}`, payload, {
    headers: {
      Authorization: token,
    },
  });
}

export function applyCouponToPayment(
  paymentId: string | number,
  couponAlias: string
) {
  const couponId = couponAlias.toUpperCase();
  return axios.put(API_ROOT + `/purchases/payments/${paymentId}/coupon`, {
    coupon_id: couponId,
  });
}

// UTILS

const addressToGeocodeQuery = (address: Address) => {
  return (
    address.address_line +
    (address.city ? `, ${address.city}` : "") +
    (address.state ? `, ${address.state}` : "") +
    (address.country ? `, ${address.country}` : "")
  );
};

export const geocodeAddress = async (
  address: Address
): Promise<AddressGeoCodingResult> => {
  if (!address.address_line) return;
  let query = addressToGeocodeQuery(address);
  let results = await axios.get<AddressGeoCodingResponse>(
    `/api/gc?query=${query}`
  );
  return new Promise((resolve, reject) => {
    if (results.data.data.length !== 1)
      reject({ resultCount: results.data.data.length });
    resolve(results.data.data[0]);
  });
};
