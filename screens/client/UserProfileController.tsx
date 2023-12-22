import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deleteLocalData } from 'libs/datastorage/useLocalStorage';
import { ClientProfile, PaymentHistoryType } from 'libs/types/UserType';
import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { useNavigation } from '@react-navigation/native';
import NavigationRoutes from 'navigator/NavigationRoutes';
import { ClientOrderServices } from 'libs/ClientOrderServices';

export default function UserProfileController() {
    const { userProfile, setUserProfile, userId } = UseClientUserContext();
    const navigation = useNavigation();
    const [paymentHistoryData, setPaymentHistoryData] = useState<PaymentHistoryType[]>([])
    const { PaymentHistory } = ClientOrderServices();
    useEffect(() => {
        PaymentHistory({ client_id: userId }).then((res: PaymentHistoryType[]) => {
            setPaymentHistoryData(res)
            console.log('paymentHaitory', res)
        }).catch((error) => {
            Alert.alert('Error occured: ', error.tosString())
        })

    }, [])

    const onLogoutButtonPress = () => {
        setUserProfile({} as ClientProfile);
        deleteLocalData();
        setTimeout(() => { navigation.navigate(NavigationRoutes.IntroStack); }, 2000);
    };
    return {
        onLogoutButtonPress,
        userProfile,
        paymentHistoryData
    }


}


