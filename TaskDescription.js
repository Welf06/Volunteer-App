import { StyleSheet, Text, View, Image, Linking,Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-web';
import { getDocs,collection,doc,setDoc,updateDoc } from "firebase/firestore";
import { addNewDoc,getPage,sign_out,query_db,new_task_details_html,org_profile_html,user_profile_html,users_collection,organisations_collection,auth,provider,top_level_url,index_html,loading_html,temp_html,new_user_details_html,new_organisation_details_html,environment,isNewUser,userType_html,createFile,uploadFile,downloadFile,tasks_collection,user_feed_html,task_images_storage_path,view_task_html,get_param_value,loadTasks,goToTask,volunteers_collection } from "./methods.js";
import { firebase,db,storage} from "./config.js";



export const TaskDescription = ({ route }) => {

   let isUser = false;
   const [org_data, setOrgData] = useState([]);
   const [isVolunteered, setIsVolunteered] = useState(false);
   const [user, setUser] = useState(null);
   
   const data = route.params;
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
              //alert("You are not a user. Please login with a user account");
              //window.location = top_level_url + index_html;
              isUser = false;
          }


          else{
              const user_info = {
                  "Name": user.displayName,
                  "Email": user.email,
                  "Photo": user.photoURL,
              }
               setUser(user_info);
              isUser = true;
              console.log(data.data.organisation);
              let org_data = {};
              const org_info = await query_db("Name", "==", data.data.organisation,organisations_collection);
               org_info.forEach((doc) => {
                  console.log(doc.data());
                  org_data = {
                     "Name": doc.data().Name,
                     "Address": doc.data().Address,
                     "Phone": doc.data().Phone,
                     "Email": doc.data().Email,
                     "Website": doc.data().Website,
                     "Description": doc.data()["About Us"],
                     "OrgID": doc.data().OrgID,

                  }
                  setOrgData(org_data);
               
                  // org_address = doc.data().Address;
                  // org_website = doc.data().Website;
                  // org_phone = doc.data().Phone;
                  // org_description = doc.data()["About Us"];
                  // org_email = doc.data().Email;

               });

              const volunteers_query = await query_db("Email", "==", user.email,volunteers_collection);
              for(const doc of volunteers_query.docs){
                  if(doc.data().TaskID == data.data.taskID){ //check if user has already submitted for volunteering
                      setIsVolunteered(true);
                  }
              }

          }

      }
      else{
          console.log("could not load user info from google");
          // No user logged in.
      }
  });}, []);

   console.log(data);
   if (org_data.length == 0) {
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
                  console.log("check0");
                  // let task_data = {};
                  // task_query.forEach((doc) => {
                  //    // doc.data() is never undefined for query doc snapshots
      
                  //    task_data[doc.id] = doc.data();
                  //    // for(const key in doc.data()){
      
                  //    //     task_data[key] = doc.data()[key]; 
      
                  //    //     //console.log(`${key}: ${doc.data()[key]}`);
                  //    // }
                  // //console.log(doc.data());
                  // });
                  console.log("check1");
                  const db_collection = volunteers_collection;
                  //const email = user_data["Email"];
                  const user_query =  await query_db("Email", "==", user.Email,users_collection);
                  if(user_query.empty){
                     Alert.alert("You are not a user. Please login with a user account");
      
                  }
                  // let user_data = {};
                  // user_query.forEach((doc) => {
                  //    // doc.data() is never undefined for query doc snapshots
                  //    for(const key in doc.data()){
                  //       user_data[key] = doc.data()[key];
                  //    }
                  // });
      
                  //const task_name = task_data["Name"];
                  console.log("check1");
                  //key={index} name={task.Name} organisation={task.OrgName} type={task.Tag} location={task.City.value + ', ' + task.State.value} description={task["Job Description"]} startDate={task["Start Date"]} formLink={task["FormLink"]} volunteersCount={task["Volunteers Registered"]} volunteersReq={task.volunteersReq}   taskID={task["Task ID"]}
                  const task_name = task_data["Name"];
                  const task_id = task_data["taskID"]; 
                  const org_id = org_data["OrgID"];
                  const volunteersReq = task_data["volunteersReq"];
                  const volunteersCount = task_data["volunteersCount"];

                  console.log("check2");
                  if(volunteersCount >= volunteersReq){
                     Alert.alert("Sorry, this task is full");

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
                        // db.collection(tasks_collection).doc(task_data.id).ref.update({
                        //    "Volunteers Registered": task_volunteers
                        // });
                        await addNewDoc(db_collection,db_doc);
                        Linking.openURL(data.data.formLink);
                        console.log("New Volunteer Details Added");
                        // add volunteer to volunteer count in task
                        const task_volunteers = volunteersCount + 1;
                        
                        Alert.alert("You have been added to the volunteer list");
                        setIsVolunteered(true);

                     }
                     
                     else{
                        Alert.alert("You have already volunteered for this task");
                     }
                     console.log("check3");
         
                  }
               
                  // catch(err){
                  //    console.log(err);
                  // }
               
                  
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



