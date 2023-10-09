import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { getHeight, getWidth } from '../../../../libs/StyleHelper';
import { fontSize } from '../../../../designToken/fontSizes';
import { colors } from '../../../../designToken/colors';
import { fontWeight } from '../../../../designToken/fontWeights';
import { dimens } from '../../../../designToken/dimens';
import Input from '../../../common/Input';
import { useTranslationContext } from '../../../../contexts/UseTranslationsContext';
import { getTexts } from '../../../../libs/OneSkyHelper';
import SelectImage from '../../../common/SelectImage';
import BasicInformationController from '../controllers/BasicInformationController';
import { SelectList } from 'react-native-dropdown-select-list';

const ProviderDetail = () => {
    const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } =
        BasicInformationController({});
    const { languageCode } = useTranslationContext();
    const { registration } = getTexts(languageCode);
    const getImageUrl = (url: string) => setUserData({ ...userData, profile_picture: url });
    const [selected, setSelected] = React.useState("");
    const data = [
        { key: '1', value: 'Mobiles', disabled: true },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers', disabled: true },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ]

    return (
        <>
            <Input
                placeholder={registration.first_name}
                type={"name"}
                inputStyle={styles.input} inputValue={''}
            />

            <Input
                placeholder={registration.last_name}
                type={"nameSuffix"}
                inputStyle={styles.inputLastName} inputValue={''}
            />
            <View style={{ gap: 20, marginTop: 20 }}>
                <SelectList
                    setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
                    data={data}
                    save="value"
                    placeholder='Type of provider'
                    boxStyles= {styles.box}
                    dropdownStyles={styles.dropdown}
                />
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    placeholder='Specialty'
                  boxStyles= {styles.box}
                 dropdownStyles={styles.dropdown}
                 inputStyles={styles.text}
                />
            </View>
            <View style={styles.iconContainer}>
                <Text style={styles.text}>Upload ID photo</Text>
                <TouchableOpacity
                    activeOpacity={selectedImage ? 1 : 0.5}
                    onPress={() => !selectedImage && setIsShowModal(true)}

                >
                    <Image
                        source={
                            selectedImage
                                ? { uri: selectedImage }
                                : require("../../../../assets/icon/uploadProfile.png")
                        }
                        style={styles.selectedImage}
                    />
                </TouchableOpacity>
                <SelectImage
                    isShowModal={isShowModal}
                    closeModal={setIsShowModal}
                    imageUri={getImageUrl}
                />
            </View>
        </>
    );
};

export default ProviderDetail;

const styles = StyleSheet.create({
    text: {
        fontSize: fontSize.textL,
        color: colors.black,
        marginTop: getHeight(dimens.marginM),
        fontWeight: fontWeight.normal,
        textAlign: "center"
    },
    input: {
        marginTop: getHeight(dimens.paddingS),
    },
    inputPhone: {
        marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
    },
    inputLastName: {
        marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
    },
    errorText: {
        color: "red",
        fontSize: fontSize.textS,
        marginTop: getHeight(dimens.paddingXs),
    },
    editImage: {
        height: getHeight(dimens.imageS),
        width: getWidth(dimens.imageS),
    },
    iconContainer: {
        flexDirection: "row",
        gap: getHeight(dimens.marginM),
        alignItems: "center",
        marginTop: getHeight(dimens.marginM),
    },

    selectedImage: {
        height: getHeight(dimens.imageS),
        width: getWidth(dimens.imageS),
        borderRadius: getHeight(dimens.paddingS),

    },
    box: {
        borderWidth: getWidth(dimens.borderBold),
        borderRadius: getWidth(dimens.marginS),
        backgroundColor: colors.offWhite,
        borderColor:colors.primary
    },
    dropdown: {
        borderWidth: getWidth(dimens.borderBold),
        borderRadius: getWidth(dimens.marginS),
        backgroundColor: colors.offWhite,
    },
});


