export interface Address {
  country: string
  addressLine: string
  floorApt: string
  state: string
  city: string
  postalCode?: string
  commentary?: string

  geocoding?: AddressGeoCodingResult
}

export interface AddressGeoCodingResponse {
  data: AddressGeoCodingResult[]
}

export interface AddressGeoCodingResult {
  latitude: number,
  longitude: number,
  label: string,
  name: string,
  type: string,
  number: string,
  street: string,
  postal_code: string,
  confidence: number,
  region: string,
  region_code: string,
  administrative_area: string,
  neighbourhood: string,
  country: string,
  country_code: string,
  map_url: string
}

export function addressToReadableString(address: Address) {
  return `${address.addressLine}, ${address.floorApt}, CP ${address.postalCode}, ${address.city}, ${address.state}, ${address.country}`
}

export interface Client {
  id: string | number
  email: string
}

export interface ProductCategory {
  id: string | number
  description: string
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
  lastReview?: ProductReview
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
  product: number | string
  count: number
}

export interface Cart {
  id: string | number
  creationDate: Date | string
  //lastUpdateDate: Date | string
  products: ProductInCart[]
  total: number
  isLocked: boolean
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
  cart: Cart  // enviar todo el cart, no el ID
  cartPrice: number
  discountAmount: number  // > 0
  amountToPay: number // cartPrice - discountAmount
}

export interface IndividualPurchase {
  id: string | number
  client: Client  // enviar el objeto
  purchase: Purchase  // enviar el objeto
  shipment: Shipment  // enviar el objeto
  payment: Payment  // enviar el objeto
}

export type PaymentStatus = "pending" | "failed" | "reserved" | "captured"

export interface Payment {
  id: string | number
  individualPurchase: string | number
  status: PaymentStatus
}

export type ShipmentStatus = "awaiting-payment" | "awaiting-purchase-completition" | "aborted" | "pending" | "dispatched" | "delivered"

export interface Shipment {
  id: string | number
  status: ShipmentStatus
  shipmentAddress: Address
  individualPurchase: string | number
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