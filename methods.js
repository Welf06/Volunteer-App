
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
export {addNewDoc,query_db,users_collection,organisations_collection,auth,provider,environment,isNewUser,tasks_collection,task_images_storage_path,volunteers_collection};