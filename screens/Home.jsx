
import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../reducers/currentUserSlice';
import TaskModal from '../components/TaskModal';
import TaskList from '../components/TaskList';
import WorkesModal from '../components/WorkesModal';



const Home = () => {
  const currentUser = useSelector(state => state.currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const createTask = () => {
    setIsModalOpen(true);
    const tasksRef = firebase.app().database('https://taskmanagerproject-22bda-default-rtdb.firebaseio.com/').ref('/tasks');
  };

  const returnUser = (idU) =>{
    let user = firebase.app().database('https://taskmanagerproject-22bda-default-rtdb.firebaseio.com/')
    .ref(`/users/${idU}`);
    const onLoadingUser = user.once('value', (snapshot) => {
      console.log("A escuta de dados foi iniciada");
      const tser = snapshot.val();
      setUserInfo(tser.email);
    });

    return () => {
      user.off('value', onLoadingUser);
    };
  }

  useEffect(() => {
    //retrieve tasks for current user
    const tasksRef = firebase.app().database('https://taskmanagerproject-22bda-default-rtdb.firebaseio.com/').ref('/tasks');

    const onLoadingListener = tasksRef.on('value', (snapshot) => {
      console.log("A escuta de dados foi iniciada");
      const data = snapshot.val();

      const loadedTasks = [];
      
      for (let key in data) {
        

        console.log("data id")
        console.log(data[key].id)
        //se o usuario for admin, adicionar todos os tempos
        if(currentUser.role == 'admin'){
          loadedTasks.push(data[key]);
        }
        if (currentUser.role == 'worker'){
          if(data[key].id == currentUser.id)
          {
            loadedTasks.push(data[key]);
          }
        }

      }
      setTasks(loadedTasks)
    });

    // Stop listening for updates when no longer required
    return () => {
      tasksRef.off('value', onLoadingListener);
    };
  }, []);

  //Logout user
  const logoutUser = () => {
    auth().signOut().then(() => {
      console.log('User signed out!');
      dispatch(clearUser());
      navigation.navigate('Login');
    });
  };

  const renderItem = ({ item }) => (
  
  <TaskList
  //func = {returnUser(item.id)}
  //TODO: Corrigir bug return user
  worker={userInfo}
  description={item.description} 
  date={item.date}  
  time={item.time}
  />   );

  return (
    
    <>
    { currentUser.role == 'admin' && (
      <>
        <Text style={styles.title}>Welcome {currentUser.role}!</Text>
        <WorkesModal modalVisible={isModalOpen} setModalVisible={setIsModalOpen}/>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => item.uid}/>

        <View style={styles.buttonContainer}>
          <Button style={styles.createTaskButton} title="Create Task" onPress={createTask} />
          <View style={styles.space} />
          <Button style={styles.logout_button} title="Logout" onPress={logoutUser} />
        </View>
      </>
    )}
    { currentUser.role == 'worker' && (
      <>
        <Text style={styles.title}>Welcome {currentUser.email}!</Text>
        <Text> Welcome worker c:</Text>
        <Text>Seus horarios</Text>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={item => item.uid}/>
        <Button style={styles.logout_button} title="Logout" onPress={logoutUser} />
      </>
    )}
    </>
  )
}


const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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

export default Home;
