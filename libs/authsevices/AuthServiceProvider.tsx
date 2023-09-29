import { sendRequest } from "../api/RequestHandler";
import { POST } from "../constants/ApiConstants";
import { GoogleLoginResponse, LoginResponse, RequestUnSuccessful } from "../types/AuthRespoonseType";
import { GOOGLE_LOGIN_API, LOGIN_API } from "../utility/Utils";
import { BodyInit } from "../api/ApiTypes";

export const AuthServicesProvider = () => {

    /** To provide auth data to server */
    const onSubmitAuthRequest = (body: {
        email: string;
        password: string;
    }): Promise<LoginResponse | RequestUnSuccessful> =>
        sendRequest(LOGIN_API, {
            method: POST,
            body: body as unknown as BodyInit,
        })

    /** To provide Google auth request to server */
    const onSubmitGoogleAuthRequest = (body: {
        email: string;
        googleId: string;
    }): Promise<GoogleLoginResponse> =>
        sendRequest(GOOGLE_LOGIN_API, {
            method: POST,
            body: body as unknown as BodyInit,
        })

    /** To provide FB auth request to server */
    const onSubmitFBAuthRequest = (body: {
        email: string;
        facebookId: string;
    }): Promise<GoogleLoginResponse> =>
        sendRequest(GOOGLE_LOGIN_API, {
            method: POST,
            body: body as unknown as BodyInit,
        })


    return { onSubmitAuthRequest, onSubmitGoogleAuthRequest, onSubmitFBAuthRequest }
}


