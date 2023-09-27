import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native'; // Import FlatList
import logo from '../../designToken/svg/logo.png';
import { fontSize } from '../../designToken/fontSizes';
import { colors } from '../../designToken/colors';
import { fontWeight } from '../../designToken/fontWeights';
import { getHeight, getWidth } from '../../libs/StyleHelper';
import { startChangingText } from '../onboard/OnboardControl';


const OnboardView = () => {
  const [circleText, setCircleText] = useState(1);
  const [isChangeLanguage, setIsChangeLanguage] = useState(false);

  useEffect(() => {
    startChangingText(setCircleText);
  }, []);

  const indicators = [1, 2, 3];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ position: "relative" }}>
          <Text
            style={styles.language}
            onPress={() => setIsChangeLanguage(!isChangeLanguage)}
          >
            EN
          </Text>
          {isChangeLanguage && (
            <View style={styles.languageContainer}>
              <Text style={styles.language}>English</Text>
            </View>
          )}
        </View>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.welcomeText}>Welcome to Heal</Text>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{circleText}</Text>
          </View>
        </View>
        <View style={styles.indicatorcontainer}>
          <FlatList
            data={indicators}
            horizontal
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.indicator,
                  item === circleText && styles.activeIndicator,
                  { width: item === circleText ? 20 : 10, }
                ]}
              />
            )}
          />
        </View>
      </View>

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getWidth(20),
    backgroundColor: "#fff",
    paddingTop: getHeight(25),

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
    alignItems:"center"
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

  circle: {
    width: getWidth(60),
    height: getHeight(60),
    backgroundColor: colors.primary,
    borderRadius: getHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center",
    marginTop: "30%"

  },
  circleText: {
    fontSize: fontSize.headingLg,
    color: colors.white,
    fontWeight: fontWeight.bold

  },
  indicatorcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: getHeight(40)
  },
  indicator: {
    height: getHeight(10),
    borderRadius: getHeight(20),
    backgroundColor: colors.grey,
    margin: 5,
  },
  activeIndicator: {
    backgroundColor: colors.primary,
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

export default OnboardView;
