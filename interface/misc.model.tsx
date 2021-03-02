export interface Address {
  country: string;
  address_line: string;
  floor_apt: string;
  state: string;
  city: string;
  postal_code?: string;
  commentary?: string;

  geocoding?: AddressGeoCodingResult;
}

export interface AddressGeoCodingResponse {
  data: AddressGeoCodingResult[];
}

export interface AddressGeoCodingResult {
  latitude: number;
  longitude: number;
  label: string;
  name: string;
  type: string;
  number: string;
  street: string;
  postal_code: string;
  confidence: number;
  region: string;
  region_code: string;
  administrative_area: string;
  neighbourhood: string;
  country: string;
  country_code: string;
  map_url: string;
  geocoding_result_type: string;
}

export function addressToReadableString(address: Address) {
  return `${address.address_line}, ${address.floor_apt || "---"}, CP ${
    address.postal_code || "---"
  }, ${address.city || "---"}, ${address.state || "---"}, ${
    address.country || "---"
  }`;
}

export interface Client {
  id: string | number;
  email: string;
}

export interface ProductCategory {
  id: string | number;
  description: string;
}

export interface Product {
  id: string | number;
  display_name: string;
  description: string;
  featured_photo_url: string;
  photos_url: { photo: string }[];
  unitary_price: number; // supuesto, todo esta en la misma moneda, no es un negocio internacional
  measure_unit: string; // unidad / kg / atado / planta
  tags: string[];
  category: ProductCategory;
  current_stock: number;
  last_review?: ProductReview;
}

export interface ProductReview {
  id: string | number;
  author_name: string;
  commentary: string;
  rating: number; // 1 - 5
  date: Date | string;
}

export interface ProductInCart {
  product: number | string;
  count: number;
}

export interface Cart {
  id: string | number;
  created_at: Date | string;
  //lastUpdateDate: Date | string
  products: ProductInCart[];
  total: number;
  is_locked: boolean;
}

export type PurchaseStatus =
  | "awaiting-peers"
  | "pending-initial-payment"
  | "completed"
  | "cancelled"
  | "expired";

export interface Purchase {
  id: string | number;
  creation_date: Date | string;
  expiration_date: Date | string;
  status: PurchaseStatus;
  clients_target: number;
  current_confirmed_clients: number; // los que YA pagaron
  clients_left: number;
  clients_target_reached: boolean;
  shipment_area_center: Address;
  shipment_area_radius: number; // harcodearlo en el back al crear [kms]
  cart: Cart; // enviar todo el cart, no el ID
  cart_price: number;
  discount_amount: number; // > 0
  amount: number; // cartPrice - discountAmount
}

export interface IndividualPurchase {
  id: string | number;
  client: Client; // enviar el objeto
  purchase: Purchase; // enviar el objeto
  shipment: Shipment; // enviar el objeto
  payment: Payment; // enviar el objeto
}

export type PaymentStatus = "pending" | "failed" | "reserved" | "captured";

export interface Payment {
  id: string | number;
  individual_purchase_id: string | number;
  status: PaymentStatus;
  amount_to_pay: number;
}

export type ShipmentStatus =
  | "awaiting-payment"
  | "awaiting-purchase-completition"
  | "aborted"
  | "pending"
  | "dispatched"
  | "delivered";

export interface Shipment {
  id: string | number;
  status: ShipmentStatus;
  shipment_address: Address;
  individual_purchase: string | number;
}

export interface Page<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface User {
  id: number | string;
  email: string;
}
