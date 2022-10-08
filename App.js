import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import { VolunteerFeed } from './VolunteerFeed';
import { OrganizationTabs } from './OrganizationTabs';
import { Profile } from './Profile';
import { Login } from './Login';
import { Signup } from './Signup';
import { SignInEmailOption } from './SignInEmailOption';
import { VolunteerOption } from './VolunteerOption';
import { ProfileCreation } from './ProfileCreation';

import { TaskDescription } from './TaskDescription';
import { FeedCard } from './FeedCard';
import { CreateTaskForm } from './CreateTaskForm';


const Stack = createNativeStackNavigator();



export default function App() {

  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
  });
  const [isOrganization, setIsOrganisation] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const navigationRef = useNavigationContainerRef();
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#1A535C',
          },
          title: 'App Name',
          headerTintColor: '#F7FFF7',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 25,
            fontFamily: 'Poppins',
          },
          headerRight: () => (
            // Profile pic goes here
            <TouchableOpacity style={styles.button} onPress={() => navigationRef.navigate('Profile')}>
              <Image source={require('./assets/images/user.png')} style={styles.profilePic} />
            </TouchableOpacity>
          ),
          animation: 'slide_from_right',

        }}>
          {!isLogged & !isSigned ? (
            <Stack.Group>
             
              <Stack.Screen name="SignInEmailOption" >
                {props => (<SignInEmailOption {...props} setIsOrganisation={setIsOrganisation}  />)}
              </Stack.Screen>
              <Stack.Screen name="VolunteerOptions">
                {props => <VolunteerOption {...props} setIsOrganisation={setIsOrganisation} />}
              </Stack.Screen>
              <Stack.Screen name="Signup">
                {props => (<Signup {...props} setIsSigned={setIsSigned} setIsLogged={setIsLogged} setIsOrganisation={setIsOrganisation} />)}
              </Stack.Screen>

              <Stack.Screen name="OrganizationFeed" component={OrganizationTabs}/>
                
              <Stack.Screen name="Feed" component={VolunteerFeed}/>
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="CreateTaskForm" component={CreateTaskForm} />
            </Stack.Group>
{/*              <Stack.Screen name="ProfileCreation">
               {props => (<ProfileCreation {...props} setIsSigned={setIsSigned} setIsLogged={setIsLogged} />)}
             </Stack.Screen>
              <Stack.Screen name="Login">
                  {props => (<Login {...props} setIsLogged={setIsLogged} />)}
                </Stack.Screen> */}

            </Stack.Group>
          ) : (
            !isLogged & isSigned ? (
              <Stack.Group>
                <Stack.Screen name="Login">
                  {props => (<Login {...props} setIsLogged={setIsLogged} />)}
                </Stack.Screen>
                <Stack.Screen name="OrganizationFeed" component={OrganizationTabs}/>
                
                <Stack.Screen name="Feed" component={VolunteerFeed}/>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="CreateTaskForm" component={CreateTaskForm} />
              </Stack.Group>
              </Stack.Group>
            ) : ( isOrganization ? (
          <Stack.Group >

            <Stack.Group>
              <Stack.Screen name="OrganizationFeed" component={OrganizationTabs} />
            </Stack.Group>

            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="CreateTaskForm" component={CreateTaskForm} />
            </Stack.Group>

          </Stack.Group>
          ) : (
          <Stack.Screen name="Feed" component={VolunteerFeed} />
          )))}
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="TaskDescription" component={TaskDescription} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar/>
    </View >
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F7FFF7",
    width: 42,
    height: 42,
    borderRadius: 50,
  },
  profilePic: {
    width: 42,
    height: 42,
    borderRadius: 50,
  }
});
