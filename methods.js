
import { getAuth,GoogleAuthProvider} from "firebase/auth";//'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js'
import {db} from "./config.js";
import { collection, addDoc ,query,where,getDocs} from "firebase/firestore";//"https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 



const auth = getAuth();
const provider = new GoogleAuthProvider();
let isNewUser = false; //global variable isNewUser intialized to true
const environment = "prod"; // NOTE : Change environment to "prod" before deployment
const users_collection = "users";
const tasks_collection = "tasks";
const volunteers_collection = "volunteers";
const organisations_collection = "organisations";
const task_images_storage_path = "task_images/";


if(environment == "dev"){
    console.log("Environment is set to development. Please change to prod before deployment");

}
async function addNewDoc(db_collection,db_doc){
    try{

        //const redirectHTML = await getPage(pageHTML); // Do we need this?
        //window.location =  top_level_url + redirectHTML;
        

        const docRef = await addDoc(collection(db,db_collection), db_doc);
        console.log("Document written with ID: ", docRef.id);
    }
    catch(error){
        console.error("Error adding document: ", error);
        throw error;
    }

}
async function query_db(query_field,query_operator,query_value,db_collection){
    try{
        const query_res = query(collection(db, db_collection), where(query_field, query_operator, query_value));
        const querySnapshot = await getDocs(query_res);
        

        //const querySnapshot = await getDocs(query_res);
       
        return querySnapshot;
    }
    catch(error){
        console.error("Error querying document: ", error);
        throw error;
    }
}


async function getCompletedJobs(){
    try{
        
        await auth.onAuthStateChanged(async function (user) { 
            if (user) {
                const user_query = await query_db("Email","==",user.email,users_collection);
                const user_query_res = user_query.docs[0].data();
                const user_completed_jobs = user_query_res.Completed_Jobs;
                return user_completed_jobs;
            }
            else{
                throw "No user logged in";
            }
        });
    }
    catch(error){
        console.error("Error querying document: ", error);
        throw error;
    }
}


//Formt of completed task information stored inside Completed_Jobs array in user document
/* 
{
        "Start Date":"01/01/2021",
        "End Date":"01/02/2021",
        "Task": "Task 1",
        "OrgID": "Org1",
        "TaskID": "Task1",


}
*/

//Returns Jobs Done Each Month in the following format
// {
//     "2021":{
//         "01": 1,
//         "02": 2,
//         "03": 3,
//         "04": 4,
//          .
//          .
//         "12": 2
//      },
//     "2022":{
//         "01": 1,
//         "02": 2,
//           .
//           .
//         "12": 2
//      }
//       .
//       .
// }
async function getJobsDoneEachMonth(){ 
    try{
        const user_completed_jobs = await getCompletedJobs();
        let jobs_each_month = {};
        user_completed_jobs.forEach((job) => {
            const job_start_date = job["Start Date"];
            const job_end_date = job["End Date"];
            
            const job_start_month = job_start_date.split("/")[1];
            const job_end_month = job_end_date.split("/")[1];
            const job_start_year = job_start_date.split("/")[2];
            const job_end_year = job_end_date.split("/")[2];
            if(jobs_each_month.job_start_year == undefined){
                jobs_each_month.job_start_year = {};
            }
            if(jobs_each_month.job_start_year.job_start_month == undefined){
                jobs_each_month.job_start_year.job_start_month = 0;
            }
            if(jobs_each_month.job_end_year == undefined){
                jobs_each_month.job_end_year = {};
            }
            if(jobs_each_month.job_end_year.job_end_month == undefined){
                jobs_each_month.job_end_year.job_end_month = 0;
            }
            // if job doesn't start and end in the same month and year
            if(!job_start_month == job_end_month || !job_start_year == job_end_year){
                jobs_each_month.job_end_year.job_end_month += 1;
            }
            jobs_each_month.job_start_year.job_start_month += 1;
        });
        return jobs_each_month;
    }
    catch(error){
        console.error("Error querying document: ", error);
        throw error;
    }
}
            

//Pass in the task_id of the task of which to add a volunteer
//task_id in OrgTaskDescription is data.data.taskID
//Task End Date not inputted when Task created. So Task End Date for now is being considered as Task Start Date 
//Once Task End Date field is added to Task Form the Task End Date will be passed instead of Task Start Date due to conditions in the function

async function onPressJobCompleted(task_id){ 

    try{
        await auth.onAuthStateChanged(async function (org) { 
            if (org) {
                const task_volunteeres_query = await query_db("TaskID","==",task_id,volunteers_collection);
                const task_query = await query_db("Task ID","==",task_id,tasks_collection);
                const task_query_res = task_query.docs[0].data();

                const org_query = await query_db("Email","==",org.email,organisations_collection);
                const org_query_res = org_query.docs[0].data();
                let org_completed_jobs = org_query_res["Completed Projects"];
                org_completed_jobs.push(task_query_res);
                const org_doc_id = org_query.docs[0].id;
                const org_doc_ref = doc(db, organisations_collection, org_doc_id);
                await updateDoc(org_doc_ref, {
                    "Completed Projects": org_completed_jobs
                });
                
                if(!org_query_res.OrgID == task_query_res.OrgID){
                    throw "User is not the owner of the task";
                }

                
                task_volunteeres_query.forEach(async (volunteer_doc) => {
                    const volunteer_doc_data = volunteer_doc.data();
                    if(volunteers_doc_data["Status"]!="Pending"){
                        throw "Task "+ task_id + " is not Pending. Wait for everyone to rate!";
                    }
                    const volunteer_email = volunteer_doc_data.Email;
                    const volunteer_query = await query_db("Email","==",volunteer_email,users_collection);
                    const volunteer_query_res = volunteer_query.docs[0].data();
                    let volunteer_completed_jobs = volunteer_query_res.Completed_Jobs;
                    const task_end_date = task_query_res["Task End Date"];
                    if(task_end_date == undefined){
                        task_end_date = task_query_res["Task Start Date"];
                    }
                    const completed_job = {
                        "Start Date": task_query_res["Start Date"],
                        "End Date": task_end_date,
                        "Task": task_query_res.Name,
                        "OrgID": org_id,
                        "TaskID": task_id,

                    }
                    volunteer_completed_jobs.push(completed_job);
                    const volunteer_query_doc_id = volunteer_query.docs[0].id;
                    const volunteer_query_doc_ref = doc(db, users_collection, volunteer_query_doc_id);
                    await updateDoc(volunteer_query_doc_ref, {
                        Completed_Jobs: volunteer_completed_jobs,
                    });
                    
                    const volunteer_doc_id = volunteer_doc.id;
                    const volunteer_doc_ref = doc(db, volunteers_collection, volunteer_doc_id);
                    await updateDoc(volunteer_doc_ref, {
                        Status: "Completed",
                    });
                });
                
                
                
            }
            else{
                throw "No user logged in";
            }
        });
    }
    catch(error){
        console.error("Error querying document: ", error);
        throw error;
    }

}




async function getTotalVolunteersEachMonth(){
    try{
        auth.onAuthStateChanged(async function (org) {
            if (org) {
                let total_volunteers_each_month = {};
                const org_query = await query_db("Email","==",org.email,organisations_collection);
                const org_query_res = org_query.docs[0].data();
                const org_id = org_query_res.OrgID;
                const tasks_query = await query_db("OrgID","==",org_id,tasks_collection);
                tasks_query.forEach((task) => {
                    const volunteers_count = task["Volunteers Registered"];
                    const task_start_date = task["Task Start Date"];
                    const task_end_date = task["Task End Date"];
                    const task_start_month = task_start_date.split("/")[1];
                    const task_end_month = task_end_date.split("/")[1];
                    const task_start_year = task_start_date.split("/")[2];
                    const task_end_year = task_end_date.split("/")[2];
                    if(total_volunteers_each_month.task_start_year == undefined){
                        total_volunteers_each_month.task_start_year = {};
                    }
                    if(total_volunteers_each_month.task_start_year.task_start_month == undefined){
                        total_volunteers_each_month.task_start_year.task_start_month = 0;
                    }
                    if(total_volunteers_each_month.task_end_year == undefined){
                        total_volunteers_each_month.task_end_year = {};
                    }
                    if(total_volunteers_each_month.task_end_year.task_end_month == undefined){
                        total_volunteers_each_month.task_end_year.task_end_month = 0;
                    }
                    if(!task_start_month == task_end_month || !task_start_year == task_end_year){
                        total_volunteers_each_month.task_end_year.task_end_month += volunteers_count;
                    }
                    total_volunteers_each_month.task_start_year.task_start_month += volunteers_count;

                    
                });
                return total_volunteers_each_month;
            }
            else{
                throw "No user logged in";
            }   
        });
    }
    catch(error){
        console.error("Error querying document: ", error);
        throw error;
    }
}





export {addNewDoc,query_db,users_collection,organisations_collection,auth,provider,environment,isNewUser,tasks_collection,task_images_storage_path,volunteers_collection,getJobsDoneEachMonth,onPressJobCompleted};
