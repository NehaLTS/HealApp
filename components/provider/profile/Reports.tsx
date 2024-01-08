import { useNavigation } from '@react-navigation/native';
import arrowBack from 'assets/icon/arrowBack.png';
import Button from 'components/common/Button';
import Loader from 'components/common/Loader';
import SelectYear from 'components/common/SelectYear';
import Text from 'components/common/Text';
import TextButton from 'components/common/TextButton';
import { UseProviderUserContext } from 'contexts/UseProviderUserContext';
import { colors } from 'designToken/colors';
import { dimens } from 'designToken/dimens';
import { fontSize } from 'designToken/fontSizes';
import { AuthServicesProvider } from 'libs/authsevices/AuthServiceProvider';
import { getHeight, getWidth } from 'libs/StyleHelper';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Easing,
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const Reports = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation()
  const { GetProviderReport } = AuthServicesProvider()
  const { userId } = UseProviderUserContext()
  const [reportData, setReportData] = useState<any>([]); // Initialize reportData as an empty array
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  console.log("first******", activeFilters)
  const toggleFilter = (filterKey: string) => {
    console.log("filterKey", filterKey);
    let updatedFilters: string[] = [...activeFilters];
    if (updatedFilters.includes(filterKey)) {
      updatedFilters = updatedFilters.filter((key) => key !== filterKey);
    } else {
      updatedFilters.push(filterKey);
    }
    setActiveFilters(updatedFilters);
  };
  const countActiveFilters = () => {
    return activeFilters.length;
  };
  const filters = [
    { key: 'earnings', label: 'Earnings' },
    { key: 'number_of_patients', label: 'Number of patients' },
    { key: 'ratings', label: 'Rating' },
    { key: 'number_of_cancel', label: 'Number of cancels' },
  ];

  const fetchReportData = async (filter: string) => {
    try {
      setIsLoading(true);
      const report = await GetProviderReport("50", selectedYear?.toString(), filter)
      if (report) {
        setReportData(report);
      }
    } catch (error) {
      console.error('Error fetching report:', error);
    } finally {
      setIsLoading(false);
    }

  };
  useEffect(() => {
    fetchReportData(selectedFilter);
  }, [selectedYear]);


  const filterData = () => {
    const filteredData: { [key: string]: string } = {};
    activeFilters.forEach((filterKey) => {
      const formattedKey = filterKey.replace(/_/g, ' ');
      if (reportData.hasOwnProperty(filterKey)) {
        filteredData[formattedKey] = reportData[filterKey];
      }
    });
    return filteredData;
  };

  const filteredReportData = filterData();
  console.log("Filtered Report Data:", filteredReportData);
  const reportDataString = JSON.stringify(reportData);
  console.log(reportDataString);
  const headerLeft = () => (
    <TouchableOpacity
      style={styles.arrowBackButton}
      onPress={() => navigation.goBack()}
    >
      <Image source={arrowBack} style={styles.arrowBack} />
    </TouchableOpacity>
  );
  const headerTitle = () => <Text style={styles.title} title={t('reports')} />;
  const buttonWidths = {
    earnings: '15%',
    numPatients: '35%',
    rating: '15%',
    numCancels: '30%',
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (countActiveFilters() > 0) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [countActiveFilters()]);

  return (
    <>
      <View style={styles.headerContainer}>
        {headerLeft()}
        {headerTitle()}
      </View>
      <View style={styles.container}>
        <SelectYear setYear={setSelectedYear} />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Button title={'Clear Filter'} isSmall
              isPrimary
              width={'20%'}
              fontSized={14}
              height={40}
              onPress={() => {
                setActiveFilters([]);
                fetchReportData(selectedFilter);
              }}
              style={{ alignSelf: "flex-end", marginTop: getHeight(20) }} />
            <View style={styles.buttonContainer}>
              <TextButton
                title={'Filter'}
                fontSize={getHeight(14)}
                style={styles.filterText}
              />
              {countActiveFilters() > 0 && (
                <Text style={styles.filterCount}>{countActiveFilters()}</Text>
              )}
              {filters.map((item) => (
                <Button
                  key={item.key}
                  isSmall
                  isPrimary={activeFilters.includes(item.key)}
                  width={buttonWidths[item.key]}
                  fontSized={getHeight(14)}
                  lineHeight={getHeight(20)}
                  borderRadius={getWidth(10)}
                  height={getHeight(40)}
                  title={item.label}
                  // onPress={() => setSelectedFilter(item.key)}
                  onPress={() => {
                    setIsLoading(false);
                    toggleFilter(item.key);
                  }}
                  style={{ marginBottom: getHeight(20) }}
                />
              ))}

            </View>
            {reportData && (
              <View style={styles.dataBox}>

                <View style={styles.innerData}>
                  {Object.keys(filteredReportData).map((key) => (
                    <Animated.View
                      style={[styles.reportText, { opacity: fadeAnim }]}
                      key={key}
                    >
                      <Text > {`${filters.find((filter) => filter.key === key)?.label || key}: ${filteredReportData[key]
                        }`}</Text>
                    </Animated.View>
                  ))}
                </View>

              </View>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default Reports;

const styles = StyleSheet.create({
  arrowBack: {
    width: getWidth(dimens.paddingS + dimens.borderBold),
    height: getHeight(dimens.marginM + dimens.borderBold),
    resizeMode: 'center',
    transform: [{ rotate: I18nManager.isRTL ? '180deg' : '0deg' }],
  },
  container: {
    paddingTop: getHeight(dimens.marginL),
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: getWidth(dimens.marginM),
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: getWidth(dimens.marginM),
    zIndex: 1,
    paddingVertical: getHeight(dimens.marginS),
    alignItems: 'center',
    gap: getWidth(dimens.marginM),
    paddingTop: getHeight(dimens.marginM),
  },
  title: {
    fontSize: getHeight(fontSize.heading - dimens.borderBold),
    textAlign: 'center',
    width: '70%',
  },
  arrowBackButton: {
    paddingRight: getWidth(dimens.sideMargin),
    paddingVertical: getHeight(dimens.marginS / dimens.borderBold),
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: "center",
    marginTop: getHeight(20),
    gap: 10,
    position: 'relative',
  },
  filterText: {
    marginRight: 10,
  },
  dataBox: {
    borderWidth: getHeight(dimens.borderThin),
    borderColor: colors.primary,
    borderRadius: getHeight(dimens.marginS),
    height: getHeight(dimens.imageM + 20),
    paddingHorizontal: 10,
    marginTop: getHeight(dimens.marginL),
  },
  filterCount: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: getHeight(13),
    fontWeight: 'bold',
  },
  innerData: {
    justifyContent: "center",
    flexDirection: "column",
    gap: getHeight(10),
    paddingHorizontal: 5,
    marginTop: getHeight(20),
  },
  reportText: {
    fontSize: 16,
    color: 'black',
    gap: 20
  },
});
