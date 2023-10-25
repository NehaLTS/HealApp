import { sendRequest } from "../api/RequestHandler";
import { CREATE_PROVIDER_SEVICES, CREATE_SIGNUP_PROVIDER, FACEBOOK_LOGIN_API, GET, GET_PROVIDER_SERVICE, GET_PROVIDER_TYPES, GET_USER_SERVICES, GOOGLE_LOGIN_API_PROVIDER, PATCH, POST, PROVIDER_SIGNIN, UPDATE_SIGNUP_PROVIDER } from "../constants/ApiConstants";
import { UserType, UserTypeProvider } from "../types/UserType";

import { UseUserContextProvider } from "contexts/useUserContextProvider";
import { BodyInit, HeadersInit } from "../api/ApiTypes";

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
        bank_name: string;
        branch: string;
        business_registration_number: string;
        account: string;

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

        specialty_id: string
    }): Promise<UserTypeProvider> => {

        console.log("body is ", body);

        return sendRequest(CREATE_PROVIDER_SEVICES, {
            method: POST,
            body: body as unknown as BodyInit,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': userDataProvider?.token
                // 'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA2LCJpYXQiOjE2OTcxNzg1MTEsImV4cCI6MTY5NzIxMDkxMX0.s1H7p8bVHKuN32oDAN1fyCN0hI8o_y_g8NI0NuPKp9M"
            } as unknown as HeadersInit
        })
    }





    const onGetProviderTypes = (): Promise<any> => (
        sendRequest(GET_PROVIDER_TYPES, {
            method: GET,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': userDataProvider?.token
            } as unknown as HeadersInit
        })
    )

    const onGetProviderService = (body: {
        provider_id: string,
        specialty_id: string
    }): Promise<any> =>
        sendRequest(GET_PROVIDER_SERVICE, {
            method: POST,
            body: body as unknown as BodyInit,
            headers: {
                'Content-Type': 'application/json',
                //  'x-access-token': userDataProvider?.token
                'x-access-token': userDataProvider?.token
            } as unknown as HeadersInit
        })


    const onGetUserAllServices = (body: {
        provider_id: string,
    }): Promise<any> =>
        sendRequest(GET_USER_SERVICES, {
            method: POST,
            body: body as unknown as BodyInit,
            headers: {
                'Content-Type': 'application/json',
                //  'x-access-token': userDataProvider?.token
                'x-access-token': userDataProvider?.token
            } as unknown as HeadersInit
        })

    return {
        OnProviderSignIn, onSubmitGoogleAuthRequestProvider, onSubmitFBAuthRequestProvider,
        OnProviderCreateSignUp, OnUpdateProviderUserDetails, onCreateProviderServices, onGetProviderTypes, onGetProviderService,
        onGetUserAllServices
    }
}
