import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { Modal, View, Text, TouchableHighlight, StyleSheet, TextInput, Alert,TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';
import DatePicker from 'react-native-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import WorkesModal from './WorkesModal';
import { firebase } from '@react-native-firebase/database';

const TaskModal = ({modalVisible, setModalVisible}) => {
  const [description, setDescription] = React.useState('');
  const [taskasList, set_List_Alert] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [modalOpen,setModalOpen] = useState(false);
  const currentUser = useSelector(state => state.currentUser);
  const UserSelect = useSelector(state => state.UserSelect);
  const [isActive, setActive] = React.useState(false);
  const [isActive2, setActive2] = React.useState(false);
  const [isActive3, setActive3] = React.useState(false);
const dispatch = useDispatch();

useEffect(() => {
  const tasksRefa = firebase.app().database('https://taskmanagerproject-22bda-default-rtdb.firebaseio.com/').ref('/tasks');

  const onLoadingListener = tasksRefa.on('value', (snapshot) => {
    console.log("A escuta de dados foi iniciada");
    const data = snapshot.val();

    const taskasList= [];
    for (let key in data) {
      console.log("data Tasks")
      console.log(data[key])
      taskasList.push(data[key]);
      console.log(taskasList)
    }
    set_List_Alert(taskasList)
  });

  // Stop listening for updates when no longer required
  return () => {
    tasksRefa.off('value', onLoadingListener);
  };
}, []);

const randomID = () => {
  
  var randomid = Math.floor(Math.random() * 10000) + 1 ;
  uid = randomid

  for (let key in taskasList) {
    console.log("UID ALERTS ??????????????????????????????????????????????")
    console.log(taskasList[key].uid)

    if (uid == taskasList[key].uid){
      console.log("Uid igual")
      console.log(taskasList[key].uid)

      randomID()
    }else{
      console.log("Uid diferente")
      console.log(taskasList[key].uid)
      return uid
    }
  }
  return uid
}




  const handleSave = () => {
    console.log("dataaa")
    console.log(date)
    database().ref('/tasks')
    .push()
    .set({
      description: description,
      date: date.toDateString(),
      time: date.toLocaleTimeString(),
      uid: randomID(),
      id: currentUser.id,

    }).then(() => {
      console.log('Added task!')
      Alert.alert('Task created successfully!');
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
    }}
  >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Select the turn</Text>
        <View>
        <TouchableOpacity 

          onPress={()=>{

            setDescription("Morning");

            setActive(!isActive);

            setActive2(false);
            setActive3(false);
            

          }}>
          <Text style={{
          paddingBottom:10,
          color: isActive ? 'red' : 'black'}}>Morning</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
            setDescription("Afternoon");
            setActive2(!isActive2);
              setActive(false);
              setActive3(false);
            


          }}>
          <Text style={{
          paddingBottom:10,
          color: isActive2 ? 'red' : 'black'}}>Afternoon</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
            setDescription("Nigth");
            setActive3(!isActive3);
              setActive(false);
              setActive2(false);
            


          }}>
          <Text style={{
          paddingBottom:10,
          color: isActive3 ? 'red' : 'black'}}>Nigth</Text>
        </TouchableOpacity>

        </View>
        
        <Text style={styles.txtTitulos}>Time and date to start</Text>

        <DatePicker date={date} mode="datetime" onDateChange={setDate} />

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
            onPress={() => handleSave()}
          >
          <Text style={styles.textStyle}>Create Task</Text>
          </TouchableHighlight>

        </View>
      </View>
    </View>
  </Modal>
  )
}

TaskModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  
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
    color: 'black',
  },
  txtTitulos:{
    fontSize:20,

  },
});

export default TaskModal;
