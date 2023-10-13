import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { SetStateAction, useEffect, useState } from 'react'
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { UseUserContextProvider } from 'contexts/useUserContextProvider';

const ProviderServices = () => {
const {onGetProviderService} = AuthServicesProvider()
const { userDataProvider } = UseUserContextProvider()
const  [services, setServices] = useState([])
const  [isLoading, setIsLoading] = useState(false)

  


  const getProviderServices = async() =>{

    setIsLoading(true);
    let response= await onGetProviderService({provider_id: '1' ?? '', specialty_id: '1' ?? ''});
    setServices(response.services);
    setIsLoading(false);

  }

  useEffect(() => {
    getProviderServices();
  }, [])
  return (
    <>

      <Text style={styles.text}>Authority to add a prescription</Text>
      <View style={styles.container}>
        <Text style={styles.text}>Yes</Text>
        <Image source={require("../../../../assets/icon/selecter.png")} style={styles.select} />
        <Text style={styles.text}>No</Text>
        <Image source={require("../../../../assets/icon/selecter.png")} style={styles.select} />

      </View>
      <Text style={styles.textS}>Services you provide</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.servicesContainer}>
          {services.map((item, index) => (

            <View key={index} style={styles.serviceRow}>
              <Text style={styles.serviceText}>{item.name.en}</Text>
              <Text style={styles.serviceText}>{item.price}</Text>
              <View style={styles.checkbox} />
            </View>
          ))}
      
        </View>
      </ScrollView>
    </>
  );
};


export default ProviderServices

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: getHeight(dimens.marginL),
    marginTop: getHeight(dimens.marginL),
    flex: 0.3,
  },
  text: {
    color: colors.black,
    fontSize: fontSize.textL,
    textAlign:"center"
  },

  select: {
    height: getHeight(dimens.marginL),
    width: getWidth(dimens.marginL),
  },
  textS: {
    color: colors.black,
    fontSize: fontSize.textXl,
    marginBottom:getHeight(dimens.marginS)
  },

  scrollView: {
    flex: 1,
    marginBottom: getHeight(dimens.marginL),

  },
  serviceText: {
    color: colors.black,
    fontSize: fontSize.textL,
    marginBottom: getHeight(dimens.marginM),
  },
  servicesContainer: {
    borderWidth: getWidth(dimens.borderBold),
    borderRadius: getWidth(dimens.marginS),
    backgroundColor: colors.offWhite,
    borderColor: colors.primary,

  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: getHeight(dimens.marginM)
  },
  checkbox: {
    width: getWidth(dimens.marginM),
    height: getHeight(dimens.marginM),
    borderWidth: getHeight(dimens.borderThin),
    borderColor: colors.black,
    borderRadius: 5,
    backgroundColor: colors.offWhite, 
  },
});