import React, { useState } from 'react'
import { Button, Dimensions, TextInput, View, StyleSheet, Modal, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { addUser } from '../reducers/currentUserSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';


const Login = () => {
  const [modalOpen,setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigator = useNavigation();



  const saveUser = (user) => {
    const { email, uid, displayName,role,name} = user;
    dispatch(addUser({ email, uid, displayName,role,name }));
  }

  
  
  const createUserInFirebaseDatabase = (user) => {
    const { name,email, uid, displayName } = user;
    let userToSave = {name, email, uid, displayName, role: 'worker' };
    firebase.app().database('https://taskmanagerproject-22bda-default-rtdb.firebaseio.com/')
      .ref(`/users/${uid}`)
      .set(userToSave).then(() => {
        console.log('User added!');
        navigator.navigate('Auth');
      }).catch((error) => {
        console.log(error);
      });
  };

  const loginUser = (email, password) => {
    setIsLoading(true);
    auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        console.log(userCredential);
        let uid = userCredential.user.uid;

        let role2 = userCredential.user.role;
       let user = firebase.app().database('https://taskmanagerproject-22bda-default-rtdb.firebaseio.com/')
        .ref(`/users/${uid}`).once('value').then(snapshot => {
          
          let userToSave = { email, uid, role: snapshot.val().role};
          saveUser(userToSave);
          setIsLoading(false);
          setError('');
          navigator.navigate('Auth');
          console.log(snapshot.val());
        });

      })
      .catch((error) => {
        setIsLoading(false);
        console.log("login falhou:  " + error);

      });
  };

  const creatUser = (email,password,name,role="worker") =>{
    setModalOpen(false);
    auth().createUserWithEmailAndPassword(email,password,name,role)
    .then((userCredential) => {
      saveUser(userCredential.user);
      setIsLoading(false);
      setError('');
      createUserInFirebaseDatabase(userCredential.user);
      
    }) 
    .catch(error => {
      setIsLoading(false);
      setError(error.message);
    });
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        label='Email Address'
        placeholder='example@gmail.com'
        value={email}
        onChangeText={email => setEmail(email)}
        autoCapitalize={'none'}
      />

      <TextInput
        label='Password'
        placeholder='enter password'
        value={password}
        onChangeText={password => setPassword(password)}
        secureTextEntry
      />
      {

        isLoading ?
          <ActivityIndicator
            size='large'
            color='#0F5340'
            style={{marginBottom: 80}}
          /> :
          <Button
            onPress={() => loginUser(email, password)}
            title={'Sign In'}
          />
          
      }
      { error && <Text style={styles.error}>{error}</Text> }
      <View>
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <Text style={styles.txtCreat}>Create Account ?</Text>
        </TouchableOpacity>

        <Modal visible={modalOpen}>
          <View style={styles.modaStyle}>
          <>
          <TouchableOpacity onPress={()=> setModalOpen(false)}>
          <Icon name="plus" size={15} color="#900"  />
          </TouchableOpacity>
          </>
            <TextInput
              label='Email Address'
              placeholder='example@gmail.com'
              value={email}
              onChangeText={email => setEmail(email)}
              autoCapitalize={'none'}
            />
          <TextInput
            label='Password'
            placeholder='enter password'
            value={password}
            onChangeText={password => setPassword(password)}
            secureTextEntry
          />
          
          <TextInput
            label='Name'
            placeholder='enter your name'
            value={name}
            onChangeText={name => setName(name)}
          />
            <Button style={styles.btStyle} 
            onPress={()=> creatUser(email,password,name)}
            title={'Create Account'}/>



          </View>

        </Modal>

      </View>
    </View>
  )
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#EFEFEF',
    height: height - 80,
    width: width,
    marginTop: 80,
    paddingVertical: height / 25,
    paddingHorizontal: width / 20,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  error: {
    color: 'red',
    padding: 20
  },
  txtCreat:{
    color: 'blue',
    paddingTop:10,
  },
  modaStyle:{
    padding: 40,
    
  },
  btStyle:{
    paddingTop: 20,
    color: 'red'
    
  }
})

export default Login;
