import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Link } from '@react-navigation/native';

//Screens

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Profile (profile pic, items, pending trades, bookmarked items)</Text>
      <Link to={{ screen: 'Settings', params: { id: '47' } }}>
      Go to Settings
      </Link>
      <Button
        title="Add Item"
        onPress={() => navigation.navigate('AddItem', {
          itemId: 12
        })}
      />
      <Button
        title="LOGOUT"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        }
      />
      <Button
        title="View Item Details"
        onPress={() => navigation.navigate('ItemDetails', {
          itemId: 21
        })
        }
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
