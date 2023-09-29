import { sendRequest } from "../api/ApiHandler";
import { POST } from "../constants/ApiConstants";
import { GoogleLoginResponse, LoginResponse, RequestUnSuccessful } from "../types/AuthRespoonseType";
import { GOOGLE_LOGIN_API, LOGIN_API } from "../utility/Utils";
import { BodyInit } from "./ApiTypes";

export const AuthServicesProvider = () => {
    const handleLogin = (body: {
        email: string;
        password: string;
    }): Promise<LoginResponse | RequestUnSuccessful> =>
        sendRequest(LOGIN_API, {
            method: POST,
            body: body as unknown as BodyInit,
        })

    const handleGoogleLogin = (body: {
        email: string;
        googleId: string;
    }): Promise<GoogleLoginResponse> =>
        sendRequest(GOOGLE_LOGIN_API, {
            method: POST,
            body: body as unknown as BodyInit,
        })

    const handleFacebookLogin = (body: {
        email: string;
        facebookId: string;
    }): Promise<GoogleLoginResponse> =>
        sendRequest(GOOGLE_LOGIN_API, {
            method: POST,
            body: body as unknown as BodyInit,
        })

    const handleAppleLogin = () => {

    }

    return { handleLogin, handleGoogleLogin, handleFacebookLogin, handleAppleLogin }

}


