import { UseClientUserContext } from 'contexts/UseClientUserContext';
import { ClientOrderServices } from 'libs/ClientOrderServices';
import { treatment } from 'libs/types/ProvierTypes';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

const OrderFormController = () => {
  const [activeButton, setActiveButton] = useState<number[]>([]);
  const [selectedResourceType, setSelectedResourceType] = useState();
  const { treatmentMenu } = ClientOrderServices()
  const [treatmentReason, setTreatmentReason] = useState<treatment[]>()
  const { orderDetails, setOrderDetails } = UseClientUserContext()
  const onSelectReasons = (item: any) => {
    const updatedActiveButton = [...activeButton];
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
  useEffect(() => {
    treatmentReasons()
    setOrderDetails({ ...orderDetails, patient_type: 'me' })
  }, [])
  const treatmentReasons = async () => {
    try {
      const res = await treatmentMenu({ provider_type_id: "1" });
      console.log("res treatmentReasons", res); // Log the response data, not the string "res"
      setTreatmentReason(res)
    } catch (error) {
      console.error(error);
    }
  };
  return {
    activeButton,
    onSelectReasons,
    setSelectedResourceType,
    setActiveButton,
    treatmentReason
  }
}

export default OrderFormController

const styles = StyleSheet.create({})