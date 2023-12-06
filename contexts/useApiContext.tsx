import React, { createContext, useContext, useState } from 'react';
import { AuthServicesProvider } from '../libs/authsevices/AuthServiceProvider';
import { setLocalData } from '../libs/datastorage/useLocalStorage';
import { UserType, UserTypeProvider } from '../libs/types/UserType';

interface UserInputProps {
    children: React.ReactNode;
}

interface UserReturnProps {
    user: UserType | UserTypeProvider | null,
    onLoginUser: (email: string | null, password: string | null, device_token: string | null) => Promise<UserType | null>;
    onLoginWithGoogle: (email: string | null, googleId: string | null, device_token: string | null) => Promise<UserType | null>;
    onLoginWithFB: (email: string | null, facebookId: string | null, device_token: string | null) => Promise<UserType | null>;
    onAuthSignUp: (email: string | null, password: string | null, deviceId: string) => Promise<UserType | null>;
    onAuthUpdateUserProfile: (firstname: string | null, lastname: string | null, address: string | null, city: string | null, state: string | null, country: string | null, profile_picture: string | null, date_of_birth: string | null, phone_number: string | null, client_id: string | null) => Promise<any | null>;
    onAuthSignInProvider: (email: string | null, password: string | null, device_token: string) => Promise<UserTypeProvider | null>;
}

export const UserContext = createContext<Partial<UserReturnProps>>({});

export const UserContextProvider = (props: UserInputProps): React.ReactElement => {
    const [user, setUser] = useState<UserType | UserTypeProvider | null>(null);
    const { onSubmitAuthRequest, onSubmitGoogleAuthRequest, onSubmitFBAuthRequest, onCreateSignUp, onUpdateUserProfile, OnProviderSignIn } = AuthServicesProvider();

    const onLoginUser = async (email: string | null, password: string | null, device_token: string | null): Promise<UserType | null> => {
        try {
            if (email != null && password != null) {
                const response: UserType = await onSubmitAuthRequest({ email, password, device_token });
                setUser(response);
                setLocalData('USER', response)
                return response;
            } else {
                throw new Error('Email and password are required');
            }
        } catch (error) {
            console.error('Error fetching publisher data:', error);
            return null;
        }
    };


    const onLoginWithGoogle = async (email: string | null, googleId: string | null, device_token: string | null): Promise<UserType | null> => {
        try {
            if (email != null && googleId != null) {
                const response: UserType = await onSubmitGoogleAuthRequest({ email, googleId, device_token });
                setUser(response);
                setLocalData('USER', response)
                return response;
            } else {
                throw new Error('Email and password are required');
            }
        } catch (error) {
            console.error('Error fetching publisher data:', error);
            return null;
        }
    };
    const onLoginWithFB = async (email: string | null, facebookId: string | null, device_token: string | null): Promise<UserType | null> => {
        try {
            if (email != null && facebookId != null) {
                const response: UserType = await onSubmitFBAuthRequest({ email, facebookId, device_token });
                setUser(response);
                setLocalData('USER', response)
                return response;
            } else {
                throw new Error('Email and password are required');
            }
        } catch (error) {
            console.error('Error fetching publisher data:', error);
            return null;
        }
    };
    const onAuthSignUp = async (email: string | null, password: string | null, deviceId: string): Promise<UserType | null> => {
        try {
            if (email != null && password != null) {
                const response: UserType = await onCreateSignUp({ email, password, deviceId });
                setUser(response);
                setLocalData('USER', response)
                return response;
            } else {
                throw new Error('Email and password are required');
            }
        } catch (error) {
            console.error('Error fetching publisher data:', error);
            return null;
        }
    };
    const onAuthUpdateUserProfile = async (firstname: string | null, lastname: string | null, address: string | null, city: string | null, state: string | null, country: string | null, profile_picture: string | null, date_of_birth: string | null, phone_number: string | null, client_id: string | null): Promise<any> => {
        try {
            // if (firstname && lastname && address && city && state && country && profile_picture && date_of_birth && phone_number && client_id) {
            const response = await onUpdateUserProfile({ firstname, lastname, address, city, state, country, profile_picture, date_of_birth, phone_number, client_id });
            console.log("bncvbcmnb", JSON.stringify(response))
            setUser(response);
            setLocalData('USER', response)
            return response;
            // } else {
            //     throw new Error('Email and password are required');
            // }
        } catch (error) {
            console.error('Error fetching publisher data:', error);
            return null;
        }
    };
    const onAuthSignInProvider = async (email: string | null, password: string | null, device_token: string): Promise<UserTypeProvider | null> => {
        try {
            if (email != null && password != null) {
                const response = await OnProviderSignIn({ email, password, device_token });
                setUser(response);
                setLocalData('USER', response)
                return response;
            } else {
                throw new Error('Email and password are required');
            }
        } catch (error) {
            console.error('Error fetching publisher data:', error);
            return null;
        }
    };
    const userContext: UserReturnProps = {
        user,
        onLoginUser,
        onLoginWithGoogle,
        onLoginWithFB,
        onAuthSignUp,
        onAuthUpdateUserProfile,
        onAuthSignInProvider
    };

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    );
};

export const useApiContext = (): Partial<UserReturnProps> => useContext(UserContext);
