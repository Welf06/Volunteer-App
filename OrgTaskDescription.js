import { StyleSheet, Text, View, Image, Linking,Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-web';
import { doc,updateDoc } from "firebase/firestore";
import { addNewDoc,query_db,users_collection,organisations_collection,auth,tasks_collection,volunteers_collection } from "./methods.js";
import { db} from "./config.js";



export const OrgTaskDescription = ({ route }) => {

  
   const [org_data, setOrgData] = useState([]);
   const [isVolunteered, setIsVolunteered] = useState(false);
   const [user, setUser] = useState(null);
   const [isUser, setIsUser] = useState(false);
   
   const data = route.params;
   console.log(data)
   //const [task_data, setTaskData] = useState(data.data);
   //setTaskData(data.data);
   const imgsrc = {
      "Environment": require("./assets/images/environment.png"),
      "Community": require("./assets/images/community.png"),
      "Animal": require("./assets/images/user.png"),
      "Education": require("./assets/images/education.png"),
   }
   // let org_address = "";
   // let org_website = "";
   // let org_phone = "";
   // let org_description = "";
   // let org_email = "";

   useEffect(() => {auth.onAuthStateChanged(async function(user) {
      if (user) {

         // currentUser should be available now
         const user_query =  await query_db("Email", "==", user.email,users_collection);
         if(user_query.empty){
           // isUser = false;
           setIsUser(false);
            

         }
         else{
            //isUser = true;
            setIsUser(true);
         }
            const user_info = {
               "Name": user.displayName,
               "Email": user.email,
               "Photo": user.photoURL,
            }
            setUser(user_info);
           // isUser = true;
            console.log(data.data.organisation);
            let org_dat = {};
            const org_info = await query_db("Name", "==", data.data.organisation,organisations_collection);
            org_info.forEach((doc) => {
               console.log(doc.data());
               org_dat = {
                  "Name": doc.data().Name,
                  "Address": doc.data().Address,
                  "Phone": doc.data().Phone,
                  "Email": doc.data().Email,
                  "Website": doc.data().Website,
                  "Description": doc.data()["About Us"],
                  "OrgID": doc.data().OrgID,

               }
               setOrgData(org_dat);
            });

            const volunteers_query = await query_db("Email", "==", user.email,volunteers_collection);
            for(const doc of volunteers_query.docs){
               if(doc.data().TaskID == data.data.taskID){ //check if user has already submitted for volunteering
                     setIsVolunteered(true);
               }
            }
         

      }
      else{
            console.log("could not load user info from google");
            // No user logged in.
      }
   });}, []);

   console.log(data);
   if(org_data.length == 0) {
      return(
        <View style={styles.loadingContainer}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      )
   }
   else{ 
      return (

         <View style={styles.container}>
            <Image source={imgsrc[data.data.type]} style={styles.image} />
            <View style={styles.titleContainer}>
               <Text style={styles.title}>{data.data.name}</Text>
            </View>
            <View style={styles.tagContainer}>
               <View style={styles.logoContainer}>
                  {data.data.type === "Environmental" && <Icon name="tree" size={15} color="#FF6B6B" />}
                  {data.data.type === "Community" && <Icon name="user" size={15} color="#FF6B6B" />}
                  {data.data.type === "Animal" && <Icon name="paw" size={15} color="#FF6B6B" />}
                  {data.data.type === "Education" && <Icon name="book" size={15} color="#FF6B6B" />}
                  {data.data.type === "Health" && <Icon name="medkit" size={15} color="#FF6B6B" />}

                  <Text style={styles.logoText}>{`${data.data.type} `}</Text>

               </View>
               <View style={styles.logoContainer}>
                  <Icon name="map-marker" size={17} color="#FF6B6B" />
                  <Text style={styles.logoText}>{`${data.data.location} `}</Text>
               </View>
            </View>
            <View style={styles.descriptionContainer}>
               <Text style={styles.subtitle}>Job Description</Text>
               <Text style={styles.description}>{data.data.description}</Text>
            </View>
            <View style={styles.descriptionContainer}>
               <Text style={styles.subtitle}>Organisation Description</Text>
               {/* placeholder */}
               <Text style={styles.description}>{`${org_data.Description}`} </Text>
            </View>
            <View style={styles.tagContainer}>
               <View style={styles.logoContainer}>
                  <Icon name="phone" size={15} color="#FF6B6B" />
                  <Text style={styles.logoText}>{`${org_data.Phone}`}</Text>
               </View>
               <View style={styles.logoContainer}>
                  <Icon name="envelope" size={15} color="#FF6B6B" />
                  <Text style={styles.logoText}>{`${org_data.Email}`}</Text>
               </View>
               {/* <View style={styles.logoContainer}>
                  <Icon name="search" size={15} color="#FF6B6B" />
                  <Text style={styles.logoText}>abc.org</Text>
               </View> */}
            </View>

            <View style={styles.dataContainer}>
               <View style={styles.dataTile}>
                  <Icon name="clock-o" size={40} color="#FF6B6B" />
                  <Text style={styles.data}>{`${data.data.startDate}`}</Text>
               </View>
               <View style={styles.dataTile}>
                  {/* <Icon name="male" size={17} color="#FF6B6B" /> */}
                  <Text style={styles.dataIcon}>{`${data.data.volunteersCount}`}</Text>
                  <Text style={styles.data}>Volunteers</Text>
               </View>
            </View>

            <TouchableOpacity style={styles.volunteerButton} onPress={async () => {
                if(isUser){
                  let task_data = {};
                  console.log("A");
                  const task_query = await query_db("Task ID", "==", data.data.taskID,tasks_collection);
                  if(task_query.empty){
                     console.log(data.data.taskID);
                     Alert.alert("No task found with that id");
                  }
                  else{
                     task_query.forEach((doc) => {
                        task_data = {
                           "taskID": doc.data()["Task ID"],
                           "Name": doc.data().Name,
                           "Description": doc.data()["Job Description"],
                           "volunteersCount": doc.data()["Volunteers Registered"],
                           "voluntersReq": doc.data()["VolunteersReq"],
                           "id": doc.id,
                        }
                     });
                  }
                  const db_collection = volunteers_collection;
                  const user_query =  await query_db("Email", "==", user.Email,users_collection);
                  if(user_query.empty){
                     //Alert.alert("You are not a user. Please login with a user account");
      
                  }
                  const task_name = task_data["Name"];
                  const task_id = task_data["taskID"]; 
                  const org_id = org_data["OrgID"];
                  const volunteersReq = task_data["volunteersReq"];
                  const volunteersCount = task_data["volunteersCount"];

                  console.log("check2");
                  if(volunteersCount >= volunteersReq){
                     //Alert.alert("Sorry, this task is full");
                  }
                  else{
                     console.log(user);
                     const db_doc = {
                        "Email" : user.Email,
                        "Task Name": task_data["Name"],
                        "TaskID": task_data["taskID"],
                        "OrgID": org_id,
                        "Status": "Pending"
                     }
                     console.log("check2");
                     if(!isVolunteered){
                        console.log(db);
                        const doc_ref = doc(db,tasks_collection,task_data["id"]);
                        await updateDoc(doc_ref,{
                           "Volunteers Registered": volunteersCount + 1
                        });
                        await addNewDoc(db_collection,db_doc);
                        Linking.openURL(data.data.formLink);
                        console.log("New Volunteer Details Added");
                        const task_volunteers = volunteersCount + 1;
                        Alert.alert("You have been added to the volunteer list");
                        setIsVolunteered(true);
                     }
                     else{
                        Alert.alert("You have already volunteered for this task");
                     }
                  }    
                  }
                  else{
                     Alert.alert("Please login with a user account");
                  }
            }}>
                  <Text style={styles.volunteerText}>Volunteer</Text>
               </TouchableOpacity>
            <StatusBar style="auto" />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#F7FFF7",
   },
   image: {
      width: "100%",
      height: 200,
   },
   titleContainer: {
      backgroundColor: "rgba(78, 205, 196, 0.3);",
      padding: 10,
      marginBottom: 5,
   },
   title: {
      color: "#10383F",
      fontSize: 25,
      fontWeight: "bold",
   },
   tagContainer: {
      flexDirection: "row",
      marginBottom: 5,
   },
   logoContainer: {
      flexDirection: "row",
      color: "#FF6B6B",
      alignContent: "center",
      alignItems: "center",
      width: "50%",
      justifyContent: "center",

   },
   logoText: {
      color: "#FF6B6B",
      fontSize: 14,
      fontWeight: "500",
      paddingLeft: 2
   },
   descriptionContainer: {
      padding: 10,
   },
   subtitle: {
      color: "#10383F",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 2,
   },
   description: {
      color: "#1A535C",
      fontSize: 14,
      fontWeight: "400",
   },
   volunteerButton: {
      backgroundColor: "#1A535C",
      width: "100%",
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
   }, 
   volunteerText: {
      color: "#F7FFF7",
      fontSize: 24,
   },
   dataContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: 10,
      marginTop: 10,
   },
   dataTile: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

   },
   data: {
      color: "#FF6B6B",
      fontSize: 14,
      fontWeight: "500",
   },
   dataIcon: {
      color: "#FF6B6B",
      fontSize: 30,
      fontWeight: "700",
   }
});



