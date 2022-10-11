import { StyleSheet, Text, View } from 'react-native';

import { ScrollView, TouchableOpacity } from 'react-native';
import { FeedCard } from './FeedCard';
import { getDocs, collection, doc, setDoc } from "firebase/firestore";

import { db} from "./config.js";
import { useState, useEffect } from 'react';
/*
let tasks = [
  {
    name: "Planting Volunteer",
    organisation: "Greenpeace",
    type: "Environmental",
    location: "Onsite - Delhi",
    picture: "./assets/images/environment.jpg",
    date: "2021-05-01",
    currVolunteers: 2,
    taskID: "1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Math Teacher Volunteer",
    organisation: "Greenpeace",
    type: "Education",
    location: "Remote",
    picture: "./assets/images/education.png",
    date: "2021-05-01",
    currVolunteers: 2,
    taskID: "2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Road Cleaning Volunteer",
    organisation: "Greenpeace",
    type: "Community",
    location: "Onsite - Delhi",
    picture: "./assets/images/community.png",
    date: "2021-05-01",
    currVolunteers: 2,
    taskID: "3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Planting Volunteer",
    organisation: "Greenpeace",
    type: "Environmental",
    location: "Onsite - Delhi",
    picture: "./assets/images/environmental.png",
    date: "2021-05-01",
    currVolunteers: 2,
    taskID: "4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Math Teacher Volunteer",
    organisation: "Greenpeace",
    type: "Education",
    location: "Remote",
    picture: "./assets/images/education.png",
    date: "2021-05-01",
    currVolunteers: 2,

    taskID: "5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  },
  {
    name: "Animal Feeding Volunteer",
    organisation: "Paw Patrol",
    type: "Animal",
    location: "Onsite - Delhi",
    picture: "./assets/images/animal.png",
    date: "2021-05-01",
    currVolunteers: 2,
    taskID: "6",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor."
  }
]
*/
let tasks =[];

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
console.log("check0");
  
  if (taskData.length == 0) {
    console.log("check1");
    return(
      <View style={styles.loadingContainer}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    )
  }
  else{
    console.log("check2");

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>

        {
          taskData.map((task, index) => {
            console.log("check3");
            return (
              <FeedCard key={index} name={task.Name} organisation={task.OrgName} type={task.Tag} location={task.City + ', ' + task.State} description={task["Job Description"]} startDate={task["Start Date"]} formLink={task["FormLink"]} volunteersCount={task["Volunteers Registered"]} volunteersReq={task.volunteersReq}   taskID={task["Task ID"]} />
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
