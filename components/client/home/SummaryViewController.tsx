import { OrderDetail } from 'libs/types/UserType';
import React, { useState } from 'react';

const SummaryViewController = ({ order }: { order: OrderDetail }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const arrivalRef = React.useRef<any>('');

  const totalPrice: number | undefined = order?.services?.reduce(
    (total, item) => total + parseFloat(item?.price || '0'),
    0,
  );

  const calculateAgeFromDate = (dateString: string) => {
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
  };
  return {
    isVisible,
    calculateAgeFromDate,
    totalPrice,
    setIsVisible,
    arrivalRef,
  };
};

export default SummaryViewController;
