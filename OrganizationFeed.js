import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {TaskCard} from './TaskCard';
import { getDocs,collection,doc,setDoc } from "firebase/firestore";
import { addNewDoc,getPage,sign_out,query_db,new_task_details_html,org_profile_html,user_profile_html,users_collection,organisations_collection,auth,provider,top_level_url,index_html,loading_html,temp_html,new_user_details_html,new_organisation_details_html,environment,isNewUser,userType_html,createFile,uploadFile,downloadFile,tasks_collection,user_feed_html,task_images_storage_path,view_task_html,get_param_value,loadTasks,goToTask,volunteers_collection } from "./methods.js";
import { firebase,db,storage} from "./config.js";
import Icon from 'react-native-vector-icons/FontAwesome';

let tasks = [
    {
        name: "Plant Trees",
        type: "Environmental",
        location: "New York, NY",
    },
    {
        name: "Clean Up",
        type: "Community",
        location: "New York, NY",
    },
    {
        name: "Feed the Animals",
        type: "Animal",
        location: "New York, NY",
    },
    {
        name: "Teach Kids",
        type: "Education",
        location: "New York, NY",
    },
    {
        name: "Give Blood",
        type: "Health",
        location: "New York, NY",
    },
]

async function getTasksInfo(){
  
    try{
      let task_data = [];
      const querySnapshot = await getDocs(collection(db, "tasks"));
      querySnapshot.forEach(async (doc) => {
      // doc.data() is never undefined for query doc snapshots
          task_data.push(doc.data());
      });
      
      //console.log(task_data);
      return task_data;
  
    }catch(e){
      console.log(e);
    }
}

export const OrganizationFeed = ({navigation}) => {


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



//SAME CODE IN ASYNC AWAIT FORMAT

//   task_data.forEach(async (task) => {
   
//     const querySnapshot = await query_db("OrgID","==",task.OrgID,organisations_collection);
//     let org_name = "";
//     querySnapshot.forEach((doc) => {
          
//           org_name = doc.data().Name;
//     });
//     task_data[task_data.indexOf(task)].OrgName = org_name;
//     task_data[task_data.indexOf(task)] = {
//       name: task.Name,
//       organisation: org_name,
//       type: task.Tag,
//       location: task.Location,
//       picture: "./assets/images/education.png",
//       description: task["Job Description"],


//     }
   

//   });

//   tasks = task_data; // tasks will be set to data from firebase


  console.log(tasks);
    return (
      <View style={styles.screen}>
        <ScrollView style={styles.container}>
          {tasks.map((task, index) => {
              return (
                  <TaskCard key={index} name={task.name} type={task.type} location={task.location}/>
              )
          })}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateTaskForm')}>
            <Icon name="plus" style={styles.icon}/>
        </TouchableOpacity>
      </View>
    );
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