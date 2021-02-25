import { Address } from "cluster";
import { stringify } from "querystring";
import { Cart, IndividualPurchase, Page, Payment, Product, ProductCategory, ProductReview, Purchase, Shipment, User } from "../interface/misc.model";

export function queryProducts(page: number): Promise<Page<Product>> {
  return new Promise(() => {
    return {
      count: 2,
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
            date: new Date()
          }
        },
      ]
    }
  })
}

export function retrieveProduct(productId: number | string): Promise<Product> {
  return new Promise(() => {
    return {
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
      currentStock: 206,
    }
  })
}

export function retrieveCategories(): Promise<ProductCategory[]> {
  return new Promise(() => {
    return [
      {
        id: 879,
        name: 'Verdura'
      },
      {
        id: 740,
        name: 'Fruta'
      }
    ]
  })
}

export function retrieveCategory(categoryId: string | number): Promise<ProductCategory> {
  return new Promise(() => {
    return {
      id: categoryId,
      name: 'Fruta'
    }
  })
}

export function retrieveProductReviews(productId: number | string): Promise<Page<ProductReview>> {
  return new Promise(() => {
    return [
      {
        id: 498,
        authorName: 'Diego',
        commentary: 'Hola este es mi comentario sobre la papa',
        rating: 4,
        date: new Date()
      },
      {
        id: 849,
        authorName: 'Diego',
        commentary: 'Hola este es mi comentario sobre la papa',
        rating: 4,
        date: new Date()
      },
      {
        id: 577,
        authorName: 'Diego',
        commentary: 'Hola este es mi comentario sobre la papa',
        rating: 4,
        date: new Date()
      },
    ]
  })
}

export function createProductReview(productId: number | string, payload: ProductReview): Promise<ProductReview> {
  return new Promise(() => { return {...payload, id: 588} })
}

export function createCart(): Promise<Cart> {
  return new Promise(() => {
    return {
      id: 9879,
      creationDate: new Date(),
      lastUpdateDate: new Date(),
      products: [],
      productsPrice: 0,
      locked: false
    }
  })
}

export function retrieveCart(cartId: number | string): Promise<Cart> {
  return new Promise(() => {
    return {
      id: cartId,
      creationDate: new Date(),
      lastUpdateDate: new Date(),
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
    }
  })
}

export function addProductToCart(cartId: string, products : {productId:number | string, count:number}[]): Promise<Cart> {
  return new Promise(() => {
    return {
      id: cartId,
      creationDate: new Date(),
      lastUpdateDate: new Date(),
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
    }
  })
}

export function modifyProductInCart(cartId: string, productId: number | string, count: number): Promise<Cart> {
  return new Promise(() => {
    return {
      id: cartId,
      creationDate: new Date(),
      lastUpdateDate: new Date(),
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
    }
  })
}

export function createPurchase(cartId:string, shipmentAreaCenter:Address, clientsTargetNumber:number): Promise<Purchase> {
  return new Promise(() => {
    return {
      id: 9848,
      creationDate: new Date(),
      expirationDate: new Date('2021-03-01'),
      status: 'pending-initial-payment',
      clientsTarget: clientsTargetNumber,
      currentConfirmedClients: 0,
      clientsLeft: clientsTargetNumber,
      clientsTargetReached: false,
      shipmentAreaCenter: shipmentAreaCenter,
      shipmentAreaRadius: 5,
      cart: {
        id: cartId,
        creationDate: new Date(),
        lastUpdateDate: new Date(),
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
    }
  })
}

export function retrievePurchase(purchaseIdOrCode: string | number): Promise<Purchase> {
  return new Promise(() => {
    return {
      id: 9848,
      creationDate: new Date(),
      expirationDate: new Date('2021-03-01'),
      status: 'pending-initial-payment',
      clientsTarget: 2,
      currentConfirmedClients: 0,
      clientsLeft: 2,
      clientsTargetReached: false,
      shipmentAreaCenter: {country:'Argentina', address:'Cuenca 2469', state:'CABA', city:'CABA'},
      shipmentAreaRadius: 5,
      cart: {
        id: 123,
        creationDate: new Date(),
        lastUpdateDate: new Date(),
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
    }
  })
}

export function createIndividualPurchaseFromPurchase(purchaseId: number|string, shipmentAddres:Address): Promise<IndividualPurchase> {
  return new Promise(() => {
    return {
      id: 88979700,
      client: {
        email: 'dantebado@gmail.com'
      },
      purchase: {
        id: 9848,
        creationDate: new Date(),
        expirationDate: new Date('2021-03-01'),
        status: 'pending-initial-payment',
        clientsTarget: 2,
        currentConfirmedClients: 0,
        clientsLeft: 2,
        clientsTargetReached: false,
        shipmentAreaCenter: {country:'Argentina', address:'Cuenca 2469', state:'CABA', city:'CABA'},
        shipmentAreaRadius: 5,
        cart: {
          id: 123,
          creationDate: new Date(),
          lastUpdateDate: new Date(),
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
        shipmentAddress: {country:'Argentina', address:'Cuenca 2469', state:'CABA', city:'CABA'}
      },
      payment: {
        id: 58588,
        individualPurchaseId: 9848,
        status: 'pending'
      }
    }
  })
}

export function retrieveIndividualPurchase(individualPurchaseId: number | string): Promise<IndividualPurchase> {
  return new Promise(() => {
    return {
      id: individualPurchaseId,
      client: {
        email: 'dantebado@gmail.com'
      },
      purchase: {
        id: 9848,
        creationDate: new Date(),
        expirationDate: new Date('2021-03-01'),
        status: 'pending-initial-payment',
        clientsTarget: 2,
        currentConfirmedClients: 0,
        clientsLeft: 2,
        clientsTargetReached: false,
        shipmentAreaCenter: {country:'Argentina', address:'Cuenca 2469', state:'CABA', city:'CABA'},
        shipmentAreaRadius: 5,
        cart: {
          id: 123,
          creationDate: new Date(),
          lastUpdateDate: new Date(),
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
        shipmentAddress: {country:'Argentina', address:'Cuenca 2469', state:'CABA', city:'CABA'}
      },
      payment: {
        id: 58588,
        individualPurchaseId: individualPurchaseId,
        status: 'pending'
      }
    }
  })
}

export function retrievePayment(paymentId: string | number): Promise<Payment> {
  return new Promise(() => {
    return {
      id: paymentId,
      individualPurchaseId: 9848,
      status: 'pending'
    }
  })
}

export function processPayment(paymentId: string | number, payload?: any): Promise<Payment> {
  return new Promise(() => {
    return {
      id: paymentId,
      individualPurchaseId: 9848,
      status: 'reserved'
    }
  })
}

export function retrieveShipment(shipmentId: string | number): Promise<Shipment> {
  return new Promise(() => {
    return {
      id: shipmentId,
      status: 'awaiting-payment',
      shipmentAddress: {country:'Argentina', address:'Cuenca 2469', state:'CABA', city:'CABA'}
    }
  })
}

export function retrieveUserByEmail(email: string): Promise<User> {
  return new Promise(() => {
    return {
      email: email
    }
  })
}

export function createUser(email: string): Promise<User> {
  return new Promise(() => {
    return {
      id: 9879,
      email: email
    }
  })
}