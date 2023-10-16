import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import Header from 'components/common/Header';
import { useNavigation } from '@react-navigation/native';

const HomeView = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
          header: () => <Header isHideTitle title='Home Screen' />
        });
      }, [navigation]);
    return (
        <View style={{ flex: 1 }}><Text style={{ color: 'black' }}>HELLO</Text></View>
    )
}

export default HomeView

const styles = StyleSheet.create({})