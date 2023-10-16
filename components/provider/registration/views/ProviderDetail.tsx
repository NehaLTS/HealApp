import Text from 'components/common/Text';
import { UseUserContextProvider } from 'contexts/useUserContextProvider';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useTranslationContext } from '../../../../contexts/UseTranslationsContext';
import { colors } from '../../../../designToken/colors';
import { dimens } from '../../../../designToken/dimens';
import { fontSize } from '../../../../designToken/fontSizes';
import { getTexts } from '../../../../libs/OneSkyHelper';
import { getHeight, getWidth } from '../../../../libs/StyleHelper';
import Input from '../../../common/Input';
import SelectImage from '../../../common/SelectImage';
import BasicInformationController from '../controllers/BasicInformationController';

const ProviderDetail = ({
    firstNameError:fnError,
    lastNameError: lnError,
    specialityError: spError,
    providerTypeError: prvError,}:any) => {
    const { selectedImage, setSelectedImage, isShowModal, setIsShowModal } =
        BasicInformationController({});
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [providerTypeError, setProviderTypeError] = useState("");
    const [specialtyError, setSpecialtyError] = useState("");
    const { languageCode } = useTranslationContext();
    const { registration } = getTexts(languageCode);
    const { onGetProviderTypes } = AuthServicesProvider()
    const [selectedProvider, setSelectedProvider] = useState({});
    const [selectedSpecialty, setSelectedSpecialty] = useState({});

    const { userDataProvider, setUserDataProvider } = UseUserContextProvider()
    const firstNameRef = React.useRef<any>("");
    const lastNameRef = React.useRef<any>("");
    const providerTypeRef = React.useRef<any>("");
    const specialtyRef = React.useRef<any>("");
    const onBlurFirstName = () => { validateFirstName(); setUserDataProvider({ ...userDataProvider, firstname: firstNameRef.current.value }) }
    const onChangeFirstName = (value: string) => firstNameRef.current.value = value

    const onBlurLastName = () => { validateLastName(); setUserDataProvider({ ...userDataProvider, lastname: lastNameRef.current.value }) }
    const onChangeLastName = (value: string) => lastNameRef.current.value = value

    const onBlurProviderType = () => { validateProviderType(); setUserDataProvider({ ...userDataProvider, provider_type_id: selectedProvider?.name }) }
    const onChangeProviderType = (value: string) => providerTypeRef.current.value = value

    const onBlurSpecialty = () => { validateSpecialty(); setUserDataProvider({ ...userDataProvider, speciality: selectedSpecialty?.name?.en }) }
    const onChangeSpecialty = (value: string) => specialtyRef.current.value = value
    const getImageUrl = (url: string) => setUserDataProvider({ ...userDataProvider, id_photo: url });


    const data = [
        {
            "id": 1,
            "name": {
                "en": "Doctor",
                "hi": "चिकित्सक",
                "he": ""
            },
            "specialties": [
                {
                    "id": 1,
                    "name": {
                        "en": "Stomach And Digestion",
                        "hi": "पेट और पाचन",
                        "he": ""
                    }
                },
                {
                    "id": 2,
                    "name": {
                        "en": "Gernaral and Physician",
                        "hi": "गर्नराल और चिकित्सक",
                        "he": ""
                    }
                },
                {
                    "id": 3,
                    "name": {
                        "en": "Dermatology",
                        "hi": "त्वचा विज्ञान",
                        "he": ""
                    }
                },
                {
                    "id": 5,
                    "name": {
                        " en": "orthopedist",
                        "hi": "",
                        "he": ""
                    }
                }
            ]
        },
        {
            "id": 2,
            "name": {
                "en": "Nurse",
                "hi": "देखभाल करना",
                "he": ""
            },
            "specialties": [
                {
                    "id": 7,
                    "name": {
                        "en": "Pediatric Nursing",
                        "hi": "",
                        "he": " "
                    }
                },
                {
                    "id": 8,
                    "name": {
                        "en": "Labor and Delivery Nursing",
                        "hi": "",
                        "he": ""
                    }
                },
                {
                    "id": 9,
                    "name": {
                        "en": "Cardiac Nursing",
                        "hi": "",
                        "he": ""
                    }
                },
                {
                    "id": 10,
                    "name": {
                        "en": "Oncology Nursing",
                        "hi": "",
                        "he": ""
                    }
                },
                {
                    "id": 11,
                    "name": {
                        "en": "Nurse Practitioner",
                        "hi": "",
                        "he": ""
                    }
                }
            ]
        },
        {
            "id": 3,
            "name": {
                "en": "Healer",
                "hi": "आरोग्य करनेवाला",
                "he": ""
            },
            "specialties": [

            ]
        },
        {
            "id": 4,
            "name": {
                "en": "Physio",
                "hi": "फिजियो",
                "he": ""
            },
            "specialties": [
                {
                    "id": 4,
                    "name": {
                        "en": "Neuromusculoskeletal",
                        "hi": "",
                        "he": ""
                    }
                },
                {
                    "id": 6,
                    "name": {
                        "en": "Dermatology",
                        "hi": "",
                        "he": ""
                    }
                },
                {
                    "id": 12,
                    "name": {
                        "en": "Women's Health Physiotherapy",
                        "hi": "",
                        "he": ""
                    }
                },
                {
                    "id": 13,
                    "name": {
                        "en": "Pain Management",
                        "hi": "",
                        "he": ""
                    }
                }
            ]
        }
    ]

    const renderItem = item => {
        return (
            <Text style={styles.textItem}>{item?.name.en}</Text>
        );
    };

    const renderItems = item => {
        return (
            <Text style={styles.textItem}>{item?.name}</Text>
        );
    };


    const validateFirstName = () => {
        if (!firstNameRef.current.value) {
            setFirstNameError("First name is required");
        } else {
            setFirstNameError("");
        }
    };

    const validateLastName = () => {
        if (!lastNameRef.current.value) {
            setLastNameError("Last name is required");
        } else {
            setLastNameError("");
        }
    };

    const validateProviderType = () => {

        if (!providerTypeRef.current.value) {
            setProviderTypeError("Provider type is required");
        } else {
            setProviderTypeError("");
        }
    };

    const validateSpecialty = () => {

        if (!specialtyRef.current.value) {
            setSpecialtyError("Specialty is required");
        } else {
            setSpecialtyError("");
        }
    };




    const onChangeProviderTypes = (value) => {
        validateLastName();
        setUserDataProvider({ ...userDataProvider, type_Provider: value?.name, lastname: lastNameRef.current.value })
        setSelectedProvider(value);
    };

    const onChangeSpecialtys = (value) => {
        console.log('onChangeSpecialtys', value?.name?.en)
        setUserDataProvider({ ...userDataProvider, speciality: value?.name?.en, speciality_id: value?.id })
        setSelectedSpecialty(value);
    };

    return (
        <>
            <Input
                placeholder={registration.first_name}
                onBlur={onBlurFirstName}
                onChangeText={onChangeFirstName}
                ref={firstNameRef}
                defaultValue={userDataProvider.firstname}
                inputValue={userDataProvider?.firstname ?? ""}
                errorMessage={fnError.length?fnError: firstNameError}
                returnKeyType={"next"}
                onSubmitEditing={() => lastNameRef.current.focus()}
                onClearInputText={() => firstNameRef.current.clear()}
            />

            <Input
                placeholder={registration.last_name}
                type={"nameSuffix"}
                inputStyle={styles.inputLastName}
                onChangeText={onChangeLastName}
                onBlur={onBlurLastName}
                defaultValue={userDataProvider.lastname}
                ref={lastNameRef}
                inputValue={userDataProvider?.lastname ?? ""}
                errorMessage={lnError.length ?lnError:lastNameError}
                onClearInputText={() => lastNameRef.current.clear()}
            />

            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={{ marginRight: 10, height: 25, width: 25, marginTop: 4 }}
                iconColor={colors.black}
                selectedStyle={styles.box}
                data={[
                    { name: 'Doctor' },
                    { name: 'Nurse' },
                    { name: 'Healer' },
                    { name: 'Physio' },
                    { name: 'Other' },
                ]}
                labelField={'name'}
                valueField="name"
                placeholder="Type of provider"
                value={userDataProvider.type_Provider}
                onChange={onChangeProviderTypes}
                renderItem={renderItems}
            // onBlur={onBlurProviderType}
            />
            {providerTypeError|| prvError && (
            <Text style={styles.errorMessage}>{prvError.length?prvError: providerTypeError}</Text>
            )}
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={{ marginRight: 10, height: 25, width: 25, marginTop: 4 }}
                iconColor={colors.black}
                selectedStyle={styles.box}
                data={data.find((item) => item.name.en === selectedProvider?.name)?.specialties || []}
                labelField="name.en"
                valueField="name.en"
                placeholder="Specialty"
                value={userDataProvider.speciality}
                onChange={onChangeSpecialtys}
                renderItem={renderItem}
            // onBlur={onBlurSpecialty}
            />
            {specialtyError || spError && (
                <Text style={styles.errorMessage}>{ spError.length?spError: specialtyError}</Text>
            )}


            <View style={styles.iconContainer}>
                <Text style={styles.text}>Upload ID photo</Text>
                <TouchableOpacity
                    activeOpacity={userDataProvider.id_photo ? 1 : 0.5}
                    onPress={() => !userDataProvider.id_photo && setIsShowModal(true)}

                >
                    <Image
                        source={
                            userDataProvider.id_photo
                                ? { uri: userDataProvider.id_photo }
                                : require("../../../../assets/icon/uploadProfile.png")
                        }
                        style={styles.selectedImage}
                    />
                </TouchableOpacity>
                {userDataProvider.id_photo && <TouchableOpacity onPress={() => setIsShowModal(true)}>
                    <Image
                        source={require("assets/icon/circumEditBlue.png")}
                        style={styles.editBlueImage}
                    />
                </TouchableOpacity>}
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
        textAlign: "center",
    },

    inputLastName: {
        marginTop: getHeight(dimens.marginM + dimens.paddingXs),

    },


    iconContainer: {
        flexDirection: "row",
        gap: getHeight(dimens.marginS),
        alignItems: "center",
        marginTop: getHeight(dimens.sideMargin),
    },

    selectedImage: {
        height: getHeight(dimens.imageS + dimens.marginS),
        width: getWidth(dimens.imageS + dimens.paddingS + 2),
        resizeMode: "contain",
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
        fontSize: fontSize.textL,
        color: colors.black,
    },
    dropdown: {
        borderWidth: getHeight(dimens.borderBold),
        borderRadius: getHeight(dimens.marginS),
        backgroundColor: colors.offWhite,
        height: getHeight(50),
        borderColor: colors.primary,
        marginTop: getHeight(dimens.marginM + dimens.paddingXs),
        paddingLeft: getHeight(dimens.paddingS + dimens.borderBold),

    },
    icon: {
        marginRight: 5,
    },
    textItem: {
        flex: 1,
        fontSize: fontSize.textL,
        color: colors.black,
        padding: getHeight(dimens.marginS),
        paddingLeft: getHeight(dimens.paddingS + dimens.borderBold),

    },
    selectedTextStyle: {
        fontSize: fontSize.textL,
        color: colors.black,
    },
    iconStyle: {
        width: getWidth(dimens.marginM),
        height: getHeight(dimens.marginM),
    },
    editBlueImage: {
        height: getHeight(dimens.paddingL ),
        width: getWidth(dimens.paddingL),
        marginBottom: getHeight(dimens.paddingXs)
    },
    errorMessage: {
        color: colors.invalid,
        paddingTop: getHeight(dimens.paddingXs),
      },
});
