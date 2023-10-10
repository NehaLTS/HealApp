import { sendRequest } from "../api/RequestHandler";
import { CREATE_PROVIDER_SEVICES, CREATE_SIGNUP_PROVIDER, FACEBOOK_LOGIN_API, GOOGLE_LOGIN_API_PROVIDER, PATCH, POST, PROVIDER_SIGNIN, UPDATE_SIGNUP_PROVIDER } from "../constants/ApiConstants";
import { UserType, UserTypeProvider } from "../types/UserType";

import { BodyInit, HeadersInit } from "../api/ApiTypes";
import { UseUserContextProvider } from "contexts/useUserContextProvider";

export const AuthServicesProvider = () => {
    const { userDataProvider } = UseUserContextProvider()

    const OnProviderSignIn = (body: {
        email: string;
        password: string;
    }): Promise<UserTypeProvider> =>
        sendRequest(PROVIDER_SIGNIN, {
            method: POST,
            body: body as unknown as BodyInit,
        })
    const onSubmitGoogleAuthRequestProvider = (body: {
        email: string;
        googleId: string;
    }): Promise<any> =>
        sendRequest(GOOGLE_LOGIN_API_PROVIDER, {
            method: POST,
            body: body as unknown as BodyInit,
        })
    const onSubmitFBAuthRequestProvider = (body: {
        email: string;
        facebookId: string;
    }): Promise<UserType> =>
        sendRequest(FACEBOOK_LOGIN_API, {
            method: POST,
            body: body as unknown as BodyInit,
        })
    const OnProviderCreateSignUp = (body: {
        email: string;
        password: string;
    }): Promise<UserTypeProvider> =>
        sendRequest(CREATE_SIGNUP_PROVIDER, {
            method: POST,
            body: body as unknown as BodyInit,
        })
    const OnUpdateProviderUserDetails = (body: {
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
    }): Promise<UserTypeProvider> =>
        sendRequest(UPDATE_SIGNUP_PROVIDER, {
            method: PATCH,
            body: body as unknown as BodyInit,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': userDataProvider?.token
            } as unknown as HeadersInit
        })
    const onCreateProviderServices = (body: {
        name: string,
        description: string,
        price: string,
        provider_id: string,
        currency: string,
        specialty_id: string
    }): Promise<UserTypeProvider> =>
        sendRequest(CREATE_PROVIDER_SEVICES, {
            method: POST,
            body: body as unknown as BodyInit,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': userDataProvider?.token
            } as unknown as HeadersInit
        })
    return {
        OnProviderSignIn, onSubmitGoogleAuthRequestProvider, onSubmitFBAuthRequestProvider,
        OnProviderCreateSignUp, OnUpdateProviderUserDetails, onCreateProviderServices
    }
}


