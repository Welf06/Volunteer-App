import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image,Text } from 'react-native';
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
import { OrgProfileCreation } from './OrgProfileCreation';
import { TaskDescription } from './TaskDescription';
import { OrgTaskDescription } from './OrgTaskDescription';
//import { FeedCard } from './FeedCard';
import { CreateTaskForm } from './CreateTaskForm';
//import { getDocs, collection, doc, setDoc } from "firebase/firestore";
import {  auth,query_db,users_collection,organisations_collection } from "./methods.js";
import { Loading } from './Loading';
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
  const [profileData,setProfileData] = useState({});
  const [userEmail,setUserEmail] = useState("");
  const [user_name,setUserName] = useState(null);
  const [autoLogin,setAutoLogin] = useState(true);

  const navigationRef = useNavigationContainerRef();
  const [taskData, setTaskData] = useState([]);

  auth.onAuthStateChanged(async function (user) {
    if (user != false && user.displayName == undefined) {
      setIsGoogleAuth(false);
    }  
    if (user) {
      const user_query =  await query_db("Email", "==", user.email,users_collection);
      const org_query = await query_db("Email", "==", user.email,organisations_collection);
      if(!org_query.empty){ //If user is an organisation
        setUserName(org_query.docs[0].data().Name);
        setIsOrganisation(true);
      }
      else{
        setUserName(user_query.docs[0].data().Name);
      }
      setIsLogged(true);
      setIsSigned(true);
    } 
      setAutoLogin(false);
  });

  if(autoLogin){
    return (
      <Loading />
    );
  }
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
            <View>
              {(isSigned && isGoogleAuth) || (isSigned && isLogged) ?
              <TouchableOpacity style={styles.button} onPress=
                {() => {
                  navigationRef.navigate('Profile');
                  
                }}>
                <View style={styles.profilePic}>
                    <Text style={styles.profileText}>{user_name.slice(0,1)}</Text>
                  </View>
              </TouchableOpacity>
              :
              null
              }
            </View>
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
          <Stack.Screen name="Profile">
            {props => (<Profile {...props} profileData={profileData} setProfileData={setProfileData} />)}
          </Stack.Screen>
          <Stack.Screen name="TaskDescription" component={TaskDescription} />
          <Stack.Screen name="OrgTaskDescription" component={OrgTaskDescription} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  button: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },
  profilePic: {
    width: 42,
    height: 42,
    borderRadius: 50,
    backgroundColor: "#FF6B6B",
  },
  profileText: {
    color: "#F7FFF7",
    fontSize: 20,
    textAlign: "center",
    marginTop: 5,
  }
});
