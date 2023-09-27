/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView } from "react-native";
import { TranslationContext } from "./contexts/UseTranslationsContext";
import IntroScreen from "./screens/IntroScreen";

const App = () => {
  const [languageCode, setLanguageCode] = React.useState<string>('en')

  const backgroundStyle = {
    backgroundColor: "#fff",
    flex: 1,
  };

  return (
    <TranslationContext.Provider value={{ languageCode, setLanguageCode }}>
      <SafeAreaView style={backgroundStyle}>
        <IntroScreen />
      </SafeAreaView>
    </TranslationContext.Provider>

  );
};

export default App;
