import { BodyInit, HeadersInit } from "./api/ApiTypes";
import { sendRequest } from "./api/RequestHandler";
import { GET, GET_AD_BANNER, GET_TREATMENT_MENU } from "./constants/ApiConstants";
import { getLocalData } from "./datastorage/useLocalStorage";
import { Banner, treatment } from "./types/ProvierTypes";

export const ClientOrderServices = () => {
  const getBannerAds = (): Promise<Banner[]> => sendRequest(GET_AD_BANNER, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': getLocalData?.('USER')?.token
      // 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzIsImlhdCI6MTY5ODMwNTAwNiwiZXhwIjoxNjk4MzM3NDA2fQ.MnfVklzQK08PMdI0hBo-HnIpSKqlphwgdoG4ErHegro'
    } as unknown as HeadersInit
  });

  const searchProviders = (body: {}): void => { };

  const orderProvider = (body: {}): void => { };

  const handlePayment = (body: {}): void => { };

  const treatmentMenu = (): Promise<treatment[]> => sendRequest(GET_TREATMENT_MENU, {
    method: GET,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': getLocalData?.('USER')?.token
      // 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzIsImlhdCI6MTY5ODMwNTAwNiwiZXhwIjoxNjk4MzM3NDA2fQ.MnfVklzQK08PMdI0hBo-HnIpSKqlphwgdoG4ErHegro'
    } as unknown as HeadersInit
  });

  return {
    getBannerAds,
    treatmentMenu
  };
};
