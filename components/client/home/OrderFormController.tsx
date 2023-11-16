import { TreatmentMenu } from 'libs/types/ProvierTypes';
import { OrderDetail } from 'libs/types/UserType';
import { numericPattern } from 'libs/utility/Utils';
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

  const [isMeSelected, setIsMeSelected] = useState(
    order?.patient_type?.type === 'me',
  );
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
  const [phoneError, setPhoneError] = useState('');
  const [ageError, setAgeError] = useState('');
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

  const isValidPhoneNumber = (p: string) => numericPattern.test(p);

  const validatePhoneNumber = () => {
    if (!isValidPhoneNumber(phoneRef.current.value)) {
      setPhoneError('Phone number is not valid');
    } else setPhoneError('');
  };
  const validateAge = () => {
    if (!isValidPhoneNumber(ageRef.current.value)) {
      setAgeError('Age is not valid');
    } else setAgeError('');
  };
  const onChangeAge = (value: string) => {
    ageRef.current.value = value;
    validateAge();
  };
  const onChangePhone = (value: string) => {
    phoneRef.current.value = value;
    validatePhoneNumber();
  };

  const onSubmitDetail = () => {
    if (!phoneError?.length && !ageError?.length) {
      setOrder({
        ...order,
        patient_type: {
          type: 'other',
          age: calculateBirthDate(ageRef.current.value),
        },
        phonenumber: phoneRef?.current?.value,
      });
      setIsSubmitDetail(true);
    }
  };

  const onSelectReasons = (item: any) => {
    const updatedActiveButton = [...activeButton];
    const itemIndex = updatedActiveButton.indexOf(item.reason_id);

    if (itemIndex !== -1) {
      updatedActiveButton.splice(itemIndex, 1);
    } else {
      updatedActiveButton.push(item.reason_id);
    }
    setActiveButton(updatedActiveButton);
    const updatedSelectedResourceType = selectedResourceType.includes(item)
      ? selectedResourceType.filter((selectedItem) => selectedItem !== item)
      : [...selectedResourceType, item];

    setSelectedResourceType(updatedSelectedResourceType);
    setOrder((prevOrder) => ({
      ...prevOrder,
      reason: updatedSelectedResourceType,
    }));
  };

  const onMeTogglePress = (item: string) => {
    if (item === 'me') {
      setIsMeSelected(true);
      setOrder({
        ...order,
        isOrderForOther: false,
      });
    } else {
      setIsMeSelected(false);
      setOrder({
        ...order,
        isOrderForOther: true,
      });
    }
    // setOrder({
    //   ...order,
    //   patient_type: {
    //     type: item,
    //     age: calculateBirthDate(ageRef?.current?.value ?? ''),
    //   },
    // });
  };

  const handleItemPress = (item: TreatmentMenu) => {
    const updatedActiveCheckbox = [...activeCheckbox];
    const itemIndex = updatedActiveCheckbox.indexOf(item?.menu_id);
    let updatedSelectedMenu: TreatmentMenu[]; // Explicitly define the type

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
    setOrder((prevOrder) => ({
      ...prevOrder,
      services: updatedSelectedMenu,
    }));
  };

  const onChangeAddress = (address: string) => {
    setOrder({
      ...order,
      address: address,
    });
    setIsVisible(false);
  };

  const onSubmitDescription = () => {
    if (otherReasons.current.value) {
      setIsModalVisible(false);
      setOrder({
        ...order,
        Additional_notes: otherReasons?.current?.value,
      });
    }
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
    phoneError,
    ageError,
  };
};

export default OrderFormController;

const styles = StyleSheet.create({});
