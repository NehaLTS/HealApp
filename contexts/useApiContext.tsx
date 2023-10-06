import React, { createContext, useContext, useState } from 'react';
import { AuthServicesProvider } from '../libs/authsevices/AuthServiceProvider';
import { setLocalData } from '../libs/datastorage/useLocalStorage';
import { UserType } from '../libs/types/UserType';

interface UserInputProps {
    children: React.ReactNode;
}

interface UserReturnProps {
    userData: UserType | null,
    onLoginUser: (email: string | null, password: string | null) => Promise<UserType | null>;
    onLoginWithGoogle: (email: string | null, googleId: string | null) => Promise<UserType | null>;
    onLoginWithFB: (email: string | null, facebookId: string | null) => Promise<UserType | null>;
    onAuthSignUp: (email: string | null, password: string | null) => Promise<UserType | null>;

}

export const UserContext = createContext<Partial<UserReturnProps>>({});

export const UserContextProvider = (props: UserInputProps): React.ReactElement => {
    const [userData, setUserData] = useState<UserType | null>(null);
    const { onSubmitAuthRequest, onSubmitGoogleAuthRequest, onSubmitFBAuthRequest, onCreateSignUp } = AuthServicesProvider();

    const onLoginUser = async (email: string | null, password: string | null): Promise<UserType | null> => {
        try {
            if (email != null && password != null) {
                const response: UserType = await onSubmitAuthRequest({ email, password });
                setUserData(response);
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


    const onLoginWithGoogle = async (email: string | null, googleId: string | null): Promise<UserType | null> => {
        try {
            if (email != null && googleId != null) {
                const response: UserType = await onSubmitGoogleAuthRequest({ email, googleId });
                setUserData(response);
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
    const onLoginWithFB = async (email: string | null, facebookId: string | null): Promise<UserType | null> => {
        try {
            if (email != null && facebookId != null) {
                const response: UserType = await onSubmitFBAuthRequest({ email, facebookId });
                console.log("bncvbcmnb", response)
                setUserData(response);
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
    const onAuthSignUp = async (email: string | null, password: string | null): Promise<UserType | null> => {
        try {
            if (email != null && password != null) {
                const response: UserType = await onCreateSignUp({ email, password });
                console.log("bncvbcmnb", response)
                setUserData(response);
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
        userData,
        onLoginUser,
        onLoginWithGoogle,
        onLoginWithFB,
        onAuthSignUp
    };

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    );
};

export const useApiContext = (): Partial<UserReturnProps> => useContext(UserContext);
