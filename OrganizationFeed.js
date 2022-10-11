import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {TaskCard} from './TaskCard';
import { getDocs,collection } from "firebase/firestore";
import { db} from "./config.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';


async function getTasksInfo(){
  
    try{
      let task_data = [];
      const querySnapshot = await getDocs(collection(db, "tasks"));
      querySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots
          task_data.push(doc.data());
      });
      return task_data;
  
    }catch(e){
      console.log(e);
    }
}
let tasks = [];
export const OrganizationFeed = ({navigation}) => {



/*
    const task_data = getTasksInfo();
    tasks = [];
    task_data.then((data) => {
    console.log(data);
    data.forEach((task) => {
      console.log(task);
      query_db("OrgID","==",task.OrgID,organisations_collection).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          task.organisation = doc.data().Name;
        });
      data[data.indexOf(task)].OrgName = task.organisation;
      data[data.indexOf(task)] = {
        name: task.Name,
        organisation: task.OrgName,
        type: task.Tag,
        location: task.Location,
        picture: "./assets/images/education.png",
        description: task["Job Description"]

      }
      tasks.push(data[data.indexOf(task)]);

      console.log(data);
    });
    });
    // return (
    //   <View style={styles.screen}>
    //     <ScrollView style={styles.container}>
          
    //       {tasks.forEach((task) => {
    //         return (
    //           <FeedCard key={tasks.indexOf(task)} name={task.name} organisation ={task.organisation} type={task.type} location={task.location} picture={task.picture} description={task.description}/>
    //         )
    //       })}
    //     </ScrollView>
    //   </View>
    // )
  
  
  });

*/


const [taskData, setTaskData] = useState([]);
useEffect(() => {(async() =>{
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
    })();
    }, []);



        if (taskData.length == 0) {
            return(
            <View style={styles.loadingContainer}>
                <Text style={styles.title}>Loading...</Text>
            </View>
            )
        }
        else {
            return (
            <View style={styles.screen}>
                <ScrollView style={styles.container}>
                {taskData.map((task, index) => {
                    return (
                        <TaskCard key={index} name={task.Name} organisation={task.OrgName} type={task.Tag} location={task.City + ', ' + task.State} description={task["Job Description"]} startDate={task["Start Date"]} formLink={task["FormLink"]} volunteersCount={task["Volunteers Registered"]} volunteersReq={task.volunteersReq}   taskID={task["Task ID"]} />
                        
                    )
                })}
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateTaskForm')}>
                    <Icon name="plus" style={styles.icon}/>
                </TouchableOpacity>
            </View>
            );
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
    }
});