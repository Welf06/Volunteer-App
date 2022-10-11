import { StyleSheet, Text, View } from 'react-native';

import { ScrollView, TouchableOpacity,RefreshControl } from 'react-native';
import { FeedCard } from './FeedCard';
import { getDocs, collection, doc, setDoc } from "firebase/firestore";

import { db} from "./config.js";
import { useState, useEffect,useCallback } from 'react';
let tasks =[];


const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export const VolunteerFeed = () => {
  const [taskData, setTaskData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
          // console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [refreshing]);
console.log("check0");
  
 

  return (
    <View style={styles.screen}>
      <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >

        {
          taskData.map((task, index) => {
            // console.log("check3");
            return (
              <FeedCard key={index} name={task.Name} organisation={task.OrgName} type={task.Tag} remote={task.Remote} location={task.City.label + ', ' + task.State.label} description={task["Job Description"]} startDate={task["Start Date"]} formLink={task["FormLink"]} volunteersCount={task["Volunteers Registered"]} volunteersReq={task.volunteersReq}   taskID={task["Task ID"]} />
            )
            })
        }
      </ScrollView>
    </View>
  )

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
