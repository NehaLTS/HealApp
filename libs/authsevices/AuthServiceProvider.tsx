import { sendRequest } from "../api/RequestHandler";
import { CREATE_SIGNUP, FACEBOOK_LOGIN_API, GOOGLE_LOGIN_API, LOGIN_API, POST, UPDATE_SIGNUP } from "../constants/ApiConstants";
import { UserType } from "../types/UserType";

import { BodyInit } from "../api/ApiTypes";

export const AuthServicesProvider = () => {

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
        client_id: string
    }): Promise<any> =>
        sendRequest(UPDATE_SIGNUP, {
            method: POST,
            body: body as unknown as BodyInit,
        })
    return {
        onSubmitAuthRequest, onSubmitGoogleAuthRequest, onSubmitFBAuthRequest, onCreateSignUp, onUpdateUserProfile
    }
}


