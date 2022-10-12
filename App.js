import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';


import { VolunteerFeed } from './VolunteerFeed';
import { OrganizationTabs } from './OrganizationTabs';
import { OrganizationFeed } from './OrganizationFeed';
import { Profile } from './Profile';
import { Login } from './Login';
import { Signup } from './Signup';
import { SignInEmailOption } from './SignInEmailOption';
import { VolunteerOption } from './VolunteerOption';
import { ProfileCreation } from './ProfileCreation';
import { OrgProfileCreation } from './OrgProfileCreation';
import { TaskDescription } from './TaskDescription';
import { OrgTaskDescription } from './OrgTaskDescription';
//import { FeedCard } from './FeedCard';
import { CreateTaskForm } from './CreateTaskForm';
//import { getDocs, collection, doc, setDoc } from "firebase/firestore";
import {  auth } from "./methods.js";
//import { firebase, db, storage } from "./config.js";

const Stack = createNativeStackNavigator();



export default function App() {

  

  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
  });
  const [isOrganization, setIsOrganisation] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [isGoogleAuth,setIsGoogleAuth] = useState(false);
  const [userEmail,setUserEmail] = useState("");
  const [user_image,setUserImage] = useState(null);

  const navigationRef = useNavigationContainerRef();
  const [taskData, setTaskData] = useState([]);
  useEffect(() => {
    if(isGoogleAuth){
      auth.onAuthStateChanged(async function (user) { 
        if (user) {
          setUserImage(user.photoURL);
        }
      })
    }else{
      setUserImage('./assets/images/user.png');
    }
  }, [isLogged])
  
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#1A535C',
          },
          title: 'Kindersource',
          headerTintColor: '#F7FFF7',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 25,
            fontFamily: 'Poppins',
          },
          // Enable back button

          headerRight: () => (

            // Profile pic goes here
            
            <TouchableOpacity style={styles.button} onPress=
              {() => {
                navigationRef.navigate('Profile');
              }}>


              {isGoogleAuth?
              <Image style={styles.profilePic} source={{ uri: user_image }} />
              :
              <Image style={styles.profilePic} source={require('./assets/images/user.png')} />
              }
              

            </TouchableOpacity>
          ),
          animation: 'slide_from_right',

        }}>
          {!isLogged & !isSigned ? (
            <Stack.Group>

              <Stack.Screen name="SignInEmailOption" >
                {props => (<SignInEmailOption {...props} setIsOrganisation={setIsOrganisation}  setIsLogged={setIsLogged} setIsSigned={setIsSigned} setIsGoogleAuth={setIsGoogleAuth} setUserEmail={setUserEmail}/>)}
              </Stack.Screen>
              <Stack.Screen name="VolunteerOptions">
                {props => <VolunteerOption {...props} setIsOrganisation={setIsOrganisation}/>}
              </Stack.Screen>
              <Stack.Screen name="Signup">
                {props => (<Signup {...props} setIsSigned={setIsSigned} setIsLogged={setIsLogged} setIsOrganisation={setIsOrganisation} />)}
              </Stack.Screen>
             
              <Stack.Screen name="Login">
                {props => (<Login {...props} setIsLogged={setIsLogged} setIsOrganisation={setIsOrganisation} setIsSigned={setIsSigned} setUserEmail={setUserEmail}/>)}
              </Stack.Screen>
              
            
            </Stack.Group>
          ) : (
            !isLogged & isSigned ? (
              <Stack.Group>
                <Stack.Screen name="Login">
                  {props => (<Login {...props} setIsLogged={setIsLogged} setUserEmail={setUserEmail}/>)}
                </Stack.Screen>
                <Stack.Screen name="VolunteerOptions">
                {props => <VolunteerOption {...props} setIsOrganisation={setIsOrganisation}/>}
              </Stack.Screen>
              <Stack.Screen name="ProfileCreation">
                {props => (<ProfileCreation {...props} setIsSigned={setIsSigned} setIsLogged={setIsLogged}  />)}
              </Stack.Screen>
              <Stack.Screen name="OrgProfileCreation">
                {props => (<OrgProfileCreation {...props} setIsSigned={setIsSigned} setIsLogged={setIsLogged}  />)}
              </Stack.Screen>
                
               
              </Stack.Group>
            ) : (isOrganization ? (
              <Stack.Group >
                
                <Stack.Group>             
                  <Stack.Screen name="OrganizationFeed">
                    {props => (<OrganizationTabs {...props} userEmail={userEmail} />)}
                  </Stack.Screen>
                </Stack.Group>

                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                  <Stack.Screen name="CreateTaskForm" component={CreateTaskForm} />
                </Stack.Group>

              </Stack.Group>
            ) : (
              <Stack.Group>
              <Stack.Screen name="Feed" component={VolunteerFeed} />
              </Stack.Group>
            )))}
          <Stack.Screen name="Profile" component={Profile} isGoogleAuth={isGoogleAuth} />
          <Stack.Screen name="TaskDescription" component={TaskDescription} />
          <Stack.Screen name="OrgTaskDescription" component={OrgTaskDescription} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar />
    </View >
  );
}

const styles = StyleSheet.create({
  button: {
    // backgroundColor: "#F7FFF7",
    width: 42,
    height: 42,
    borderRadius: 50,
  },
  profilePic: {
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: "#1A535C",
    
  }
});
