import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
// import DropDown from 'react-native-element-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
const ProviderServices = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const data = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selected Value: {selectedValue}</Text>
      <Dropdown
       style={[styles.dropdown,   { borderColor: 'blue' }]}
        containerStyle={styles.dropdownContainer}
        labelField="label"
        data={data}
        value={selectedValue}
        onChange={(value) => setSelectedValue(value)}
        itemStyle={styles.dropdownItem}
        labelStyle={styles.dropdownLabel}
        placeholderStyle={styles.placeholderStyle}
        inputSearchStyle={styles.inputSearchStyle}
      />
    </View>
  );
};


export default ProviderServices

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdownContainer: {
    width: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropdownItem: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#333',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

