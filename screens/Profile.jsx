import React from 'react';
import { Text,StyleSheet,View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const Profile = props => {
  return (
    <View style={styles.viewDefaultStyle}>
    <View >
    <View style={styles.circleView} >
      <Icon  name="user" size={93} />
    </View>
    </View>
    <Text style={styles.imageUser}>Profile</Text>

    </View>
  )
}
const styles = StyleSheet.create({
  imageUser: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
  },

  viewDefaultStyle:{
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  circleView: {
  marginTop:40,
  height: 100, 
  width: 100, 
  borderRadius: 50, 
  backgroundColor: 'grey',
  alignItems: 'center',
  justifyContent: 'center'

},

});

export default Profile;
