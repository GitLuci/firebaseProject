import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { initializeFirebase, initCheckAuthState } from './services/firebase';
import { Provider } from 'react-redux';
import { store } from './store';
import Login from './screens/Login';
import AuthNavigation from './navigation/AuthNavigation';

const App = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    console.log('App mounted');
    initializeFirebase();
    initCheckAuthState();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Auth" component={AuthNavigation} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
