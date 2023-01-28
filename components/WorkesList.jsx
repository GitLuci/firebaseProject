import React, {useState}from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text,TouchableOpacity} from 'react-native'
import TaskModal from '../components/TaskModal';
import { firebase } from '@react-native-firebase/database';


const WorkesList = ({worker}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const createTask = () => {
        setIsModalOpen(true);
        const tasksRef = firebase.app().database('https://taskmanagerproject-22bda-default-rtdb.firebaseio.com/').ref('/tasks');
      };

  return (
    <View style={styles.container}>
    <TaskModal modalVisible={isModalOpen} setModalVisible={setIsModalOpen}/>
    <TouchableOpacity onPress={createTask}>
      <Text>Worker : {worker}</Text>
    </TouchableOpacity>
    </View>
  )
}

WorkesList.propTypes = {
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

export default WorkesList
