import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Context} from '../../globals/context.js';

export default function LoginScreen({navigation}) {
  const {login, userToken} = React.useContext(Context);

  return (
    <View style={styles.container}>
      <Text>User token: {userToken}</Text>
      <Text>Login</Text>
      <Button
      title='Register'
      onPress={() => {
        navigation.navigate('RegisterScreen')
      }}
      />
      <Button
      title='Fake Login with User: 1'
      onPress={login}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
