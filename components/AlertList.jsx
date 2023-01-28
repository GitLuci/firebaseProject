import React, {useState}from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text,TouchableOpacity} from 'react-native'
import TaskModal from '../components/TaskModal';
import { firebase } from '@react-native-firebase/database';


const AlertList = ({alert}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity >
        <Text style={styles.title}>Alert</Text>
        <Text>{alert}</Text>
      </TouchableOpacity>
    </View>
  )
}

AlertList.propTypes = {
  alert: PropTypes.string,

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    textAlign: 'left',
    justifyContent: 'center',
    padding:10,
    paddingLeft:15,
  },

  title:{
    color:"black",
  }
});

export default AlertList
