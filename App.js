import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
// Screens
import PaymentDetailScreen from './src/Screens/PaymentDetail';
import AddDataScreen from './src/Screens/AddGuest';
// Store
import store from './src/Store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="PaymentDetailScreen"
            component={PaymentDetailScreen}
            options={{
              headerShown: true,
              headerTitle: 'Payment Detail',
              headerStyle: {
                backgroundColor: '#3A5896',
              },
              headerTitleStyle: {
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: 16,
              },
              headerTintColor: '#FFF',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="AddDataScreen"
            component={AddDataScreen}
            options={{
              headerShown: true,
              headerTitle: 'Tambah Data Tamu',
              headerStyle: {
                backgroundColor: '#3A5896',
              },
              headerTitleStyle: {
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: 16,
              },
              headerTintColor: '#FFF',
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
