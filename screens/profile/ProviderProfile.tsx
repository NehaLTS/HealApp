import { useRoute } from '@react-navigation/native';
import Language from 'components/provider/profile/Language';
import OrderHistory from 'components/provider/profile/OrderHistory';
import Payments from 'components/provider/profile/Payments';
import Profile from 'components/provider/profile/Profile';
import Reports from 'components/provider/profile/Reports';
import Support from 'components/provider/profile/Support';
import React from 'react';

const ProviderProfile = () => {
  const route = useRoute<any>();
  const screen = route?.params?.screen ?? '';

  const renderScreen = () => {
    switch (screen) {
      case 'Order history':
        return <OrderHistory />;
      case 'Reports':
        return <Reports />;
      case 'Payments':
        return <Payments />;
      case 'Support':
        return <Support />;
      case 'Personal profile':
        return <Profile />;
      case 'Languages':
        return <Language />;
    }
  };
  return renderScreen();
};

export default ProviderProfile;
