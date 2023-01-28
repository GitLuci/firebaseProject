import React, { useState,useEffect } from 'react'
import { Modal, View, Text, TouchableHighlight, StyleSheet,FlatList, Alert,TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '@react-native-firebase/database';
import WorkesList from './WorkesList';

const WorkesModal = ({modalVisible, setModalVisible}) => {
  const [users, setUsers] = useState([]);
  const userSelected = useSelector(state => state.userSelected);
  console.log("userSelected")
  console.log(userSelected)

useEffect(() => {
    //retrieve tasks for current user
    const usersRef = firebase.app().database('https://taskmanagerproject-22bda-default-rtdb.firebaseio.com/').ref('/users');

    const onLoadingListener = usersRef.on('value', (snapshot) => {
      console.log("A escuta de dados foi iniciada");
      const data = snapshot.val();

      const loadedUsers= [];
      for (let key in data) {
        console.log("data email")
        console.log(data[key].email)
        loadedUsers.push(data[key]);
        console.log(loadedUsers)
      }
      setUsers(loadedUsers)
    });

    // Stop listening for updates when no longer required
    return () => {
        usersRef.off('value', onLoadingListener);
    };
  }, []);

const renderItem = ({ item }) => (
  
    <WorkesList
    worker={item.email}

    />   );

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
      setModalVisible(!modalVisible);
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Select the Worker</Text>

        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item.email}/>
        <View style={styles.buttonContainer}>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.textStyle}>Cancel</Text>
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

export default WorkesModal;
