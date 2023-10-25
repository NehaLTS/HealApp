import { BodyInit, HeadersInit } from "./api/ApiTypes";
import { sendRequest } from "./api/RequestHandler";
import { GET, GET_AD_BANNER } from "./constants/ApiConstants";
import { getLocalData } from "./datastorage/useLocalStorage";
import { Banner } from "./types/ProvierTypes";

export const ClientOrderServices = () => {
  const getBannerAds = (): Promise<Banner> => sendRequest(GET_AD_BANNER, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': getLocalData?.('USER')?.token
    } as unknown as HeadersInit
  });

  const searchProviders = (body: {}): void => { };

  const orderProvider = (body: {}): void => { };

  const handlePayment = (body: {}): void => { };

  return {
    getBannerAds,
  };
};
