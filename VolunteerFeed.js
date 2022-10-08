import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TouchableOpacity } from 'react-native';
import { FeedCard } from './FeedCard';
import { getDocs, collection, doc, setDoc } from "firebase/firestore";
import { addNewDoc, getPage, sign_out, query_db, new_task_details_html, org_profile_html, user_profile_html, users_collection, organisations_collection, auth, provider, top_level_url, index_html, loading_html, temp_html, new_user_details_html, new_organisation_details_html, environment, isNewUser, userType_html, createFile, uploadFile, downloadFile, tasks_collection, user_feed_html, task_images_storage_path, view_task_html, get_param_value, loadTasks, goToTask, volunteers_collection } from "./methods.js";
import { firebase, db, storage } from "./config.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import { async } from '@firebase/util';

import { useState, useEffect } from 'react';

let tasks = [
  {
    name: "Planting Volunteer",
    organisation: "Greenpeace",
    type: "Environmental",
    location: "Onsite - Delhi",
    picture: "./assets/images/environment.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Math Teacher Volunteer",
    organisation: "Greenpeace",
    type: "Education",
    location: "Remote",
    picture: "./assets/images/education.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Road Cleaning Volunteer",
    organisation: "Greenpeace",
    type: "Community",
    location: "Onsite - Delhi",
    picture: "./assets/images/community.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Planting Volunteer",
    organisation: "Greenpeace",
    type: "Environmental",
    location: "Onsite - Delhi",
    picture: "./assets/images/environmental.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Math Teacher Volunteer",
    organisation: "Greenpeace",
    type: "Education",
    location: "Remote",
    picture: "./assets/images/education.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Animal Feeding Volunteer",
    organisation: "Paw Patrol",
    type: "Animal",
    location: "Onsite - Delhi",
    picture: "./assets/images/animal.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  }
]


export const VolunteerFeed = () => {
  const [taskData, setTaskData] = useState([]);
  //   [{
  //   City
  //     :
  //     "",
  //   Country
  //     :
  //     "",
  //   Email
  //     :
  //     "",
  //   "End Date"
  //     :
  //     "",
  //   "End Time"
  //     :
  //     "",
  //   FormLink
  //     :
  //     "",
  //   ImageURL
  //     :
  //     "",
  //   "Job Description"
  //     :
  //     "",
  //   Name
  //     :
  //     "",
  //   OrgID
  //     :
  //     "",
  //   Phone
  //     :
  //     "",
  //   "Start Date"
  //     :
  //     "",
  //   "Start Time"
  //     :
  //     "",
  //   State
  //     :
  //     "",
  //   Tag
  //     :
  //     "",
  //   TaskID
  //     :
  //     "",
  //   VolunteerHours
  //     :
  //     "0",
  //   VolunteersCount
  //     :
  //     0,
  //   VolunteersReq
  //     :
  //     0,
  // }]

  useEffect(() => {
    try {
      // console.log("entered useEffect")
      let task_data = [];
      const querySnapshot = getDocs(collection(db, "tasks"))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            task_data.push(doc.data());
          });
          // console.log(task_data);
          let data = task_data;
          setTaskData(data);
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(taskData, typeof taskData, taskData.length, taskData[0]);
  if (taskData.length == 0) {
    return(
      <View style={styles.loadingContainer}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    )
  }
  else{
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>

        {
          taskData.map((task, index) => {
            return (
              <FeedCard key={index} name={task.Name} organisation={task.OrgName} type={task.Tag} location={task.City.value + ', ' + task.State.value} description={task["Job Description"]} startDate={task["Start Date"]} formLink={task["FormLink"]} volunteersCount={task.VolunteersReq}/>
            )
            })
        }
      </ScrollView>
    </View>
  )
      }
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F7FFF7",
    // alignItems: 'center',
    padding: 10,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: "#F7FFF7",
    color: "#1A535C",
    borderRadius: 50,
  },
  icon: {
    fontSize: 30,
    color: "#1A535C",
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1A535C',
  },

});