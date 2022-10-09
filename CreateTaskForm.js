import { StyleSheet, Text, View,TextInput, ScrollView, TouchableOpacity, Alert} from 'react-native';
import CheckBox from 'expo-checkbox';
import { DropdownComponent } from './DropdownComponent';
import { StatusBar } from 'expo-status-bar';
import {TextInputMask} from 'react-native-masked-text';
import { getDocs,collection,doc,setDoc } from "firebase/firestore";
import { addNewDoc,getPage,sign_out,query_db,new_task_details_html,org_profile_html,user_profile_html,users_collection,organisations_collection,auth,provider,top_level_url,index_html,loading_html,temp_html,new_user_details_html,new_organisation_details_html,environment,isNewUser,userType_html,createFile,uploadFile,downloadFile,tasks_collection,user_feed_html,task_images_storage_path,view_task_html,get_param_value,loadTasks,goToTask,volunteers_collection } from "./methods.js";
import { firebase,db,storage} from "./config.js";

import { useState,useEffect } from 'react';


const data = [
    {label: 'Environmental', value: 'Environmental'},
    {label: 'Community', value: 'Community'},
    {label: 'Animal', value: 'Animal'},
    {label: 'Education', value: 'Education'},
    {label: 'Health', value: 'Health'},
]


var headers = new Headers();
headers.append("X-CSCAPI-KEY", "T0JJcVU4YlNJcnhHWXNQdWFYSzdXbFF4M29odkxIQ1ZMdzNkdDUwTQ==");

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
}






export const CreateTaskForm = () => {


    const [org_details, setOrgDetails] = useState([]);
    auth.onAuthStateChanged(async function(user) {
        if (user) {
            // currentUser should be available now
            const org_query =  await query_db("Email", "==", user.email,organisations_collection);
            if(org_query.empty){
                Alert.alert("You are not an organisation. Please login with an org account");
                //window.location = top_level_url + index_html;
                
            }
            else{
                org_query.forEach((doc) => {
                    // "orgid" = doc.data().OrgID;
                    // orgname = doc.data().Name;
                    setOrgDetails({
                        orgid: doc.data().OrgID,
                        orgname: doc.data().Name
                    })
                }
                )
            }
        }
    
    });




    const [taskData, setTaskData] = useState({
        name: '',
        organisation: '',
        type: '',
        remote: false,
        location: {'country': '', 'state': '', 'city': ''},
        volunteers: 0,
        description: '',
        startDate: '',
        formLink: '',
    })
    const [isRemote, setIsRemote] = useState(false);
    const [date, setDate] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    useEffect(() => {
        fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
        .then(response => response.json())
        .then(result => {
            let countries = result.map((country) => {
                return {label: country.name, value: country.iso2}
            }
            )
            setCountries(countries);
        })
        }
    , [])
    useEffect(() => {
        if (taskData.location.country !== '') {
            fetch(`https://api.countrystatecity.in/v1/countries/${taskData.location.country.value}/states`, requestOptions)
            .then(response => response.json())
            .then(result => {
                let states = result.map((state) => {
                    return {label: state.name, value: state.iso2}
                }
                )
                setStates(states);
            })
        }
    }, [taskData.location.country])
    useEffect(() => {
        if (taskData.location.state !== '') {
            fetch(`https://api.countrystatecity.in/v1/countries/${taskData.location.country.value}/states/${taskData.location.state.value}/cities`, requestOptions)
            .then(response => response.json())
            .then(result => {
                let cities = result.map((city) => {
                    return {label: city.name, value: city.name}
                }
                )
                setCities(cities);
            })
        }
    }, [taskData.location.state])
  return (
    <View style={styles.container}>
    <ScrollView  style={styles.scroll}>
      <Text style={styles.title}>Create Task</Text>
      <View style={styles.form}>
        <Text style={styles.formLabel} placeholder="test">Task Name</Text>
        <TextInput style={styles.input} onChangeText={(text) => setTaskData({...taskData, name: text})} value={taskData.name}/>
        <Text style={styles.formLabel}>What kind of task is this?</Text>
        <DropdownComponent data={data} placeholder="Task Type" withSearch={false} disabled={false} onSelect={(value) => setTaskData({...taskData, type: value["label"]})}/>
        <Text style={styles.formLabel}>Where will this take place?</Text>
        <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Remote</Text>
            <CheckBox value={isRemote} onValueChange={
              (value) => {
                setIsRemote(value);
                setTaskData({...taskData, remote: value});
            }} style={styles.checkbox} />
        </View>
        <Text style={styles.formLabel}>Country</Text>
        <DropdownComponent data={countries} placeholder="Country" withSearch={true} disabled={isRemote} onSelect={(value) => setTaskData({...taskData, location: {...taskData.location, country: value}})}/>
        <Text style={styles.formLabel}>State</Text>
        <DropdownComponent data={states} placeholder="State" withSearch={true} disabled={isRemote} onSelect={(value) => setTaskData({...taskData, location: {...taskData.location, state: value}})}/>
        <Text style={styles.formLabel}>City</Text>
        <DropdownComponent data={cities} placeholder="City" withSearch={true} disabled={isRemote} onSelect={(value) => setTaskData({...taskData, location: {...taskData.location, city: value}})}/>

        <Text style={styles.formLabel} >How many volunteers will you require?</Text>
        <TextInput style={styles.input} keyboardType="numeric" onChangeText={(text) => setTaskData({...taskData, volunteers: text})} value={taskData.volunteers}/>

        <Text style={styles.formLabel} >When is it happening? (DD/MM/YYYY)</Text>
        <TextInputMask
            type={'datetime'}
            options={{
                format: 'DD/MM/YYYY'
            }}
            style={styles.input}
            value={date}
            onChangeText={text => {
                setDate(text);
                setTaskData({...taskData, startDate: text});
            }}
        />
        <Text style={styles.formLabel} >Explain the task in a few words</Text>
        <TextInput style={styles.multilineInput} multiline={true} numberOfLines={4} onChangeText={(text) => setTaskData({...taskData, description: text})} value={taskData.description}/>

        <Text style={styles.formLabel} >Attach a google form link. They will be directed to this link when they volunteer.</Text>
        <TextInput style={styles.input} keyboardType="url" onChangeText={(text) => setTaskData({...taskData, formLink: text})} value={taskData.formLink}/>
        
        <TouchableOpacity style={styles.button} onPress={
            async () => {
                // let orgid = "";
                // let orgname = "";
                // auth.onAuthStateChanged(async function(user) {
                //     if (user) {
                //         // currentUser should be available now
                //         const org_query =  await query_db("Email", "==", user.email,organisations_collection);
                //         if(org_query.empty){
                //             Alert.alert("You are not an organisation. Please login with an org account");
                //             //window.location = top_level_url + index_html;
                            
                //         }
                //         else{
                //             org.query.forEach((doc) => {
                //                 orgid = doc.data().OrgID;
                //                 orgname = doc.data().Name;
                //             }
                //             )
                //         }
                //     }

                // });
                // Check if all fields are filled
                if(taskData.name && taskData.type && taskData.volunteers && taskData.description && taskData.startDate && taskData.formLink && (taskData.remote || (taskData.location.country && taskData.location.state && taskData.location.city))){{
                    if(taskData.remote){
                        taskData.location.country = '';
                        taskData.location.state = '';
                        taskData.location.city = '';
                    }

                    const db_doc = {
                        "Name": taskData.name,
                        "Tag": taskData.type,
                        "Country": taskData.location.country,
                        "State": taskData.location.state,
                        "City": taskData.location.city,
                        "VolunteersReq": taskData.volunteers,
                        "Job Description" : taskData.description,
                        "FormLink" : taskData.formLink,
                        "Start Date" : taskData.startDate,
                        "OrgID" : org_details.orgid,
                        "OrgName" : org_details.orgname,
                        "Volunteers Registered" : 0,
                        "Task ID": org_details.orgname+"_"+taskData.name+"_"+taskData.startDate
                    
                    };
                    const db_collection = tasks_collection;
                    await addNewDoc(db_collection,db_doc);
                    /*

                        "Email": email,
                        "Start Time": start_time,
                        "End Time": end_time,
                        "Start Date": start_date,
                        "End Date": end_date,
                        "VolunteerHours": hours,
                        "OrgID": OrgID,
                        "VolunteersCount":0,
                        "TaskID":taskID,
                        "Country":country,
                    */
                    console.log(taskData);
                    console.log("Task Added to Database");
                    console.log("Please add something to tell the user that the task has been added");
                    //navigation.navigate('OrganisationFeed');
                    // Send data to backend
                }}else{
                    Alert.alert("Please fill all the fields");
                }

            }
        }>
            <Text style={styles.buttonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F7FFF7",
        flex: 1,
        justifyContent: 'center',
    },
    scroll: {
        flex: 1,
        margin: 20,
        marginRight: 0,
    },
    title:{
        fontSize: 24,
        fontFamily: 'Poppins',
        color: "#1A535C",
        textAlign: 'center',
    },
    form: {
        flex: 1,
        backgroundColor: "#F7FFF7",
        marginTop: 20,
    },
    formLabel: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: "#1A535C",
        paddingTop: 20,
    },
    input: {
        height: 30,
        marginVertical: 10,
        borderWidth: 2,
        width: 350,
        borderBottomColor: "#1A535C",
        borderTopColor: "#F7FFF7",
        borderLeftColor: "#F7FFF7",
        borderRightColor: "#F7FFF7",
        fontFamily: 'Poppins',
        color: "#1A535C",
    },
    multilineInput: {
        minHeight: 100,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        width: 350,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 300,
        paddingTop: 20,
    },
    checkboxLabel: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: "#1A535C",

    },
    checkbox: {
        color: "#1A535C",
        width: 25,
        height: 25,

    },
    datePicker: {
        width: 350,
        height: 50,
        marginVertical: 10,
        borderWidth: 2,

    },
    button: {
        backgroundColor: "#1A535C",
        width: 350,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#F7FFF7",
        fontSize: 18,
        fontFamily: 'Poppins',
    }

});
