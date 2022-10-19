
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
        user_completed_jobs.forEach((job) => {
            const job_start_date = job["Start Date"];
            const job_end_date = job["End Date"];
            const jobs_each_month = {};
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
            








export {addNewDoc,query_db,users_collection,organisations_collection,auth,provider,environment,isNewUser,tasks_collection,task_images_storage_path,volunteers_collection,getJobsDoneEachMonth};
