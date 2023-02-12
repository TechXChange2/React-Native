import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
//React Context
import {Provider, Context} from './globals/context.js';
//Screens
import HomeTabs from './navScreens/TABNAV.js';
import AddItemScreen from './navScreens/modals/AddItemScreen.js';
import ProposeTradeScreen from './navScreens/modals/ProposeTradeScreen.js';
import ItemDetailsScreen from './navScreens/screens/ItemDetailsScreen.js';
import LoginScreen from './navScreens/modals/LoginScreen.js';
import RegisterScreen from './navScreens/modals/RegisterScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <Provider>
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          // backgroundColor: 'grey'
        }
      }}
      >
        <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{headerShown: false}}
        />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
        <Stack.Screen name="ProposeTradeScreen" component={ProposeTradeScreen} />
        <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{title: 'Item Details'}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: 'Login'}} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

//  {/* <StatusBar style="auto" /> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
