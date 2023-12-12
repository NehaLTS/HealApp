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
