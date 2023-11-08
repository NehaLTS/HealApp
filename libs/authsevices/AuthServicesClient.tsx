import { sendRequest } from "../api/RequestHandler";
import {
  CREATE_CARD_DETAILS,
  CREATE_SIGNUP,
  CREDITED_CARD_DETAILS,
  FACEBOOK_LOGIN_API,
  GET_CREATE_CARD_DETAILS,
  GOOGLE_LOGIN_API,
  LOGIN_API,
  PATCH,
  PAYMENT_ACCESS_TOKEN,
  POST,
  UPDATE_SIGNUP,
} from "../constants/ApiConstants";
import { ClientProfile, UserType } from "../types/UserType";
import { BodyInit, HeadersInit } from "../api/ApiTypes";
import { UseClientUserContext } from "contexts/UseClientUserContext";

export const AuthServicesClient = () => {
  const { token } =UseClientUserContext();

  /** To provide auth data to server */
  const onSubmitAuthRequest = (body: {
    email: string;
    password: string;
  }): Promise<UserType> =>
    sendRequest(LOGIN_API, {
      method: POST,
      body: body as unknown as BodyInit,
    });

  /** To provide Google auth request to server */
  const onSubmitGoogleAuthRequest = (body: {
    email: string;
    googleId: string;
  }): Promise<any> =>
    sendRequest(GOOGLE_LOGIN_API, {
      method: POST,
      body: body as unknown as BodyInit,
    });

  /** To provide FB auth request to server */
  const onSubmitFBAuthRequest = (body: {
    email: string;
    facebookId: string;
  }): Promise<UserType> =>
    sendRequest(FACEBOOK_LOGIN_API, {
      method: POST,
      body: body as unknown as BodyInit,
    });

  const onCreateSignUp = (body: {
    email: string;
    password: string;
    device_token:string;
  }): Promise<UserType> =>
    sendRequest(CREATE_SIGNUP, {
      method: POST,
      body: body as unknown as BodyInit,
    });

  const onUpdateUserProfile = (
    profile: ClientProfile,
    userId: string
  ): Promise<any> => {
    let body = {
      firstname: profile.firstName,
      lastname: profile.lastName,
      address: profile.address,
      city: profile.city,
      state: profile.state,
      country: profile.country,
      profile_picture: profile.profilePicture,
      date_of_birth: profile.date_of_birth,
      phone_number: profile.phoneNumber,
      client_id: userId,
    };

    console.log("body is *** ",body);
    console.log("token is *** ",token);

    return sendRequest(UPDATE_SIGNUP, {
      method: PATCH,
      body: body as unknown as BodyInit,
      headers: {
        "Content-Type": "application/json",
        "x-access-token":token,
      } as unknown as HeadersInit,
    });
  };

 
  const onCreateCreditCardDetails = (body: {
    credit_card_number: string;
    expire_date: string;
    cvv: string;
    client_id: string;
  }): Promise<any> =>{

    console.log("body is *** ",body);
    console.log("token is *** ",token);
    console.log("PAYMENT_ACCESS_TOKEN is *** ",PAYMENT_ACCESS_TOKEN);
    

    return sendRequest(CREATE_CARD_DETAILS, {
      method: POST,
      body: body as unknown as BodyInit,
       headers: {
        "Content-Type": "application/json",
        "x-access-token":token,
        "x-access-token2" : PAYMENT_ACCESS_TOKEN
      } as unknown as HeadersInit,
    });
  }
  const onGetCreditCard = (body: { client_id: string }): Promise<any> =>
    sendRequest(GET_CREATE_CARD_DETAILS, {
      method: POST,
      body: body as unknown as BodyInit,
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      } as unknown as HeadersInit,
    }).then((res) => {
      return res;
    });

  return {
    onSubmitAuthRequest,
    onSubmitGoogleAuthRequest,
    onSubmitFBAuthRequest,
    onCreateSignUp,
    onUpdateUserProfile,
    onCreateCreditCardDetails,
    onGetCreditCard,
  };
};
