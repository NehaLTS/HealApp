import { OrderDetail } from 'libs/types/UserType';
import React, { useState } from 'react';

const SummaryViewController = ({ order }: { order: OrderDetail }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const arrivalRef = React.useRef<any>('');
  const totalPrice: number = order?.services.reduce(
    (total, item) => total + parseInt(item.price, 10),
    0,
  );

  const calculateAgeFromDate = (dateString: string) => {
    const parts = dateString.split(' ');
    if (parts.length < 4) {
      return NaN;
    }
    const year = parseInt(parts[3], 10);
    const currentDate = new Date();
    if (isNaN(year)) {
      return NaN;
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
