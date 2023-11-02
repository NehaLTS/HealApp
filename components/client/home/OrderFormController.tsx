import { useState } from 'react';
import { StyleSheet } from 'react-native';

const OrderFormController = () => {
  const [activeButton, setActiveButton] = useState<number[]>([]);
  const [selectedResourceType, setSelectedResourceType] = useState();
  const onSelectReasons = (item: any) => {
    const updatedActiveButton = [...activeButton]; // Create a copy of the activeButton array
    const itemIndex = updatedActiveButton.indexOf(item.id);

    if (itemIndex !== -1) {
      // The button is already selected, so remove it
      updatedActiveButton.splice(itemIndex, 1);
    } else {
      // The button is not selected, so add it
      updatedActiveButton.push(item.id);
    }
    setSelectedResourceType(item);
    setActiveButton(updatedActiveButton); // Update the state with the new array
  };
  const reasons = [
    { title: 'Back pain', id: 1 },
    { title: 'Heart pain', id: 2 },
    { title: 'Arrhythmia', id: 3 },
    { title: 'Headache', id: 4 },
    { title: 'Leg pain', id: 5 },
    { title: 'Vomiting', id: 6 },
  ];
  const treatmentsData = [
    { label: 'Visit - 500 NIS' },
    { label: 'Voltaren shot  - 100 NIS' },
    { label: 'Clacksen shot  - 100 NIS' },
  ];
  return {
    activeButton,
    onSelectReasons,
    setSelectedResourceType,
    setActiveButton,
    reasons,
    treatmentsData,
  };
};

export default OrderFormController;

const styles = StyleSheet.create({});
