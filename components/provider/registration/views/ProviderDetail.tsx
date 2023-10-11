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
import { Dropdown } from 'react-native-element-dropdown';

const ProviderDetail = () => {
    const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } =
        BasicInformationController({});
    const { languageCode } = useTranslationContext();
    const { registration } = getTexts(languageCode);
    const getImageUrl = (url: string) => setUserData({ ...userData, profile_picture: url });

    const [value, setValue] = useState(null);
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },

    ];

    const renderItem = item => {
        return (
            <Text style={styles.textItem}>{item.label}</Text>
        );
    };


    return (
        <>
            <Input
                placeholder={registration.first_name}
                type={"name"}
                inputValue={''}
            />

            <Input
                placeholder={registration.last_name}
                type={"nameSuffix"}
                inputStyle={styles.inputLastName} inputValue={''}
            />

            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                iconStyle={{ marginRight: 10, height: 25, width: 25 }}
                iconColor={{ colors: colors.black }}
                selectedStyle={styles.box}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Type of provider"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                    setValue(item.value);
                }}
                renderItem={renderItem}
            />
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={{ marginRight: 10, height: 25, width: 25 }}
                iconColor={{ colors: colors.black }}
                selectedStyle={styles.box}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Specialty"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                    setValue(item.value);
                }}
                renderItem={renderItem}
            />
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
        fontWeight: fontWeight.normal,
        textAlign: "center"
    },

    inputLastName: {
        marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
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
        borderWidth: getHeight(dimens.borderBold),
        borderRadius: getHeight(dimens.marginS),
        backgroundColor: colors.offWhite,
        height: getHeight(dimens.imageS),
        borderColor: colors.primary,
        marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
    },
    placeholderStyle: {
        fontSize: 16,
        color: colors.black,
    },
    dropdown: {
        borderWidth: getHeight(dimens.borderBold),
        borderRadius: getHeight(dimens.marginS),
        backgroundColor: colors.offWhite,
        height: 50,
        borderColor: colors.primary,
        marginTop: getHeight(dimens.sideMargin + dimens.paddingS),
        paddingLeft: getHeight(dimens.marginM),

    },
    icon: {
        marginRight: 5,
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        color: colors.black,
        paddingLeft: getHeight(dimens.marginM),
    },
    selectedTextStyle: {
        fontSize: 16,
        color: colors.black
    },
    iconStyle: {
        width: getWidth(dimens.marginM),
        height: getHeight(dimens.marginM),
    },
});


