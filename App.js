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
import { CreateTaskForm } from './CreateTaskForm';
import {  auth,query_db,users_collection,organisations_collection } from "./methods.js";
import { Loading } from './Loading';

const Stack = createNativeStackNavigator();


export default function App() {

  

  const [fontsLoaded] = useFonts({
    'Poppins': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
  });
  const [isOrganization, setIsOrganisation] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const [isGoogleAuth,setIsGoogleAuth] = useState(false);
  const [profileData,setProfileData] = useState({});
  const [userEmail,setUserEmail] = useState("");
  const [autoLogin,setAutoLogin] = useState(true);

  const navigationRef = useNavigationContainerRef();
  const [taskData, setTaskData] = useState([]);
 
  const renderProfile = ({profileData}) => {
  try{
    return (
            <View>
              <TouchableOpacity style={styles.button} onPress=
                {() => {
                  navigationRef.navigate('Profile');
                  
                }}>
                <View style={styles.profilePic}>
                    <Text style={styles.profileText}>{profileData.Name.slice(0,1)}</Text>
                  </View>
              </TouchableOpacity>
            </View>
          );
    }catch(err){
      return null;
    }
}


  useEffect(() => {
    if (logOut) {
      // console.log(logOut);
      auth.signOut().then(() => {
      setIsLogged(false);
      setIsSigned(false);
      setIsGoogleAuth(false);
      setLogOut(false);
      setProfileData({});
      setUserEmail("");
      setIsOrganisation(false);
      setAutoLogin(false);
      navigationRef.navigate('SignInEmailOption');
      });
    }
  }, [logOut])

  useEffect(() => {
  auth.onAuthStateChanged(async function (user) {
    // console.log(autoLogin
    // console.log(profileData);

    if (user) {
      const user_query =  await query_db("Email", "==", user.email,users_collection);
      const org_query = await query_db("Email", "==", user.email,organisations_collection);
      if(!org_query.empty){ //If user is an organisation
        setUserEmail(user.email);
        setProfileData({Email:user.email,Name:org_query.docs[0].data().Name,Description:org_query.docs[0].data()["About Us"],Location:org_query.docs[0].data().Location,Phone:org_query.docs[0].data().Phone});
        setIsOrganisation(true);

      }
      else if(!user_query.empty){
        setUserEmail(user.email);
        setProfileData({Email:user.email,Name:user_query.docs[0].data().Name,Description:user_query.docs[0].data().Description,Location:user_query.docs[0].data().Location,Phone:user_query.docs[0].data().Phone});
      }
      setIsLogged(true);
      setIsSigned(true);
    }
    setAutoLogin(false);
  });
  }, []);

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
          headerBackTitleVisible: true,
          headerRight: () => renderProfile({profileData}),
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
            {props => (<Profile {...props} profileData={profileData} setLogOut={setLogOut}/>)}
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
