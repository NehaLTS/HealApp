import { sendRequest } from "../api/RequestHandler";
import { CREATE_SIGNUP, CREDITED_CARD_DETAILS, FACEBOOK_LOGIN_API, GET_CREATE_CARD_DETAILS, GOOGLE_LOGIN_API, LOGIN_API, PATCH, POST, UPDATE_SIGNUP } from "../constants/ApiConstants";
import { UserType } from "../types/UserType";
import { BodyInit, HeadersInit } from "../api/ApiTypes";
import { UseUserContext } from "contexts/useUserContext";

export const AuthServicesClient = () => {
    const { userData } = UseUserContext()

    /** To provide auth data to server */
    const onSubmitAuthRequest = (body: {
        email: string;
        password: string;
    }): Promise<UserType> =>
        sendRequest(LOGIN_API, {
            method: POST,
            body: body as unknown as BodyInit,
        })

    /** To provide Google auth request to server */
    const onSubmitGoogleAuthRequest = (body: {
        email: string;
        googleId: string;
    }): Promise<any> =>
        sendRequest(GOOGLE_LOGIN_API, {
            method: POST,
            body: body as unknown as BodyInit,
        })

    /** To provide FB auth request to server */
    const onSubmitFBAuthRequest = (body: {
        email: string;
        facebookId: string;
    }): Promise<UserType> =>
        sendRequest(FACEBOOK_LOGIN_API, {
            method: POST,
            body: body as unknown as BodyInit,
        })

    const onCreateSignUp = (body: {
        email: string;
        password: string;
    }): Promise<UserType> =>
        sendRequest(CREATE_SIGNUP, {
            method: POST,
            body: body as unknown as BodyInit,
        })


    const onUpdateUserProfile = (body: {                //client signup with user datawith whole data 
        firstname: string,
        lastname: string,
        address: string,
        city: string,
        state: string,
        country: string,
        profile_picture: string,
        date_of_birth: string,
        phone_number: string,
        client_id: string,
        id_number: string
    }): Promise<any> =>
        sendRequest(UPDATE_SIGNUP, {
            method: PATCH,
            body: body as unknown as BodyInit,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': userData?.token
            } as unknown as HeadersInit
        })
    const onCreateCreditCardDetails = (body: {
        credit_card_number: string,
        expire_date: string,
        cvv: string,
        client_id: string
    }): Promise<any> =>
        sendRequest(CREDITED_CARD_DETAILS, {
            method: PATCH,
            body: body as unknown as BodyInit,
        })



    const onGetCreditCard = (body: {
        client_id: string
    }): Promise<any> =>
        sendRequest(GET_CREATE_CARD_DETAILS, {
            method: POST,
            body: body as unknown as BodyInit,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': userData?.token
            } as unknown as HeadersInit
        }).then((res) => {
            return res
        })

    return {
        onSubmitAuthRequest, onSubmitGoogleAuthRequest, onSubmitFBAuthRequest,
        onCreateSignUp, onUpdateUserProfile, onCreateCreditCardDetails, onGetCreditCard
    }
}


