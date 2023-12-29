import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { BodyInit, HeadersInit } from './api/ApiTypes';
import { sendRequest } from './api/RequestHandler';
import {
  ADD_TO_WALLET,
  BOOK_ORDER,
  CLIENT_WALLET_AMOUNT,
  GET,
  GET_AD_BANNER,
  GET_LOCATION_SEARCH,
  GET_SEARCH_LIST,
  GET_SEARCH_PROVIDER,
  GET_TREATMENT_MENU,
  ORDER_CANCEL_FROM_CLIENT,
  ORDER_PAYMENT,
  ORDER_PROVIDER,
  PATCH,
  PAYMENT_FOR_ORDER,
  PAYMENT_HISTORY,
  POST,
  PROVIDER_RATING,
} from './constants/ApiConstants';
import { getLocalData } from './datastorage/useLocalStorage';
import {
  Banner,
  order_provider,
  search_provider,
  treatment,
} from './types/ProvierTypes';
import { AddToWallet, BookOrderRequest, OrderCancelByClient, OrderCancelByClientRespnse, OrderPayment, PaymentHistoryType, PaymentToOrder, ProviderRating } from './types/UserType';
import { Order } from './types/OrderTypes';
const access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsImlhdCI6MTY5ODk4NjY5NCwiZXhwIjoxNjk5MDE5MDk0fQ.6nHvRnfJwgmgnCo0zYLf9yO2kvDIxJ0IZALJCB_PHr0';
export const ClientOrderServices = () => {
  const { token } = UseClientUserContext();
  const getBannerAds = (): Promise<Banner[]> =>
    sendRequest(GET_AD_BANNER, {
      method: GET,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });
  const searchProviders = (body: {
    name: string;
    longitude: string;
    latitude: string;
  }): Promise<search_provider> =>
    sendRequest(GET_SEARCH_PROVIDER, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });

  const searchList = (body: { name: string }): Promise<any> =>
    sendRequest(GET_SEARCH_LIST, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });

  const providerLocationSearch = (body: {
    name: string;
    provider_type_id: string;
    longitude: string;
    latitude: string;
    reqDistance: string;
  }): Promise<any> =>
    sendRequest(GET_LOCATION_SEARCH, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
        // "x-access-token":
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQsImlhdCI6MTY5ODkwMDAyNiwiZXhwIjoxNjk4OTMyNDI2fQ.zBxGmTVHvOSwYAOdiHgZTUKyVu2CVZFg4xac5RtKo48",
      } as unknown as HeadersInit,
    });

  const orderProvider = (body: {
    client_id: string;
    patient_type: string;
    patient_name: string;
    address: string;
    city: string;
    phonenumber: string;
    Date_of_birth: string;
    services: string;
    symptoms: string;
    Additional_notes: string;
    Estimate_arrival: string;
    Instructions_for_arrival: string;
    Payment_mode: string;
    latitude: string;
    longitude: string;
    provider_type_id: string;
    TotalCost: string;
    service_charge: string,
    total_order_price: string
    currency: string
  }): Promise<Order> =>
    sendRequest(ORDER_PROVIDER, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });

  const handlePayment = (body: {}): void => { };

  const treatmentMenu = (body: {
    provider_type_id: string;
  }): Promise<treatment> =>
    sendRequest(GET_TREATMENT_MENU, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });

  const BookOrderRequest = (body: BookOrderRequest): Promise<any> =>
    sendRequest(BOOK_ORDER, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });

  const OrderPayment = (body: OrderPayment): Promise<any> =>
    sendRequest(ORDER_PAYMENT, {
      method: PATCH,
      body: body as unknown as BodyInit,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      } as unknown as HeadersInit,
    })

  const ProviderRating = (body: ProviderRating): Promise<any> =>
    sendRequest(PROVIDER_RATING, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      } as unknown as HeadersInit,
    })

  const AddPaymentInWallet = (body: AddToWallet): Promise<any> =>
    sendRequest(ADD_TO_WALLET, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      } as unknown as HeadersInit,
    })


  const OrderCancelFromClient = (body: OrderCancelByClient): Promise<OrderCancelByClientRespnse> =>
    sendRequest(ORDER_CANCEL_FROM_CLIENT, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      } as unknown as HeadersInit,
    })

  const PaymentHistory = (body: { client_id: string }): Promise<PaymentHistoryType[]> =>
    sendRequest(PAYMENT_HISTORY, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      } as unknown as HeadersInit,
    })
  const PaymentForOrder = (body: PaymentToOrder): Promise<any> =>
    sendRequest(PAYMENT_FOR_ORDER, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      } as unknown as HeadersInit,
    })

  const ClientWallentAmount = (body: { client_id: string }): Promise<any> =>
    sendRequest(CLIENT_WALLET_AMOUNT, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      } as unknown as HeadersInit,
    })

  return {
    getBannerAds,
    treatmentMenu,
    searchProviders,
    orderProvider,
    providerLocationSearch,
    BookOrderRequest,
    searchList,
    OrderPayment,
    ProviderRating,
    AddPaymentInWallet,
    OrderCancelFromClient,
    PaymentHistory,
    PaymentForOrder,
    ClientWallentAmount
  };
};
