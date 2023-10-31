import { useNavigation, useRoute } from "@react-navigation/native";
import arrowBack from "assets/icon/arrowBack.png";
import OrderFormView from "components/client/home/OrderFormView";
import SummaryView from "components/client/home/SummaryView";
import Button from "components/common/Button";
import Text from "components/common/Text";
import { colors } from "designToken/colors";
import { dimens } from "designToken/dimens";
import { fontSize } from "designToken/fontSizes";
import { getHeight, getWidth } from "libs/StyleHelper";
import React, { useLayoutEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import OrderDetailsController from "./OrderDetailsController";

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<any>()
  const { supplier } = route.params;
  useLayoutEffect(() => {
  }, [navigation]);
  const { handleNextButtonPress, showSummary } = OrderDetailsController()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerTitle: () => (
        <View style={styles.servicesContainer}>
          <Image source={supplier?.image} style={styles.specialistIcon} />
          <Text
            numberOfLines={2}
            style={styles.specialist}
            title={supplier?.name}
          />
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowBack} style={styles.arrowBack} />
        </TouchableOpacity>
      ),
      headerStyle: styles.header,
      headerRight: null,
    });
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      {showSummary ? (
        <SummaryView />
      ) : (
        <OrderFormView />
      )}
      <Button
        title={showSummary ? "Order" : "Next"}
        isPrimary
        isSmall
        style={styles.buttonOrder}
        onPress={handleNextButtonPress}
        width={100}
      />
      {showSummary && <Text title={'*No fee will be collected within 3 minutes after order'} style={styles.text} />}
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(dimens.marginM),

  },

  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: "center",
  },
  header: {
    backgroundColor: colors.white,
  },
  next: {
    alignSelf: "center",
  },
  servicesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidth(dimens.sideMargin),
  },
  specialistIcon: {
    width: getHeight(dimens.imageS),
    height: getHeight(dimens.imageS),
    borderRadius: getWidth(dimens.imageS),
    resizeMode: "contain",
  },
  specialist: {
    fontSize: getWidth(fontSize.textXl),
  },
  buttonOrder: {
    alignSelf: "center"
  },
  text: {
    fontSize: getWidth(fontSize.textS),
    marginTop: getWidth(4)
  }
});
