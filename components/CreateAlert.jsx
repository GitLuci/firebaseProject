import React, { useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { Modal, View, Text, TouchableHighlight, StyleSheet, TextInput, Alert,TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import DatePicker from 'react-native-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import WorkesModal from './WorkesModal';
import { firebase } from '@react-native-firebase/database';

const CreateAlert = ({modalVisible, setModalVisible}) => {
  const [dataAlert, setDataAlert] = React.useState('');
  const [alertsList, set_List_Alert] = React.useState('');
  const currentUser = useSelector(state => state.currentUser);


useEffect(() => {
    //retrieve tasks for current user
    const alertsRef = firebase.app().database('https://taskmanagerproject-22bda-default-rtdb.firebaseio.com/').ref('/alerts');

    const onLoadingListener = alertsRef.on('value', (snapshot) => {
      console.log("A escuta de dados foi iniciada");
      const data = snapshot.val();

      const alertsList= [];
      for (let key in data) {
        console.log("data alerts")
        console.log(data[key])
        alertsList.push(data[key]);
        console.log(alertsList)
      }
      set_List_Alert(alertsList)
    });

    // Stop listening for updates when no longer required
    return () => {
      alertsRef.off('value', onLoadingListener);
    };
  }, []);

const randomID = () => {
  
  var randomid = Math.floor(Math.random() * 10000) + 1 ;
  uid = randomid

  for (let key in alertsList) {
    console.log("UID ALERTS ??????????????????????????????????????????????")
    console.log(alertsList[key].uid)

    if (uid == alertsList[key].uid){
      console.log("Uid igual")
      console.log(alertsList[key].uid)

      randomID()
    }else{
      console.log("Uid diferente")
      console.log(alertsList[key].uid)
      return uid
    }
  }
  return uid
}

  const AlertSave = () => {

    database()    
    .ref('/alerts')
    .push()
    .set({
      uid:randomID(),
      dataAlert,
      id_User_Alert: currentUser.id,

    }).then(() => {
      console.log('Added Alert!')
      Alert.alert('Alert created successfully!');
      setModalVisible(false);
    }).catch((error) => console.log(error));
  };



  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible(!modalVisible);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Write the Alert</Text>
        <View>
          <TextInput
            label='Description'
            placeholder='This is a alert for example'
            value={dataAlert}
            onChangeText={dataAlert => setDataAlert(dataAlert)}
            autoCapitalize={'none'}></TextInput>
        </View>


        <View style={styles.buttonContainer}>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => AlertSave()}
          >
          <Text style={styles.textStyle}>Create Alert</Text>
          </TouchableHighlight>

        </View>


      </View>
    </View>
    </Modal>
  )
}



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 10
  },
  txtCreat:{
    paddingBottom:10,
    color:"blue",

  },
  txtTitulos:{
    fontSize:20,

  },
});

export default CreateAlert;
