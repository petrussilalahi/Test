import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import UserIcons from '../../Assets/user.png';
import ArrowBack from '../../Assets/arrow.png';
import {styles} from './style.js';
import {getDataDetail} from '../../Services';
import {useQuery} from '@tanstack/react-query';

const PaymentDetailScreen = ({navigation}) => {
  const [isActive, setIsActive] = useState(false);
  const dataGuest = useSelector(state => state.addGuestReducer.orders);

  const handleSwitch = params => {
    if (params) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const {
    isLoading,
    error,
    data: dataDetails,
  } = useQuery(['getDataDetail'], async () => await getDataDetail());

  console.log('dataDetails', dataGuest);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* detail step section */}
        <View style={styles.stepContainer}>
          <View style={styles.numberStepCircle}>
            <Text style={styles.titleNumberStep}>1</Text>
          </View>
          <Text style={styles.titleStep}>Detail Pesanan</Text>
        </View>

        {/* content section */}
        <View style={styles.contentContainer}>
          <Text style={styles.titleDetail}>Detail Pesanan</Text>

          {/* card content section */}
          <View style={styles.cardContainer}>
            <Image
              source={{
                uri: dataDetails?.chosen_hotel?.data?.get_chosen_hotel
                  ?.chosen_hotel_detail?.images?.[0]?.thumbnail,
              }}
              style={styles.imageCard}
            />

            {!isLoading ? (
              <View style={styles.titleCardContainer}>
                <Text style={styles.titleCard}>
                  {
                    dataDetails?.chosen_hotel?.data?.get_chosen_hotel
                      ?.chosen_hotel_detail?.hotel_name
                  }
                </Text>
                <Text style={styles.subtitleCard}>
                  {dataDetails?.chosen_hotel?.data?.get_chosen_hotel
                    ?.chosen_hotel_room?.room_name +
                    ' - ' +
                    dataDetails?.chosen_hotel?.data?.get_chosen_hotel
                      ?.chosen_hotel_room?.meal +
                    ' - ' +
                    dataDetails?.chosen_hotel?.data?.get_chosen_hotel
                      ?.chosen_hotel_room?.total_room +
                    ' Kamar ' +
                    dataDetails?.chosen_hotel?.data?.get_chosen_hotel
                      ?.chosen_hotel_room?.guest_adult +
                    ' Tamu ' +
                    dataDetails?.chosen_hotel?.data?.get_chosen_hotel
                      ?.chosen_hotel_room?.total_room +
                    ' Malam. '}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: 70,
                }}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            )}
          </View>

          {/* check-in check-out date section */}
          <View style={styles.titleCheckContainer}>
            <Text style={styles.titleDetail}>Check-In</Text>
            {!isLoading ? (
              <Text style={styles.subtitleCard}>
                {
                  dataDetails?.chosen_hotel?.data?.get_chosen_hotel
                    ?.chosen_hotel_params?.check_in
                }
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#0000ff" />
            )}
          </View>
          <View style={styles.titleCheckContainer}>
            <Text style={styles.titleDetail}>Check-Out</Text>
            {!isLoading ? (
              <Text style={styles.subtitleCard}>
                {
                  dataDetails?.chosen_hotel?.data?.get_chosen_hotel
                    ?.chosen_hotel_params?.check_out
                }
              </Text>
            ) : (
              <ActivityIndicator size="small" color="#0000ff" />
            )}
          </View>
          <View style={styles.titleRefundContainer}>
            <Text style={styles.titleRefund}>
              Rp - Dapat direfund jika dibatalkan
            </Text>
          </View>
          <View style={styles.divider} />

          {/* detail order content section */}
          <Text style={styles.titleDetail}>Detail Pemesan</Text>
          <View style={styles.cardContainerOrder}>
            <Text style={styles.titleDetail}>Tn. Kefas Benaiah</Text>
            <View style={styles.emailContainer}>
              <Text style={styles.subtitleCard}>Kefas@gmail.com</Text>
              <TouchableOpacity>
                <Text style={styles.titleEdit}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.subtitleCard}>+62-8123-4567-890</Text>
          </View>

          {/* radio button order section */}
          <View style={styles.radioButtonContainer}>
            <View style={styles.radioButtonItem}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => handleSwitch(true)}>
                <View
                  style={[
                    isActive
                      ? styles.circleRadioActive
                      : styles.circleRadioInActive,
                  ]}
                />
              </TouchableOpacity>
              <Text>Saya memesan untuk sendiri</Text>
            </View>
            <View style={styles.radioButtonItem}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => handleSwitch(false)}>
                <View
                  style={[
                    isActive
                      ? styles.circleRadioInActive
                      : styles.circleRadioActive,
                  ]}
                />
              </TouchableOpacity>
              <Text>Saya memesan untuk orang lain</Text>
            </View>
          </View>

          {/* guest data order section */}
          <Text style={styles.titleDetail}>Data Tamu</Text>
          {dataGuest.length > 0 &&
            dataGuest.map(element => {
              return (
                <View style={styles.cardContainerUser}>
                  <Image source={UserIcons} style={styles.iconUser} />
                  <Text>
                    {element.gender == 'Mr' ? 'Tn. ' : 'Ny. '}
                    {element.name}
                  </Text>
                </View>
              );
            })}

          {/* button navigate add data section */}
          <View style={styles.editGuestDataContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddDataScreen')}>
              <Text style={styles.titleEdit}>Ubah Data Tamu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentDetailScreen;
