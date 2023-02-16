import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react'
import { Context } from '../../../globals/context.js';

const NoItems = ({textHeader, text}) => {
  const {nav} = React.useContext(Context);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTextBox}>
            <Text style={styles.headerText}>{textHeader}</Text>
          </View>
          { textHeader === 'Your Items' && (
          <TouchableOpacity
          onPress={() => nav.navigate('AddItem')}
          >
            <Ionicons name='add-outline' size={40} color='#007AFF'/>
          </TouchableOpacity>
          )}
        </View>
        <View style={styles.noItemsBox}>
          <Text style={styles.noItemsText}>You have no {text} yet.. {text!=='trades' && 'Add one!'}{text === 'trades' && 'Propose one!'}</Text>
        </View>
      </View>
    )

}

export default NoItems

const styles = StyleSheet.create({
  container: {
    minHeight: 180,
    backgroundColor: 'rgb(213, 240, 245)',
    marginBottom: 20
  },
  header: {
    // backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 20
  },
  headerTextBox: {
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 24
  },
  noItemsBox: {
    // backgroundColor: 'yellow',
    // backgroundColor: 'rbg(237, 234, 225)',
    backgroundColor: 'rbg(211, 240, 245)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 20
  }

})

