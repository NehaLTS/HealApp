import { UseClientUserContext } from "contexts/UseClientUserContext";
import { BodyInit, HeadersInit } from "./api/ApiTypes";
import { sendRequest } from "./api/RequestHandler";
import {
  GET,
  GET_AD_BANNER,
  GET_SEARCH_PROVIDER,
  GET_TREATMENT_MENU,
  ORDER_PROVIDER,
  POST,
} from "./constants/ApiConstants";
import {
  Banner,
  order_provider,
  search_provider,
  treatment,
} from "./types/ProvierTypes";

export const ClientOrderServices = () => {
    const { token } =
    UseClientUserContext();
  const getBannerAds = (): Promise<Banner[]> =>
    sendRequest(GET_AD_BANNER, {
      method: GET,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
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
        "Content-Type": "application/json",
        "x-access-token": token,
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
    TotalCost: string;
    menu_id: string;
    reason: string;
  }): Promise<order_provider> =>
    sendRequest(ORDER_PROVIDER, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
              } as unknown as HeadersInit,
    });

  const handlePayment = (body: {}): void => {};

  const treatmentMenu = (body: {
    provider_type_id: string;
  }): Promise<treatment[]> =>
    sendRequest(GET_TREATMENT_MENU, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
            } as unknown as HeadersInit,
    });

  return {
    getBannerAds,
    treatmentMenu,
    searchProviders,
    orderProvider,
  };
};
