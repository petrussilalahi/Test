import React, {Component, useState, useCallback} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
// Assets
import ArrowBack from '../../Assets/arrow.png';
import TrashIcon from '../../Assets/trash-can.png';
// Styles
import {styles} from './style';
// Actions
import {addOrder, delOrder} from '../../Actions/addGuestAction';

const AddGuestScreen = ({navigation}) => {
  const orders = useSelector(state => state.addGuestReducer.orders);
  const dispatch = useDispatch();
  const [dataOrder, setDataOrder] = useState([...orders]);

  const _handleAddData = () => {
    const newArr = [...dataOrder];
    newArr.push({gender: 'Mr', name: ''});
    setDataOrder(newArr);
  };

  const _handleDeleteOrder = id => {
    const newArr = [...dataOrder];
    newArr.splice(id, 1);
    setDataOrder(newArr);
  };

  const _handleSaveData = () => {
    dispatch(addOrder(dataOrder));
    navigation.navigate('PaymentDetailScreen');
  };

  const _handleOnChangeInput = (id, text) => {
    let newArr = [...dataOrder];
    newArr[id].name = text;
    setDataOrder(newArr);
  };

  const _handleChangeGender = (value, id) => {
    let newArr = [...dataOrder];
    newArr[id].gender = value == 'Mr' ? 'Ms' : 'Mr';
    setDataOrder(newArr);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          {/* content section */}
          <View style={styles.contentContainer}>
            <Text style={styles.titleDataGuest}>Data Tamu</Text>

            {/* guest name input section */}
            {dataOrder.map((element, key) => {
              return (
                <View key={key} style={styles.contentEditContainer}>
                  <View style={styles.genderContainer}>
                    <Picker
                      selectedValue={element.gender}
                      style={styles.picker}
                      onValueChange={() =>
                        _handleChangeGender(element.gender, key)
                      }>
                      <Picker.Item label="Mr" value="Mr" />
                      <Picker.Item label="Ms" value="Ms" />
                    </Picker>
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Input Nama Tamu"
                    value={element.name}
                    onChangeText={text => _handleOnChangeInput(key, text)}
                  />
                  <TouchableOpacity onPress={() => _handleDeleteOrder(key)}>
                    <Image source={TrashIcon} style={styles.iconTrash} />
                  </TouchableOpacity>
                </View>
              );
            })}
            <TouchableOpacity onPress={_handleAddData}>
              <Text style={styles.addMore}>+ Tambah Data Tamu</Text>
            </TouchableOpacity>
          </View>

          {/* footer section */}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.footer} onPress={_handleSaveData}>
        <Text style={styles.saveButton}>Simpan</Text>
      </TouchableOpacity>
    </>
  );
};

export default AddGuestScreen;
