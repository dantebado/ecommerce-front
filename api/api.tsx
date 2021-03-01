import axios from "axios";
import { Address, AddressGeoCodingResponse, AddressGeoCodingResult, Cart, IndividualPurchase, Page, Payment, Product, ProductCategory, ProductReview, Purchase, Shipment, User } from "../interface/misc.model";

export interface Wrapper<T> {
  data: T
}

export function queryProducts(page: number): Promise<Wrapper<Page<Product>>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      count: 4,
      results: [
        {
          id: 88049,
          display_name: 'Papas Negras',
          description: 'Papas negras',
          featured_photo_url: 'https://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
          photos_url: [{photo:'https://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'}],
          unitary_price: 500,
          measure_unit: 'kg',
          tags: ['papas','verdura'],
          category: {
            id: 879,
            description: 'Verdura'
          },
          current_stock: 100,
        },
        {
          id: 88050,
          display_name: 'Papas Blancas',
          description: 'Papas blancas',
          featured_photo_url: 'https://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
          photos_url: [{photo:'https://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'}],
          unitary_price: 650,
          measure_unit: 'kg',
          tags: ['papas','verdura'],
          category: {
            id: 879,
            description: 'Verdura'
          },
          current_stock: 206,
          last_review: {
            id: 498,
            author_name: 'Diego',
            commentary: 'Hola este es mi comentario sobre la papa',
            rating: 4,
            date: (new Date()).toString()
          }
        },
        {
          id: 88049,
          display_name: 'Papas Negras',
          description: 'Papas negras',
          featured_photo_url: 'https://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
          photos_url: [{photo:'https://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'}],
          unitary_price: 500,
          measure_unit: 'kg',
          tags: ['papas','verdura'],
          category: {
            id: 879,
            description: 'Verdura'
          },
          current_stock: 100,
        },
        {
          id: 88050,
          display_name: 'Papas Blancas',
          description: 'Papas blancas',
          featured_photo_url: 'https://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
          photos_url: [{photo:'https://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'}],
          unitary_price: 650,
          measure_unit: 'kg',
          tags: ['papas','verdura'],
          category: {
            id: 879,
            description: 'Verdura'
          },
          current_stock: 206,
          last_review: {
            id: 498,
            author_name: 'Diego',
            commentary: 'Hola este es mi comentario sobre la papa',
            rating: 4,
            date: (new Date()).toString()
          }
        },
      ]
    }})
  })
}

export function retrieveProduct(productId: number | string): Promise<Wrapper<Product>> {
  return new Promise((resolve, reject) => {
    resolve(
      {data:{
        id: productId,
        display_name: 'Papas Blancas',
        description: 'Papas blancas',
        featured_photo_url: 'https://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
        photos_url: [{photo:'https://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'}],
        unitary_price: 650,
        measure_unit: 'kg',
        tags: ['papas','verdura'],
        category: {
          id: 879,
          description: 'Verdura'
        },
        current_stock: 206
    }})
  })
}

export function retrieveCategories(): Promise<Wrapper<ProductCategory[]>> {
  return new Promise((resolve, reject) => {
    resolve({data:[
      {
        id: 879,
        description: 'Verdura'
      },
      {
        id: 564,
        description: 'Fruta'
      },
    ]})
  })
}

export function retrieveCategory(categoryId: string | number): Promise<Wrapper<ProductCategory>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: categoryId,
      description: 'Fruta'
    }})
  })
}

export function retrieveProductReviews(productId: number | string): Promise<Wrapper<Page<ProductReview>>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      count: 4,
      results: [{
        id: 498,
        author_name: 'Diego',
        commentary: 'Hola este es mi comentario sobre la papa',
        rating: 4,
        date: (new Date()).toString()
      },
      {
        id: 849,
        author_name: 'Diego',
        commentary: 'Hola este es mi comentario sobre la papa',
        rating: 4,
        date: (new Date()).toString()
      },
      {
        id: 577,
        author_name: 'Diego',
        commentary: 'Hola este es mi comentario sobre la papa',
        rating: 4,
        date: (new Date()).toString()
      },
    ]}})
  })
}

export function createProductReview(productId: number | string, payload: ProductReview): Promise<Wrapper<ProductReview>> {
  return new Promise((resolve, reject) => {
    resolve({data:{...payload, id: 588}})
  })
}

export function createCart(): Promise<Wrapper<Cart>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: 9879,
      created_at: (new Date()).toString(),
      products: [],
      total: 0,
      is_locked: false
    }})
  })
}

export function retrieveCart(cartId: number | string): Promise<Wrapper<Cart>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: cartId,
      created_at: (new Date()).toString(),
      products: [
        {
          product: 4498,
          count: 2
        }
      ],
      total: 1300,
      is_locked: false
    }})
  })
}

export function addProductToCart(cartId: number | string, products : {productId:number | string, count:number}[]): Promise<Wrapper<Cart>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: cartId,
      created_at: (new Date()).toString(),
      products: [
        {
          product: 4498,
          count: 2
        }
      ],
      total: 1300,
      is_locked: false
    }})
  })
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

export function createPurchase(cartId: number | string, shipment_area_center:Address, clients_targetNumber:number): Promise<Wrapper<Purchase>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: 9848,
      creation_date: (new Date()).toString(),
      expiration_date: (new Date('2021-03-01')).toString(),
      status: 'pending-initial-payment',
      clients_target: clients_targetNumber,
      current_confirmed_clients: 0,
      clients_left: clients_targetNumber,
      clients_target_reached: false,
      shipment_area_center: shipment_area_center,
      shipment_area_radius: 5,
      cart: {
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
      },
      cart_price: 1300,
      discount_amount: 0,
      amount_to_pay: 1300,
    }})
  })
}

export function retrievePurchase(purchaseIdOrCode: string | number): Promise<Wrapper<Purchase>> {
  return new Promise((resolve, reject) => {
    resolve({data:{
      id: 9848,
      creation_date: (new Date()).toString(),
      expiration_date: (new Date('2021-02-27T23:59')).toString(),
      status: 'awaiting-peers',
      clients_target: 2,
      current_confirmed_clients: 0,
      clients_left: 2,
      clients_target_reached: false,
      shipment_area_center: {country:'Argentina', address_line:'Cuenca 2469', floor_apt: '',state:'CABA', city:'CABA'},
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
    }})
  })
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