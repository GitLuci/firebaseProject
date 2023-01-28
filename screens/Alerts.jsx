import React, { useState,useEffect } from 'react'
import { Text,View,Modal, TextInput,Button, StyleSheet,FlatList } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import { addUser } from '../reducers/currentUserSlice';
import { useSelector } from 'react-redux';
import AlertModal from '../components/AlertModal';
import TaskList from '../components/TaskList';
import AlertList from '../components/AlertList';


const Alerts = () => {
const [modalOpen,setModalOpen] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const [alerts, setAlerts] = useState([]);
const currentUser = useSelector(state => state.currentUser);
console.log("Current user")
console.log(currentUser)

const createAlert = () => {
  setIsModalOpen(true);
  const alertsRef = firebase.app().database('https://taskmanagerproject-22bda-default-rtdb.firebaseio.com/').ref('/alerts');
}

useEffect(() => {
  //retrieve tasks for current user
  const alertsRef = firebase.app().database('https://taskmanagerproject-22bda-default-rtdb.firebaseio.com/').ref('/alerts');

  const onLoadingListener = alertsRef.on('value', (snapshot) => {
    console.log("A escuta de dados foi iniciada");
    const data = snapshot.val();

    const loadedAlerts= [];
    for (let key in data) {
      console.log("data alert")
      console.log(data[key].dataAlert)
      loadedAlerts.push(data[key]);
      console.log(loadedAlerts)
    }
    setAlerts(loadedAlerts)
  });

  // Stop listening for updates when no longer required
  return () => {
    alertsRef.off('value', onLoadingListener);
  };
}, []);


const renderItem = ({ item }) => (
  
  <AlertList
  alert={item.dataAlert}

  />   );


if (currentUser.role == "admin"){

  return (
    <>
    <Text style={styles.title}>Alerts</Text>
    <AlertModal modalVisible={isModalOpen} setModalVisible={setIsModalOpen}/>
    <FlatList
    data={alerts}
    renderItem={renderItem}
    keyExtractor={item => item.dataAlert}/>

    <View style={styles.buttonContainer}>
      <Button style={styles.createTaskButton} title="Create Alert" onPress={createAlert}/>
      <View style={styles.space} />
    </View>
  </>
  )
}else if (currentUser.role == "worker")
{
  return (
    <>
    <Text style={styles.title}>Alerts</Text>
    <AlertModal modalVisible={isModalOpen} setModalVisible={setIsModalOpen}/>
    <FlatList
    data={alerts}
    renderItem={renderItem}
    keyExtractor={item => item.dataAlert}
    />
  </>
  )
}

}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 30,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 30,
  },
  createTaskButton: {
    margin: 20,
  },
  space: {
    width: 10,
    height: 10,
  },
  logout_button: {
    height: 100,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
})

export default Alerts;
