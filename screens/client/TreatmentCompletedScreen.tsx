import DoctorTipView from 'components/client/home/DoctorTipView'
import RatingView from 'components/client/home/RatingView'
import TreatmentEnd from 'components/client/home/TreatmentEnd'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

const TreatmentCompletedScreen = () => {
    const [showViews, setShowViews] = useState('Treatmen_End')

    return (
        <View>
            {showViews === 'Treatmen_End' && <TreatmentEnd onPress={() => { setShowViews('Rating_View') }} />}
            {showViews === 'Rating_View' && <RatingView onPress={() => { setShowViews('Tip_View') }} />}
            {showViews === 'Tip_View' && <DoctorTipView onPress={() => { }} />}
        </View>
    )
}

export default TreatmentCompletedScreen

const styles = StyleSheet.create({

})