import { StyleSheet, Text, View, ScrollView, TouchableOpacity,RefreshControl } from 'react-native';
import {TaskCard} from './TaskCard';
import { getDocs,collection } from "firebase/firestore";
import { db} from "./config.js";
import {auth,query_db,organisations_collection} from './methods'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect,useCallback } from 'react';



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

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export const OrganizationFeed = ({navigation,userEmail}) => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {

        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const getOrgIDfromEmail = async (email) => {
        let orgID = "";
        await query_db("Email","==",email,organisations_collection).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            orgID = doc.data().OrgID;
            });
        });
        return orgID;
    }

    const [taskData, setTaskData] = useState([]);
    useEffect(() => {(async() =>{
        try {
            // console.log("entered useEffect")
            let task_data = [];
            let orgID = await getOrgIDfromEmail(userEmail);
            const querySnapshot = getDocs(collection(db, "tasks"))
                .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // Get 'OrgId' from 'organisations' collection from 'Email' of the user
                    
                    
                    if(doc.data().OrgID == orgID){
                        task_data.push(doc.data());
                    }
                });
                // console.log(task_data);
                let data = task_data;
                setTaskData(data);
                });
            } catch (error) {
            console.log(error);
            }
        })();
        }, [refreshing]);

            return (
            <View style={styles.screen}>
                <ScrollView 
                style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                >
                {taskData.map((task, index) => {
                    return (
                        <TaskCard key={index} name={task.Name} organisation={task.OrgName} type={task.Tag} remote={task.Remote} location={task.City.label + ', ' + task.State.label} description={task["Job Description"]} startDate={task["Start Date"]} formLink={task["FormLink"]} volunteersCount={task["Volunteers Registered"]} volunteersReq={task.volunteersReq}   taskID={task["Task ID"]} />
                        
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        elevation: 10,
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
        fontWeight: 'bold',
        color: '#1A535C',
    },

});