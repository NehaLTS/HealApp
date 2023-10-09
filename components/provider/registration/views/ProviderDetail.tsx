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

const ProviderDetail = () => {
    const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } =
        BasicInformationController({});
    const { languageCode } = useTranslationContext();
    const { registration } = getTexts(languageCode);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [providerType, setProviderType] = useState("");
    const [providerTypeError, setProviderTypeError] = useState("");

    const [specialty, setSpecialty] = useState("");
    const [specialtyError, setSpecialtyError] = useState("");



    const validateFirstName = () => {
        if (!firstName.trim()) {
            setFirstNameError("First name is required");
        } else if (!/^[A-Z][a-z]*$/.test(firstName)) {
            setFirstNameError("First letter should start with an uppercase , followed by lowercase ");
        } else {
            setFirstNameError("");
        }
    };

    const validateLastName = () => {
        if (!lastName.trim()) {
            setLastNameError("Last name is required");
        } else if (!/^[A-Z][a-z]*$/.test(lastName)) {
            setLastNameError("First letter should start with an uppercase , followed by lowercase ");
        } else {
            setLastNameError("");
        }
    };
    const validateProviderType = () => {
        if (!providerType.trim()) {
            setProviderTypeError("Type of provider is required");
        } else {
            setProviderTypeError("");
        }
    };

    const validateSpecialty = () => {
        if (!specialty.trim()) {
            setSpecialtyError("Specialty is required");
        } else {
            setSpecialtyError("");
        }
    };


    return (
        <>
            <Input
                placeholder={registration.first_name}
                type={"name"}
                inputStyle={styles.input}
                value={firstName}
                errorMessage={firstNameError}
                onChangeText={(text) => setFirstName(text)}
                onBlur={validateFirstName}
            />

            <Input
                placeholder={registration.last_name}
                type={"nameSuffix"}
                inputStyle={styles.inputLastName}
                value={lastName}
                errorMessage={lastNameError}
                onChangeText={(text) => setLastName(text)}
                onBlur={validateLastName}
            />

            <Input
                placeholder="Type of provider"
                type={"name"}
                inputStyle={styles.inputPhone}
                value={providerType}
                errorMessage={providerTypeError}
                onChangeText={(text) => setProviderType(text)}
                onBlur={validateProviderType}
            />

            <Input
                placeholder="Specialty"
                type={"name"}
                inputStyle={styles.inputPhone}
                value={specialty}
                errorMessage={specialtyError}
                onChangeText={(text) => setSpecialty(text)}
                onBlur={validateSpecialty}
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
                        style={selectedImage ? styles.selectedImage : styles.editImage}
                    />
                </TouchableOpacity>
                <SelectImage
                    isShowModal={isShowModal}
                    closeModal={setIsShowModal}
                    imageUri={setSelectedImage}
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
});