export interface Address {
  country: string
  address: string
  state: string
  city: string
  postalCode?: string
  commentary?: string
}

export function addressToReadableString(address: Address) {
  return `${address.address}, CP ${address.postalCode}, ${address.city}, ${address.state}, ${address.country}`
}

export interface Client {
  id: string | number
  email: string
}

export interface ProductCategory {
  id: string | number
  name: string
}

export interface Product {
  id: string | number
  displayName: string
  description: string
  featuredPhotoURL: string
  photosURL: string[]
  unitaryPrice: number // supuesto, todo esta en la misma moneda, no es un negocio internacional
  measureUnit: string // unidad / kg / atado / planta
  tags: string[]
  category: ProductCategory
  currentStock: number
  firstReview?: ProductReview
}

export interface ProductReview {
  id: string | number
  authorName: string
  commentary: string
  rating: number // 1 - 5
  date: Date | string
}

export interface ProductInCart {
  id: string | number
  product: Product
  count: number
}

export interface Cart {
  id: string | number
  creationDate: Date | string
  lastUpdateDate: Date | string
  products: ProductInCart[]
  productsPrice: number
  locked: boolean
}

export type PurchaseStatus = "awaiting-peers" | "pending-initial-payment" | "completed" | "cancelled" | "expired"

export interface Purchase {
  id: string | number
  creationDate: Date | string
  expirationDate: Date | string
  status: PurchaseStatus
  clientsTarget: number
  currentConfirmedClients: number // los que YA pagaron
  clientsLeft: number
  clientsTargetReached: boolean
  shipmentAreaCenter: Address
  shipmentAreaRadius: number // harcodearlo en el back al crear [kms]
  cart: Cart
  cartPrice: number
  discountAmount: number
  amountToPay: number
  shareCode: string
}

export interface IndividualPurchase {
  id: string | number
  client: Client
  purchase: Purchase
  shipment: Shipment
  payment: Payment
}

export type PaymentStatus = "pending" | "failed" | "reserved" | "captured"

export interface Payment {
  id: string | number
  individualPurchaseId: string | number
  status: PaymentStatus
}

export type ShipmentStatus = "awaiting-payment" | "awaiting-purchase-completition" | "aborted" | "pending" | "dispatched" | "delivered"

export interface Shipment {
  id: string | number
  status: ShipmentStatus
  shipmentAddress: Address
  individualPurchaseId: string | number
}

export interface Page<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}

export interface User {
  id: number | string
  email: string
}