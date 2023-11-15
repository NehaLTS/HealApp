import { TreatmentMenu } from 'libs/types/ProvierTypes';
import { OrderDetail } from 'libs/types/UserType';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

const OrderFormController = ({
  setOrder,
  order,
}: {
  setOrder: React.Dispatch<React.SetStateAction<OrderDetail>>;
  order: OrderDetail;
}) => {
  const uniqueReasonIds: number[] = [];
  order?.reason.forEach((item) => {
    if (!uniqueReasonIds.includes(item.reason_id)) {
      uniqueReasonIds.push(item.reason_id);
    }
  });
  const uniqueMenuIds: number[] = [];
  order?.services?.forEach((item) => {
    if (!uniqueMenuIds.includes(item.menu_id)) {
      uniqueMenuIds.push(item.menu_id);
    }
  });

  const [isMeSelected, setIsMeSelected] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitDetail, setIsSubmitDetail] = useState(false);
  const [activeButton, setActiveButton] = useState<number[]>(uniqueReasonIds);
  const [activeCheckbox, setActiveCheckbox] = useState<number[]>(uniqueMenuIds);
  const [selectedResourceType, setSelectedResourceType] = useState<any[]>(
    order?.reason,
  );
  const [selectedMenu, setSelectedMenu] = useState<TreatmentMenu[]>(
    order?.services,
  );
  const ageRef = React.useRef<any>('');
  const phoneRef = React.useRef<any>('');
  const otherReasons = React.useRef<any>('');
  const [isVisible, setIsVisible] = useState(false);

  function calculateBirthDate(age: number) {
    const currentDate = new Date();
    const birthYear = currentDate.getFullYear() - age;
    const birthDate = new Date(birthYear, 0, 1, 0, 0, 0, 0);
    birthDate.setMinutes(birthDate.getMinutes() + 330);
    const options = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    const formattedDate = birthDate.toLocaleString('en-US', options as any);
    return formattedDate;
  }

  function calculateAgeFromDate(dateString: string) {
    const parts = dateString.split(' ');
    if (parts.length < 4) {
      return 0;
    }
    const year = parseInt(parts[3], 10);
    const currentDate = new Date();
    if (isNaN(year)) {
      return 0;
    }
    const age = currentDate.getFullYear() - year;
    return age;
  }

  const onChangeAge = (value: string) => (ageRef.current.value = value);
  const onChangePhone = (value: string) => (phoneRef.current.value = value);
  const onSubmitDetail = () => {
    setOrder({
      ...order,
      patient_type: {
        type: 'other',
        age: calculateBirthDate(ageRef.current.value),
      },
      phonenumber: phoneRef?.current?.value,
    });
    setIsSubmitDetail(true);
  };

  const onSelectReasons = (item: any) => {
    const updatedActiveButton = [...activeButton]; // Create a copy of the activeButton array
    const itemIndex = updatedActiveButton.indexOf(item.reason_id);

    if (itemIndex !== -1) {
      updatedActiveButton.splice(itemIndex, 1);
    } else {
      updatedActiveButton.push(item.reason_id);
    }
    setActiveButton(updatedActiveButton);
    setSelectedResourceType((prev) => [...prev, item]);
    setOrder({
      ...order,
      reason: [...selectedResourceType, item],
    });
  };

  const onMeTogglePress = (item: string) => {
    if (item === 'me') setIsMeSelected(true);
    else setIsMeSelected(false);
    setOrder({
      ...order,
      patient_type: {
        type: 'me',
        age: calculateBirthDate(ageRef?.current?.value ?? ''),
      },
    });
  };

  console.log('selectedMenu', selectedMenu);
  const handleItemPress = (item: TreatmentMenu, index: number) => {
    const updatedActiveCheckbox = [...activeCheckbox]; // Create a copy of the activeButton array
    const itemIndex = updatedActiveCheckbox.indexOf(item?.menu_id);
    let updatedSelectedMenu;
    if (itemIndex !== -1) {
      updatedActiveCheckbox.splice(itemIndex, 1);
    } else {
      updatedActiveCheckbox.push(item.menu_id);
    }
    setActiveCheckbox(updatedActiveCheckbox);
    if (
      selectedMenu.find((selectedItem) => selectedItem.menu_id === item.menu_id)
    ) {
      updatedSelectedMenu = selectedMenu.filter(
        (selectedItem) => selectedItem.menu_id !== item.menu_id,
      );
    } else {
      updatedSelectedMenu = [...selectedMenu, item];
    }
    setSelectedMenu(updatedSelectedMenu);
    setOrder({
      ...order,
      services: [...selectedMenu, item],
    });
  };

  const onChangeAddress = (address: string) => {
    setOrder({
      ...order,
      address: address,
    });
    setIsVisible(false);
  };

  const onSubmitDescription = () => {
    setOrder({
      ...order,
      Additional_notes: otherReasons?.current?.value,
    });
  };

  return {
    activeButton,
    onSelectReasons,
    setIsModalVisible,
    isModalVisible,
    otherReasons,
    handleItemPress,
    activeCheckbox,
    setIsVisible,
    isMeSelected,
    onMeTogglePress,
    isSubmitDetail,
    calculateAgeFromDate,
    ageRef,
    onChangeAge,
    phoneRef,
    onChangePhone,
    onSubmitDetail,
    isVisible,
    onChangeAddress,
    onSubmitDescription,
  };
};

export default OrderFormController;

const styles = StyleSheet.create({});
