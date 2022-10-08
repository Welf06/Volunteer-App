import { initializeApp } from "firebase/app"//"https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "firebase/analytics"//"https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, signOut,signInWithPopup,GoogleAuthProvider,getAdditionalUserInfo } from "firebase/auth";//'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js'
import {firebase,db,storage} from "./config.js";
import { collection,doc, setDoc, addDoc ,getDoc,query,where,getDocs} from "firebase/firestore";//"https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 
import { ref,getDownloadURL,uploadBytes  } from "firebase/storage";//"https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js"; 
//import { url } from "inspector";

const auth = getAuth();
const provider = new GoogleAuthProvider();
let top_level_url = "http://127.0.0.1:5500/"; // URL = top_level_url + html_page;
let isNewUser = false; //global variable isNewUser intialized to true
const index_html = "index.html";
const loading_html = "loading.html";
const temp_html = "temp.html";
const new_user_details_html = "new_user_details.html";
const new_organisation_details_html = "new_organisation_details.html";
const user_profile_html = "user_profile.html";
const userType_html = "userType.html";
const org_profile_html = "org_profile.html";
const environment = "prod"; // NOTE : Change environment to "prod" before deployment
const users_collection = "users";
const tasks_collection = "tasks";
const volunteers_collection = "volunteers";
const organisations_collection = "organisations";
const new_task_details_html = "new_task_details.html";
const user_feed_html = "user_feed.html";
const task_images_storage_path = "task_images/";
const view_task_html = "view_task.html";

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


async function getPage(pageHTML) {
    try{  
        if(pageHTML == ""){ // Default loading page
            pageHTML = "loading.html";
        }
        const response = await fetch(pageHTML)//.then(response => response.text()).catch((error)=>{console.log("error");throw error});
        const page_text = await response.text();
        //const data = await response.text();
        //const data = await response.text();
        //window.location.href = response;
        console.log(`${pageHTML} page fetched`);
        //return data;
        return page_text;
    }
    catch (error) {
        console.error(`Could not get Page: ${error}`);
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



async function sign_out(){

    if(auth.currentUser){
        try{
    
            const pageHTML = "";
            const HTML = await getPage(pageHTML)
                
            document.body.innerHTML = HTML;
    
            await signOut(auth)
                
                        
            
    
            const returnPageHTMLOnSuccess = index_html;
            returnHTML = await getPage(returnPageHTMLOnSuccess)
            window.location = top_level_url + returnPageHTMLOnSuccess; //MIGHT NOT WORK IN APP
            let logged_in = false;
                
        }          
                
    
        catch(error){
            console.error(`Could not complete Authentication: ${error}`);
            const returnPageHTMLOnError = index_html;
            const returnHTML = await getPage(returnPageHTMLOnError);
                //document.body.innerHTML = data;
            window.location =  top_level_url + returnPageHTMLOnError; //MIGHT NOT WORK IN APP
            let logged_in = true;
                
        
    
        }
    }

   else{
       console.log("User not logged in");
       window.alert("User not logged in");
   }
    

}


async function createFile(img_url){
    try{
        let response = await fetch(img_url);
        let data = await response.blob();
        let metadata = {
        type: response.headers.get('content-type')
        };
        const img_url_arr = img_url.split("/");
        const img_name = new Date() + "-" + img_url_arr[img_url_arr.length-1];
        let file = new File([data],img_name , metadata);
        return file;
        // ... do something with the file or return it
    }catch(err){
        console.log(err);
        throw err;
    }

}

async function uploadFile(storage,path_ref,file){
    try{
       
        const storageRef = await ref(storage,path_ref+file.name);
        console.log(storageRef);
       
       // file.name = new Date() + "-" + file.name;
        /*
        const metadata = {
            contentType: file.type
        };
        */

        const snapShot = await uploadBytes(storageRef, file);
        console.log(snapShot);
        console.log("Uploaded a blob or file!");
        return file.name;

    }catch(err){
        console.log(err);
        throw err;
    }
}

async function goToTask(task_id){
    window.location = top_level_url + view_task_html + "?task_id=" + task_id;
}


async function loadTasks(task_data,is_task_page=false,container_id="task_list"){


    for (const key in task_data) {
        const elem = document.createElement(`p`);
        elem.id = `myBrandnewDiv1`;

        // put in some text
        const url = await downloadFile(storage,task_images_storage_path,task_data[key]["ImageURL"]);
        elem.innerHTML = `<img src="${url}" alt="task image" width="200" height="200">`;
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["Email"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["End Date"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["End Time"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["ImageURL"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["Job Description"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["Location"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["Name"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["OrgID"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["Phone"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["Start Date"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["Start Time"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["Tag"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["TaskID"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["VolunteerHours"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        elem.appendChild(document.createTextNode(`${key}: ${task_data[key]["VolunteersCount"]}`));
        document.getElementById(container_id).appendChild(elem);
        elem.appendChild(document.createElement(`br`));
        if(!is_task_page){
            var buttonEl = document.createElement("a");
            //buttonEl.href = view_task_html + "?task_id=" + task_id;

            var buttonTextEl = document.createElement("span");
            buttonTextEl.id = "view_task_button";
            buttonTextEl.innerText = "View Task";
            buttonEl.appendChild(buttonTextEl);
            elem.appendChild(buttonEl);
            var buttons = elem.getElementsByTagName("a");
            const task_id = task_data[key]["TaskID"];
            
            buttons[0].onclick = function() {   window.location = top_level_url + view_task_html + "?task_id=" + task_id;};//await goToTask(task_id)};
        }

        elem.appendChild(document.createElement(`br`));
       }

}

async function get_param_value(url, param_name) {
    let val = "";
    let url_array = url.split("?");
    if(url_array.length > 1){
        
        let params = url_array[1].split("&");
        for(let i = 0; i < params.length; i++){
            let param = params[i].split("=");
            if(param[0] == param_name){
                val = param[1];
            }
        }
    }
    
    return val;
  }

async function downloadFile(storage,path_ref,file_name){
    try{
        console.log(file_name);
        const fileReference = ref(storage, path_ref + file_name);
        const url = await getDownloadURL(fileReference);
        console.log(url);
        /*
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        */
       return url
    
        // Or inserted into an <img> element
        /*
        const img = document.getElementById('myimg');
        img.setAttribute('src', url);
        */
    }catch(err){
        console.log(err);
        throw err;
    }
}

export {addNewDoc,getPage,sign_out,query_db,new_task_details_html,org_profile_html,user_profile_html,users_collection,organisations_collection,auth,provider,top_level_url,index_html,loading_html,temp_html,new_user_details_html,new_organisation_details_html,environment,isNewUser,userType_html,createFile,uploadFile,downloadFile,tasks_collection,user_feed_html,task_images_storage_path,view_task_html,get_param_value,loadTasks,goToTask,volunteers_collection};