import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from 'designToken/colors';
import { fontSize } from 'designToken/fontSizes';
import { getHeight, getWidth } from 'libs/StyleHelper';
import { dimens } from 'designToken/dimens';

const Stepper = ({
  currentStep,
  totalStep,
}: {
  currentStep: string;
  totalStep: string[];
}) => {
  const currentStepIndex = totalStep.indexOf(currentStep);

  return (
    <View style={styles.container}>
      {totalStep?.map?.((_, index: number) => {
        const isActive = index <= currentStepIndex;
        return (
          <View
            key={index}
            style={[
              styles.activeButtonView,
              {
                backgroundColor: isActive ? colors.secondary : colors.disabled,
              },
            ]}
          >
            <Text style={styles.activeButtonText}>{index + 1}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Stepper;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: getHeight(dimens.sideMargin),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: getHeight(30),
    paddingTop: getHeight(10),
  },
  activeButtonText: {
    fontSize: getHeight(fontSize.textM),
    color: colors.black,
  },
  activeButtonView: {
    height: getHeight(dimens.marginL),
    width: getHeight(dimens.marginL),
    borderRadius: getWidth(dimens.marginS),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
