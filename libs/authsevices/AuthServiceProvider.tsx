import { sendRequest, sendRequestWitoutToken } from '../api/RequestHandler';
import {
  ADD_PROVIDER_SERVICE,
  ADD_SERVICE_WHEN_TREATEMENT_END,
  CREATE_HEALPROVIDER_SERVICES,
  CREATE_PROVIDER_SEVICES,
  CREATE_SIGNUP_PROVIDER,
  FACEBOOK_LOGIN_API,
  GET,
  GET_ORDER_DETAILS,
  GET_ORDER_HISTORY,
  GET_PROVIDER_Payment,
  GET_PROVIDER_PROFILE,
  GET_PROVIDER_REPORT,
  GET_PROVIDER_SERVICE,
  GET_PROVIDER_TYPES,
  GET_USER_SERVICES,
  GOOGLE_LOGIN_API_PROVIDER,
  ORDER_REQUEST,
  PATCH,
  POST,
  PROVIDER_AVAILABILITY,
  PROVIDER_LANGUAGE,
  PROVIDER_SIGNIN,
  PROVIDER_USER_DETAILS,
  REMOVE_SERVICES,
  TREATMENT_COMPLETED,
  UPDATE_PROVIDER_LOCATION,
  UPDATE_PROVIDER_PROFILE,
  UPDATE_SIGNUP_PROVIDER,
} from '../constants/ApiConstants';
import { UserType, UserTypeProvider } from '../types/UserType';
import {
  OrderRequest,
  PoviderLocation,
  ProviderHomeDetails,
  TreatementEnded,
  UpdateProfile,
} from 'libs/types/ProvierTypes';
import { BodyInit, HeadersInit } from '../api/ApiTypes';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';

export const AuthServicesProvider = () => {
  const { token } = UseProviderUserContext();

  const OnProviderSignIn = (body: {
    email: string;
    password: string;
    device_token: string;
  }): Promise<UserTypeProvider> =>
    sendRequest(PROVIDER_SIGNIN, {
      method: POST,
      body: body as unknown as BodyInit,
    });
  const onSubmitGoogleAuthRequestProvider = (body: {
    email: string;
    googleId: string;
    device_token: string;
  }): Promise<any> =>
    sendRequest(GOOGLE_LOGIN_API_PROVIDER, {
      method: POST,
      body: body as unknown as BodyInit,
    });
  const onSubmitFBAuthRequestProvider = (body: {
    email: string;
    facebookId: string;
    device_token: string;
  }): Promise<UserType> =>
    sendRequest(FACEBOOK_LOGIN_API, {
      method: POST,
      body: body as unknown as BodyInit,
    });
  const OnProviderCreateSignUp = (body: {
    email: string;
    password: string;
    device_token: string;
  }): Promise<UserTypeProvider> =>
    sendRequest(CREATE_SIGNUP_PROVIDER, {
      method: POST,
      body: body as unknown as BodyInit,
    });

  const getProviderDaySummary = (
    body: {
      provider_id: string;
      created_date_time: string;
    },
    accessToken: string,
  ): Promise<ProviderHomeDetails> =>
    sendRequest(PROVIDER_USER_DETAILS, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
      } as unknown as HeadersInit,
    });

  const OnUpdateProviderUserDetails = (
    body: {
      firstname: string;
      lastname: string;
      address: string;

      city: string;
      state: string;
      country: string;
      phone_number: string;
      profile_picture: string;
      provider_id: string;
      provider_type_id: string;
      license_number: string;
      upload_license_picture: string;
      bank_name: string;
      branch: string;
      business_registration_number: string;
      account: string;
      specialty_id: string;
      latitude: string;
      longitude: string;
    },
    accessToken: string,
  ): Promise<UserTypeProvider> =>
    sendRequest(UPDATE_SIGNUP_PROVIDER, {
      method: PATCH,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
      } as unknown as HeadersInit,
    });
  const onCreateProviderServices = (
    body: {
      name: string;
      description: string;
      price: string;
      provider_id: string;
      specialty_id: string;
    },
    accessToken: string,
  ): Promise<UserTypeProvider> => {
    console.log('body is ', body);

    return sendRequest(CREATE_PROVIDER_SEVICES, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
      } as unknown as HeadersInit,
    });
  };

  const providerAvailabilityStatus = (
    body: {
      provider_id: string;
      availability: string;
    },
    accessToken: string,
  ): Promise<UserTypeProvider> => {
    console.log('body is ', body);

    return sendRequest(PROVIDER_AVAILABILITY, {
      method: PATCH,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
      } as unknown as HeadersInit,
    });
  };

  const onGetProviderTypes = (accessToken: string): Promise<any> =>
    sendRequest(GET_PROVIDER_TYPES, {
      method: GET,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
      } as unknown as HeadersInit,
    });

  const onGetProviderService = (
    body: {
      provider_id: string;
      specialty_id: string;
    },
    accessToken: string,
  ): Promise<any> =>
    sendRequest(GET_PROVIDER_SERVICE, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
      } as unknown as HeadersInit,
    });

  const onGetUserAllServices = (
    body: {
      provider_id: string;
    },
    accessToken: string,
  ): Promise<any> =>
    sendRequest(GET_USER_SERVICES, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
      } as unknown as HeadersInit,
    });

  const OrderRequst = (body: OrderRequest): Promise<any> =>
    sendRequestWitoutToken(ORDER_REQUEST, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
        //  'x-access-token': userDataProvider?.token 'x-access-token' :   userDataProvider?.token
      } as unknown as HeadersInit,
    });

  const UpdateProviderLocation = (body: PoviderLocation): Promise<any> =>
    sendRequestWitoutToken(UPDATE_PROVIDER_LOCATION, {
      method: PATCH,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
        //  'x-access-token': userDataProvider?.token  'x-access-token' :   userDataProvider?.token
      } as unknown as HeadersInit,
    });

  const AddProviderServices = (body: any, accessToken: string): Promise<any> =>
    sendRequestWitoutToken(CREATE_HEALPROVIDER_SERVICES, {
      method: PATCH,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
        //  'x-access-token': userDataProvider?.token  'x-access-token' :   userDataProvider?.token
      } as unknown as HeadersInit,
    });

  const TreatementEnded = (body: TreatementEnded): Promise<any> =>
    sendRequestWitoutToken(TREATMENT_COMPLETED, {
      method: PATCH,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });

  const OnGetOrderHistory = (
    providerId: number,
    page: number,
    pageSize: number,
  ): Promise<any> =>
    sendRequest(GET_ORDER_HISTORY, {
      method: POST,
      body: {
        provider_id: providerId,
        page: page,
        pageSize: pageSize,
      } as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });
  const OnGetOrderDetails = (orderId: string): Promise<any> =>
    sendRequest(GET_ORDER_DETAILS, {
      method: POST,
      body: { order_id: orderId } as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });
  const UpdateProviderLanguage = (
    provider_id: string,
    language: string,
  ): Promise<any> =>
    sendRequest(PROVIDER_LANGUAGE, {
      method: PATCH,
      body: {
        provider_id: provider_id,
        language: language,
      } as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });
  const UpdateProviderProfile = (body: UpdateProfile): Promise<any> =>
    sendRequestWitoutToken(UPDATE_PROVIDER_PROFILE, {
      method: PATCH,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });

  const GetProviderProfiles = (providerId: string): Promise<any> =>
    sendRequest(GET_PROVIDER_PROFILE, {
      method: POST,
      body: {
        provider_id: providerId,
      } as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });
  const GetProviderReport = (
    providerId: string,
    created_date_time: string,
    filter: string,
  ): Promise<any> =>
    sendRequest(GET_PROVIDER_REPORT, {
      method: POST,
      body: {
        provider_id: providerId,
        created_date_time: created_date_time,
        filter: filter,
      } as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });
  const GetProviderPayment = (
    providerId: string,
    created_date_time: string,
  ): Promise<any> =>
    sendRequest(GET_PROVIDER_Payment, {
      method: POST,
      body: {
        provider_id: providerId,
        created_date_time: created_date_time,
      } as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });

  const removeService = (body: {
    order_id: string;
    services: string;
  }): Promise<any> =>
    sendRequest(REMOVE_SERVICES, {
      method: PATCH,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });

  const addServiceWhenTreatmentEnd = (body: {
    order_id: string;
    services: string;
  }): Promise<any> =>
    sendRequest(ADD_SERVICE_WHEN_TREATEMENT_END, {
      method: PATCH,
      body: body as unknown as BodyInit,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      } as unknown as HeadersInit,
    });

  return {
    OnProviderSignIn,
    onSubmitGoogleAuthRequestProvider,
    onSubmitFBAuthRequestProvider,
    OnProviderCreateSignUp,
    OnUpdateProviderUserDetails,
    onCreateProviderServices,
    onGetProviderTypes,
    onGetProviderService,
    onGetUserAllServices,
    OrderRequst,
    UpdateProviderLocation,
    providerAvailabilityStatus,
    AddProviderServices,
    TreatementEnded,
    getProviderDaySummary,
    OnGetOrderHistory,
    OnGetOrderDetails,
    UpdateProviderLanguage,
    GetProviderProfiles,
    UpdateProviderProfile,
    GetProviderReport,
    GetProviderPayment,
    removeService,
    addServiceWhenTreatmentEnd,
  };
};
