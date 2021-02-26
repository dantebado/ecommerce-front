import axios from "axios";
import { Address, AddressGeoCodingResponse, AddressGeoCodingResult, Cart, IndividualPurchase, Page, Payment, Product, ProductCategory, ProductReview, Purchase, Shipment, User } from "../interface/misc.model";

export function queryProducts(page: number): Promise<Page<Product>> {
  return new Promise((resolve, reject) => {
    resolve({
      count: 4,
      results: [
        {
          id: 88049,
          displayName: 'Papas Negras',
          description: 'Papas negras',
          featuredPhotoURL: 'http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
          photosURL: ['http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'],
          unitaryPrice: 500,
          measureUnit: 'kg',
          tags: ['papas','verdura'],
          category: {
            id: 879,
            name: 'Verdura'
          },
          currentStock: 100,
        },
        {
          id: 88050,
          displayName: 'Papas Blancas',
          description: 'Papas blancas',
          featuredPhotoURL: 'http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
          photosURL: ['http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'],
          unitaryPrice: 650,
          measureUnit: 'kg',
          tags: ['papas','verdura'],
          category: {
            id: 879,
            name: 'Verdura'
          },
          currentStock: 206,
          firstReview: {
            id: 498,
            authorName: 'Diego',
            commentary: 'Hola este es mi comentario sobre la papa',
            rating: 4,
            date: (new Date()).toString()
          }
        },
        {
          id: 88049,
          displayName: 'Papas Negras',
          description: 'Papas negras',
          featuredPhotoURL: 'http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
          photosURL: ['http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'],
          unitaryPrice: 500,
          measureUnit: 'kg',
          tags: ['papas','verdura'],
          category: {
            id: 879,
            name: 'Verdura'
          },
          currentStock: 100,
        },
        {
          id: 88050,
          displayName: 'Papas Blancas',
          description: 'Papas blancas',
          featuredPhotoURL: 'http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
          photosURL: ['http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'],
          unitaryPrice: 650,
          measureUnit: 'kg',
          tags: ['papas','verdura'],
          category: {
            id: 879,
            name: 'Verdura'
          },
          currentStock: 206,
          firstReview: {
            id: 498,
            authorName: 'Diego',
            commentary: 'Hola este es mi comentario sobre la papa',
            rating: 4,
            date: (new Date()).toString()
          }
        },
      ]
    })
  })
}

export function retrieveProduct(productId: number | string): Promise<Product> {
  return new Promise((resolve, reject) => {
    resolve(
      {
        id: productId,
        displayName: 'Papas Blancas',
        description: 'Papas blancas',
        featuredPhotoURL: 'http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
        photosURL: ['http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'],
        unitaryPrice: 650,
        measureUnit: 'kg',
        tags: ['papas','verdura'],
        category: {
          id: 879,
          name: 'Verdura'
        },
        currentStock: 206
    })
  })
}

export function retrieveCategories(): Promise<ProductCategory[]> {
  return new Promise((resolve, reject) => {
    resolve([
      {
        id: 879,
        name: 'Verdura'
      },
      {
        id: 564,
        name: 'Fruta'
      },
    ])
  })
}

export function retrieveCategory(categoryId: string | number): Promise<ProductCategory> {
  return new Promise((resolve, reject) => {
    resolve({
      id: categoryId,
      name: 'Fruta'
    })
  })
}

export function retrieveProductReviews(productId: number | string): Promise<Page<ProductReview>> {
  return new Promise((resolve, reject) => {
    resolve({
      count: 4,
      results: [{
        id: 498,
        authorName: 'Diego',
        commentary: 'Hola este es mi comentario sobre la papa',
        rating: 4,
        date: (new Date()).toString()
      },
      {
        id: 849,
        authorName: 'Diego',
        commentary: 'Hola este es mi comentario sobre la papa',
        rating: 4,
        date: (new Date()).toString()
      },
      {
        id: 577,
        authorName: 'Diego',
        commentary: 'Hola este es mi comentario sobre la papa',
        rating: 4,
        date: (new Date()).toString()
      },
    ]})
  })
}

export function createProductReview(productId: number | string, payload: ProductReview): Promise<ProductReview> {
  return new Promise((resolve, reject) => {
    resolve({...payload, id: 588})
  })
}

export function createCart(): Promise<Cart> {
  return new Promise((resolve, reject) => {
    resolve({
      id: 9879,
      creationDate: (new Date()).toString(),
      lastUpdateDate: (new Date()).toString(),
      products: [],
      productsPrice: 0,
      locked: false
    })
  })
}

export function retrieveCart(cartId: number | string): Promise<Cart> {
  return new Promise((resolve, reject) => {
    resolve({
      id: cartId,
      creationDate: (new Date()).toString(),
      lastUpdateDate: (new Date()).toString(),
      products: [
        {
          id: 987,
          product: {
            id: 4498,
            displayName: 'Papas Blancas',
            description: 'Papas blancas',
            featuredPhotoURL: 'http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
            photosURL: ['http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'],
            unitaryPrice: 650,
            measureUnit: 'kg',
            tags: ['papas','verdura'],
            category: {
              id: 879,
              name: 'Verdura'
            },
            currentStock: 206,
          },
          count: 2
        }
      ],
      productsPrice: 1300,
      locked: false
    })
  })
}

export function addProductToCart(cartId: number | string, products : {productId:number | string, count:number}[]): Promise<Cart> {
  return new Promise((resolve, reject) => {
    resolve({
      id: cartId,
      creationDate: (new Date()).toString(),
      lastUpdateDate: (new Date()).toString(),
      products: [
        {
          id: 987,
          product: {
            id: 4498,
            displayName: 'Papas Blancas',
            description: 'Papas blancas',
            featuredPhotoURL: 'http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
            photosURL: ['http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'],
            unitaryPrice: 650,
            measureUnit: 'kg',
            tags: ['papas','verdura'],
            category: {
              id: 879,
              name: 'Verdura'
            },
            currentStock: 206,
          },
          count: 2
        }
      ],
      productsPrice: 1300,
      locked: false
    })
  })
}

export function modifyProductInCart(cartId: number | string, productId: number | string, count: number): Promise<Cart> {
  return new Promise((resolve, reject) => {
    resolve({
      id: cartId,
      creationDate: (new Date()).toString(),
      lastUpdateDate: (new Date()).toString(),
      products: [
        {
          id: 987,
          product: {
            id: 4498,
            displayName: 'Papas Blancas',
            description: 'Papas blancas',
            featuredPhotoURL: 'http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
            photosURL: ['http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'],
            unitaryPrice: 650,
            measureUnit: 'kg',
            tags: ['papas','verdura'],
            category: {
              id: 879,
              name: 'Verdura'
            },
            currentStock: 206,
          },
          count: 1
        }
      ],
      productsPrice: 1300,
      locked: false
    })
  })
}

export function createPurchase(cartId: number | string, shipmentAreaCenter:Address, clientsTargetNumber:number): Promise<Purchase> {
  return new Promise((resolve, reject) => {
    resolve({
      id: 9848,
      creationDate: (new Date()).toString(),
      expirationDate: (new Date('2021-03-01')).toString(),
      status: 'pending-initial-payment',
      clientsTarget: clientsTargetNumber,
      currentConfirmedClients: 0,
      clientsLeft: clientsTargetNumber,
      clientsTargetReached: false,
      shipmentAreaCenter: shipmentAreaCenter,
      shipmentAreaRadius: 5,
      cart: {
        id: cartId,
        creationDate: (new Date()).toString(),
        lastUpdateDate: (new Date()).toString(),
        products: [
          {
            id: 987,
            product: {
              id: 4498,
              displayName: 'Papas Blancas',
              description: 'Papas blancas',
              featuredPhotoURL: 'http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
              photosURL: ['http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'],
              unitaryPrice: 650,
              measureUnit: 'kg',
              tags: ['papas','verdura'],
              category: {
                id: 879,
                name: 'Verdura'
              },
              currentStock: 206,
            },
            count: 1
          }
        ],
        productsPrice: 1300,
        locked: false
      },
      cartPrice: 1300,
      discountAmount: 0,
      amountToPay: 1300,
      shareCode: 'code',
    })
  })
}

export function retrievePurchase(purchaseIdOrCode: string | number): Promise<Purchase> {
  return new Promise((resolve, reject) => {
    resolve({
      id: 9848,
      creationDate: (new Date()).toString(),
      expirationDate: (new Date('2021-02-27T23:59')).toString(),
      status: 'awaiting-peers',
      clientsTarget: 2,
      currentConfirmedClients: 0,
      clientsLeft: 2,
      clientsTargetReached: false,
      shipmentAreaCenter: {country:'Argentina', addressLine:'Cuenca 2469', floorApt: '',state:'CABA', city:'CABA'},
      shipmentAreaRadius: 5,
      cart: {
        id: 123,
        creationDate: (new Date()).toString(),
        lastUpdateDate: (new Date()).toString(),
        products: [
          {
            id: 987,
            product: {
              id: 4498,
              displayName: 'Papas Blancas',
              description: 'Papas blancas',
              featuredPhotoURL: 'http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
              photosURL: ['http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'],
              unitaryPrice: 650,
              measureUnit: 'kg',
              tags: ['papas','verdura'],
              category: {
                id: 879,
                name: 'Verdura'
              },
              currentStock: 206,
            },
            count: 1
          }
        ],
        productsPrice: 1300,
        locked: false
      },
      cartPrice: 1300,
      discountAmount: 0,
      amountToPay: 1300,
      shareCode: 'code',
    })
  })
}

export function createIndividualPurchaseFromPurchase(purchaseId: number|string, shipmentAddress:Address): Promise<IndividualPurchase> {
  return new Promise((resolve, reject) => {
    resolve({
      id: 88979700,
      client: {
        id: 94940,
        email: 'dantebado@gmail.com'
      },
      purchase: {
        id: 9848,
        creationDate: (new Date()).toString(),
        expirationDate: new Date('2021-03-01'),
        status: 'pending-initial-payment',
        clientsTarget: 2,
        currentConfirmedClients: 0,
        clientsLeft: 2,
        clientsTargetReached: false,
        shipmentAreaCenter: {country:'Argentina', addressLine:'Cuenca 2469', floorApt: '', state:'CABA', city:'CABA'},
        shipmentAreaRadius: 5,
        cart: {
          id: 123,
          creationDate: (new Date()).toString(),
          lastUpdateDate: (new Date()).toString(),
          products: [
            {
              id: 987,
              product: {
                id: 4498,
                displayName: 'Papas Blancas',
                description: 'Papas blancas',
                featuredPhotoURL: 'http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
                photosURL: ['http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'],
                unitaryPrice: 650,
                measureUnit: 'kg',
                tags: ['papas','verdura'],
                category: {
                  id: 879,
                  name: 'Verdura'
                },
                currentStock: 206,
              },
              count: 1
            }
          ],
          productsPrice: 1300,
          locked: false
        },
        cartPrice: 1300,
        discountAmount: 0,
        amountToPay: 1300,
        shareCode: 'code',
      },
      shipment: {
        id: 4987,
        status: 'awaiting-payment',
        shipmentAddress: {country:'Argentina', addressLine:'Cuenca 2469', floorApt: '', state:'CABA', city:'CABA'},
        individualPurchaseId: 88979700
      },
      payment: {
        id: 58588,
        individualPurchaseId: 9848,
        status: 'pending'
      }
    })
  })
}

export function retrieveIndividualPurchase(individualPurchaseId: number | string): Promise<IndividualPurchase> {
  return new Promise((resolve, reject) => {
    resolve({
      id: individualPurchaseId,
      client: {
        email: 'dantebado@gmail.com',
        id: 94980
      },
      purchase: {
        id: 9848,
        creationDate: (new Date()).toString(),
        expirationDate: new Date('2021-03-01'),
        status: 'pending-initial-payment',
        clientsTarget: 2,
        currentConfirmedClients: 0,
        clientsLeft: 2,
        clientsTargetReached: false,
        shipmentAreaCenter: {country:'Argentina', addressLine:'Cuenca 2469', floorApt: '', state:'CABA', city:'CABA'},
        shipmentAreaRadius: 5,
        cart: {
          id: 123,
          creationDate: (new Date()).toString(),
          lastUpdateDate: (new Date()).toString(),
          products: [
            {
              id: 987,
              product: {
                id: 4498,
                displayName: 'Papas Blancas',
                description: 'Papas blancas',
                featuredPhotoURL: 'http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg',
                photosURL: ['http://2.bp.blogspot.com/-u1tyCT8M5Vg/UN_nwu71hgI/AAAAAAAAEvI/eMYOaW8Q2a0/s1600/vitelotte-noire.jpg'],
                unitaryPrice: 650,
                measureUnit: 'kg',
                tags: ['papas','verdura'],
                category: {
                  id: 879,
                  name: 'Verdura'
                },
                currentStock: 206,
              },
              count: 1
            }
          ],
          productsPrice: 1300,
          locked: false
        },
        cartPrice: 1300,
        discountAmount: 0,
        amountToPay: 1300,
        shareCode: 'code',
      },
      shipment: {
        id: 4987,
        status: 'awaiting-payment',
        shipmentAddress: {country:'Argentina', addressLine:'Cuenca 2469', floorApt: '', state:'CABA', city:'CABA'},
        individualPurchaseId: individualPurchaseId
      },
      payment: {
        id: 58588,
        individualPurchaseId: individualPurchaseId,
        status: 'pending'
      }
    })
  })
}

export function retrievePayment(paymentId: string | number): Promise<Payment> {
  return new Promise((resolve, reject) => {
    resolve({
      id: paymentId,
      individualPurchaseId: 9848,
      status: 'pending'
    })
  })
}

export function processPayment(paymentId: string | number, payload?: any): Promise<Payment> {
  return new Promise((resolve, reject) => {
    resolve({
      id: paymentId,
      individualPurchaseId: 9848,
      status: 'reserved'
    })
  })
}

export function retrieveShipment(shipmentId: string | number): Promise<Shipment> {
  return new Promise((resolve, reject) => {
    resolve({
      id: shipmentId,
      status: 'awaiting-payment',
      shipmentAddress: {country:'Argentina', addressLine:'Cuenca 2469', floorApt: '', state:'CABA', city:'CABA'},
      individualPurchaseId: 65798
    })
  })
}

export function retrieveUserByEmail(email: string): Promise<User> {
  return new Promise((resolve, reject) => {
    resolve({
      email: email,
      id: 98498
    })
  })
}

export function createUser(email: string): Promise<User> {
  return new Promise((resolve, reject) => {
    resolve({
      id: 9879,
      email: email
    })
  })
}

const addressToGeocodeQuery = (address: Address) => {
  return address.addressLine +
    (address.city ? `, ${address.city}` : '') +
    (address.state ? `, ${address.state}` : '') +
    (address.country ? `, ${address.country}` : '')
}

export const geocodeAddress = async (address: Address): Promise<AddressGeoCodingResult> => {
  if (!address.addressLine)
    return

  let query = addressToGeocodeQuery(address)

  let results = await axios.get<AddressGeoCodingResponse>(`/api/gc?query=${query}`)
  return new Promise((resolve, reject) => {
    if (results.data.data.length !== 1)
      reject({ resultCount: results.data.data.length })
    resolve(results.data.data[0])
  })
}