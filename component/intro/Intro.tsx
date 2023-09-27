import React, { useState } from "react";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import logo from "../../assets/icon/logo.png";
import { getHeight, getWidth } from "../../libs/StyleHelper";
import { getTexts } from "../../libs/OneSkyHelper";
import { useTranslationContext } from "../../contexts/UseTranslationsContext";
import { IntroController } from "./IntroController";

const Intro = () => {
    const { languageCode } = useTranslationContext()
    const { intro } = getTexts(languageCode)

    const { isChangeLanguage, handleLanguageChange, handleButtonPress } = IntroController();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ position: 'relative' }}>
                    <Text
                        style={styles.language}
                        onPress={handleButtonPress}
                    >
                        {languageCode.toUpperCase()}
                    </Text>
                    {isChangeLanguage && (
                        <View style={styles.languageContainer}>
                            <Text
                                style={styles.language}
                                onPress={() => handleLanguageChange('en')}
                            >
                                English
                            </Text>
                            <Text
                                style={styles.language}
                                onPress={() => handleLanguageChange('he')}
                            >
                                עִברִית
                            </Text>
                            <Text
                                style={styles.language}
                                onPress={() => handleLanguageChange('ar')}
                            >
                                العربي
                            </Text>
                            <Text
                                style={styles.language}
                                onPress={() => handleLanguageChange('ru')}
                            >
                                русский
                            </Text>
                        </View>
                    )}
                </View>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.welcomeText}>{intro.welcome_heal}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={{
                            borderWidth: getHeight(1),
                            borderColor: 'rgba(12, 127, 187, 1)',
                            backgroundColor: 'rgba(12, 127, 187, 1)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: getHeight(48),
                            borderRadius: getHeight(5),
                            zIndex: 1,
                        }}
                        onPress={() => handleButtonPress()}
                    >
                        <Text
                            style={{
                                fontSize: getHeight(24),
                                color: '#fff',
                                fontWeight: '600',
                                lineHeight: getHeight(28),
                            }}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}
                        >
                            {intro.continue_client}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: getHeight(1),
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: getHeight(48),
                            borderRadius: getHeight(5),

                        }}
                        onPress={() => handleButtonPress()}
                    >
                        <Text
                            style={{
                                fontSize: getHeight(24),
                                color: '#000',
                                lineHeight: getHeight(28),
                            }}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}
                        >
                            {intro.continue_provider}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default Intro;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: getWidth(20),
        backgroundColor: "#fff",
        paddingTop: getHeight(10),
    },
    language: {
        color: "#000",
        alignSelf: "flex-end",
        padding: getHeight(5),
        fontSize: getHeight(16),
        paddingRight: 0,
    },
    logoContainer: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    logo: {
        width: getWidth(247),
        height: getHeight(252),
        alignSelf: "center",
    },
    welcomeText: {
        fontSize: getHeight(26),
        color: "#000",
        alignSelf: "center",
        paddingTop: getHeight(20),
    },
    buttonContainer: {
        gap: getHeight(30),
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: getHeight(25),
    },
    languageContainer: {
        position: "absolute",
        width: getWidth(125),
        maxWidth: getWidth(125),
        height: getHeight(140),
        maxHeight: getHeight(142),
        padding: getHeight(6),
        borderWidth: getHeight(1),
        borderColor: "rgba(12, 127, 187, 1)",
        zIndex: 1,
        borderRadius: getHeight(10),
        alignItems: "flex-end",
        right: 0,
        backgroundColor: "#fff",
        top: "88%",
    },
});
