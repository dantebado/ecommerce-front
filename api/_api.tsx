import axios from "axios";
import { Address, AddressGeoCodingResponse, AddressGeoCodingResult, Cart, IndividualPurchase, Page, Payment, Product, ProductCategory, ProductReview, Purchase, Shipment, User } from "../interface/misc.model";

const API_ROOT = process.env.NEXT_PUBLIC_ROOT_API

export interface Wrapper<T> {
  data: T
}

export function queryProducts(page: number): Promise<Wrapper<Page<Product>>> {
  return axios.get(API_ROOT + `/products/?page=${page}`)
}

export function retrieveProduct(productId: number | string): Promise<Wrapper<Product>> {
  return axios.get(API_ROOT + `/products/${productId}`)
}

export function retrieveCategories(): Promise<Wrapper<Page<ProductCategory>>> {
  return axios.get(API_ROOT + `/products/categories?page=1`)
}

export function retrieveCategory(categoryId: string | number): Promise<Wrapper<ProductCategory>> {
  return axios.get(API_ROOT + `/products/categories/${categoryId}`)
}

export function retrieveProductReviews(productId: number | string): Promise<Wrapper<Page<ProductReview>>> {
  return axios.get(API_ROOT + `/products/${productId}/reviews`)
}

export function createProductReview(productId: number | string, payload: ProductReview): Promise<Wrapper<ProductReview>> {
  return axios.post(API_ROOT + `/products/${productId}/reviews/`, payload)
}

export function createCart(): Promise<Wrapper<Cart>> {
  return axios.post(API_ROOT + `/carts/`, {})
}

export function retrieveCart(cartId: number | string): Promise<Wrapper<Cart>> {
  return axios.get(API_ROOT + `/carts/${cartId}`)
}

export function addProductToCart(cartId: number | string, products : {productId:number | string, count:number}[]): Promise<Wrapper<Cart>> {
  return axios.post(API_ROOT + `/carts/${cartId}/products/`, products.map((v, i, a) => {
    return {
      product: v.productId,
      count: v.count
    }
  }))
}

export function modifyProductInCart(cartId: number | string, productId: number | string, count: number): Promise<Wrapper<Cart>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: cartId,
      created_at: (new Date()).toString(),
      products: [
        {
          product: 4498,
          count: 1
        }
      ],
      total: 1300,
      is_locked: false
    }})
  })
}

export function createPurchase(cartId: number | string, shipmentAreaCenter:Address, clientsTargetNumber:number): Promise<Wrapper<Purchase>> {
  return axios.post(API_ROOT + `/purchases/`, {cart_id: cartId, shipment_area_center:shipmentAreaCenter, clients_target:clientsTargetNumber})
}

export function retrievePurchase(purchaseIdOrCode: string | number): Promise<Wrapper<Purchase>> {
  return axios.get(API_ROOT + `/purchases/${purchaseIdOrCode}`)
}

export function createIndividualPurchaseFromPurchase(purchaseId: number|string, shipmentAddress:Address): Promise<Wrapper<IndividualPurchase>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: 88979700,
      client: {
        id: 94940,
        email: 'dantebado@gmail.com'
      },
      purchase: {
        id: 9848,
        creation_date: (new Date()).toString(),
        expiration_date: new Date('2021-03-01'),
        status: 'pending-initial-payment',
        clients_target: 2,
        current_confirmed_clients: 0,
        clients_left: 2,
        clients_target_reached: false,
        shipment_area_center: {country:'Argentina', address_line:'Cuenca 2469', floor_apt: '', state:'CABA', city:'CABA'},
        shipment_area_radius: 5,
        cart: {
          id: 123,
          created_at: (new Date()).toString(),
          products: [
            {
              product: 4498,
              count: 1
            }
          ],
          total: 1300,
          is_locked: false
        },
        cart_price: 1300,
        discount_amount: 0,
        amount_to_pay: 1300,
      },
      shipment: {
        id: 4987,
        status: 'awaiting-payment',
        shipmentAddress: {country:'Argentina', address_line:'Cuenca 2469', floor_apt: '', state:'CABA', city:'CABA'},
        individualPurchase: 88979700
      },
      payment: {
        id: 58588,
        individualPurchase: 9848,
        status: 'pending'
      }
    }})
  })
}

export function retrieveIndividualPurchase(individualPurchaseId: number | string): Promise<Wrapper<IndividualPurchase>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: individualPurchaseId,
      client: {
        email: 'dantebado@gmail.com',
        id: 94980
      },
      purchase: {
        id: 9848,
        creation_date: (new Date()).toString(),
        expiration_date: new Date('2021-03-01'),
        status: 'pending-initial-payment',
        clients_target: 2,
        current_confirmed_clients: 0,
        clients_left: 2,
        clients_target_reached: false,
        shipment_area_center: {country:'Argentina', address_line:'Cuenca 2469', floor_apt: '', state:'CABA', city:'CABA'},
        shipment_area_radius: 5,
        cart: {
          id: 123,
          created_at: (new Date()).toString(),
          products: [
            {
              product: 4498,
              count: 1
            }
          ],
          total: 1300,
          is_locked: false
        },
        cart_price: 1300,
        discount_amount: 0,
        amount_to_pay: 1300,
      },
      shipment: {
        id: 4987,
        status: 'awaiting-payment',
        shipmentAddress: {country:'Argentina', address_line:'Cuenca 2469', floor_apt: '', state:'CABA', city:'CABA'},
        individualPurchase: individualPurchaseId
      },
      payment: {
        id: 58588,
        individualPurchase: individualPurchaseId,
        status: 'pending'
      }
    }})
  })
}

export function retrievePayment(paymentId: string | number): Promise<Wrapper<Payment>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: paymentId,
      individualPurchase: 9848,
      status: 'pending'
    }})
  })
}

export function processPayment(paymentId: string | number, payload?: any): Promise<Wrapper<Payment>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: paymentId,
      individualPurchase: 9848,
      status: 'reserved'
    }})
  })
}

export function retrieveShipment(shipmentId: string | number): Promise<Wrapper<Shipment>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: shipmentId,
      status: 'awaiting-payment',
      shipmentAddress: {country:'Argentina', address_line:'Cuenca 2469', floor_apt: '', state:'CABA', city:'CABA'},
      individualPurchase: 65798
    }})
  })
}

export function retrieveUserByEmail(email: string): Promise<Wrapper<User>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      email: email,
      id: 98498
    }})
  })
}

export function createUser(email: string): Promise<Wrapper<User>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: 9879,
      email: email
    }})
  })
}

const addressToGeocodeQuery = (address: Address) => {
  return address.address_line +
    (address.city ? `, ${address.city}` : '') +
    (address.state ? `, ${address.state}` : '') +
    (address.country ? `, ${address.country}` : '')
}

export const geocodeAddress = async (address: Address): Promise<AddressGeoCodingResult> => {
  if (!address.address_line)
    return

  let query = addressToGeocodeQuery(address)

  let results = await axios.get<AddressGeoCodingResponse>(`/api/gc?query=${query}`)
  return new Promise((resolve, reject) => {
    if (results.data.data.length !== 1)
      reject({ resultCount: results.data.data.length })
    resolve(results.data.data[0])
  })
}