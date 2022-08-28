import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
import {
    getDatabase, ref, set, push, onValue,
    child, update, remove,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js"; 
const firebaseConfig = {
    apiKey: "AIzaSyAekoX7RXxBrRxRs_y2NPRGcJBicn2DWEs",
    authDomain: "todoapp-rtdb.firebaseapp.com",
    projectId: "todoapp-rtdb",
    storageBucket: "todoapp-rtdb.appspot.com",
    messagingSenderId: "590716346350",
    appId: "1:590716346350:web:b2df5a1f89956799d2f8ff",
    measurementId: "G-KNFXKNJ33T"
  };
  
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const databs = getDatabase(app);
const auth = getAuth(app);

var userinput = document.getElementById('todo-item');
window.additems = function () {
    console.log(userinput.value)
    var time = new Date();
    var obj = {
        text: userinput.value,
        dt: time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    }
    var refrence = ref(databs, 'todolist/')
    var newref = push(refrence)
    obj.id = newref.key;
    set(newref, obj);
}

var tododata;

var parent = document.getElementById('parent');
function renderlist() {
    parent.innerHTML = "";
    for (var i = 0; i < tododata.length; i++) {
        parent.innerHTML += ` <div class="d-flex justify-content-center align-items-center p-3">
        <div>
        
            <span class="bg-secondary text-white fw-bold w-50  p-2 ">${tododata[i].text}</span><span
                class="bg-secondary text-white fw-bold w-50  p-2 ">${tododata[i].dt} </span>
        </div>
        <button type="button" class="btn btn-secondary ms-3" onclick="Edititem('${tododata[i].id}')">Edit</button> 
        <button type="button" class="btn btn-secondary ms-3" onclick="Delitem('${tododata[i].id}')">Delete</button>

    </div>`;
        userinput.value = "";

    }
};
function getAllTodo() {
    var refrence = ref(databs, 'todolist/' );
    onValue(refrence, function (data) {
        tododata = Object.values(data.val())
        renderlist();
    })
}
getAllTodo();

window.Edititem = function (i) {
    var a = prompt("Enter Text" , i)
    var refrence = ref(databs, `todolist/${i}`);
    update(refrence,{text:a})
}

window.Delitem = function (i) {
    var refrence = ref(databs, `todolist/${i}`);
    remove(refrence)
    // onValue(refrence, function (data) {
    //     tododata = Object.values(data.val())
    //     renderlist();
    // })
    
    // console.log(i)
}

window.DelAll = function () {
    var refrence = ref(databs, 'todolist/')
    remove(refrence);
    parent.innerHTML = "";
}


