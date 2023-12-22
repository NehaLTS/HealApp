import { Alert, Modal, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Input from 'components/common/Input'
import { setLocalData } from 'libs/datastorage/useLocalStorage'
import Button from 'components/common/Button'
import { UseClientUserContext } from 'contexts/UseClientUserContext'
import Text from 'components/common/Text';
import { colors } from 'designToken/colors'
import { getWidth } from 'libs/StyleHelper'
import { ClientOrderServices } from 'libs/ClientOrderServices'

const AddPaymentToWallet = ({ isShowInputView }: { isShowInputView: boolean }) => {
    const [value, setValue] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(true)
    const [showInputView, setShowInputView] = useState<boolean>(isShowInputView)
    const { userId } = UseClientUserContext();
    const { AddPaymentInWallet } = ClientOrderServices()
    const onChamgeInput = (text: string) => {
        setValue(text)
    }

    const onAddSubmitData = () => {
        AddPaymentInWallet({
            client_id: userId ?? '0',
            wallet_amount: value
        }).then((response) => {
            setLocalData('WALLETDETAIL', {
                client_id: userId,
                wallet_amount: value
            })
            setShowInputView(false)
            setVisible(false)
        }).catch((error) => {
            Alert.alert('Error', error)
        })


    }
    return (
        <Modal visible={visible} animationType='fade' style={{ backgroundColor: colors.disabled }}>
            {showInputView ? <View style={styles.addAmountView}>
                <Input inputValue={value} onChangeText={onChamgeInput} placeholder={'Enter the amount'} containerWidth={getWidth(100)} />
                <Button title='Add' onPress={onAddSubmitData} background={colors.primary} />
            </View> : <View style={styles.alertView}>
                <Text title={'No enough Amount'} />
                <Text title={"You don't have enough amount to place order. Please add amount in wallet"} />

                <Button title='OK' onPress={() => {
                    setShowInputView(true)
                }}
                    background={colors.primary} />
            </View>}
        </Modal>
    )
}

export default AddPaymentToWallet

const styles = StyleSheet.create({

    addAmountView: {
        backgroundColor: colors.white,
        borderRadius: getWidth(10),
        alignItems: 'center',
        padding: getWidth(20),
        width: '100%'

    },
    alertView: {
        backgroundColor: colors.white,
        borderRadius: getWidth(10),
        alignItems: 'center',

    }
})