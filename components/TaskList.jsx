import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text,TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '@react-native-firebase/database';
const TaskList = ({description, date, time, worker}) => {
const [taskasList, set_List_Taskas] = React.useState('');
const currentUser = useSelector(state => state.currentUser);

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
    set_List_Taskas(taskasList)
  });

  // Stop listening for updates when no longer required
  return () => {
    tasksRefa.off('value', onLoadingListener);
  };
}, []);

const consoleDiz=(taska)=>{
console.log("Consola diz oq")
console.log(taska)
}

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

if (currentUser.role == 'admin'){
  return (
    
    <View style={styles.container}>
      <TouchableOpacity onPress={consoleDiz(worker)}>
      <Text>Worker : {worker}</Text>
      <Text>Turn : {description}</Text>
      <Text>Date: {date}</Text>
      <Text>Time: {time}</Text>
      </TouchableOpacity>
    </View>
  )
}else if (currentUser.role == 'worker'){
  return (
    
    <View style={styles.container}>
      <Text>Worker : {worker}</Text>
      <Text>Turn : {description}</Text>
      <Text>Date: {date}</Text>
      <Text>Time: {time}</Text>
    </View>
  )
}

}

TaskList.propTypes = {
  description: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  worker: PropTypes.string,

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
  },
});

export default TaskList
