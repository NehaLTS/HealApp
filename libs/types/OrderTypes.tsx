export interface Order {
  orderId: string;
  providerDetails: PROVIDERDETAILS;
  orderPrice: string;
  orderStatus: string | null;
  orderServices: Array<OrderServices>;
  message?: string;
}

export interface PROVIDERDETAILS {
  providerId: string;
  providerName: string;
  providerAddress: string;
  providerProfilePicture: string;
  providerRating: string;
  phoneNumber: string;
  currentLatitude: string;
  currentLongitude: string;
}

export interface OrderServices {
  serviceId: string;
  serviceName: string;
  servicePrice: string;
}
export interface ProviderOrder {
  latitude?: string;
  longitude?: string;
  OrderReceive?: ProviderOrderReceive
  onPaymentAprroved?: boolean;
  orderId?: string;
  orderStatus?: string;
  extraData?: extraProps
}

export interface ProviderOrderReceive {
  address: string;

  distance: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  symptoms: any;
  providerId: string;
  services: any;
  time: string;
}

export interface ClientOrder {
  latitude?: string;
  longitude?: string;
  orderId?: string;
  orderStatus?: string;
  treatementEnd?: OnTreatementEnd
}


export interface OnTreatementEnd {
  firstname: string;
  lastname: string;
  services: string;
  total: string;
  currency: string;
}
export interface extraProps {
  isArrived?: boolean;
  isNotification?: boolean;
  isSeeMore?: boolean,
  modalHeight?: number,
  isCancelOrder?: boolean,
  orderAccepted?: boolean,
  totalPrice?: string
}