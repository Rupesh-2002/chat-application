  //const {io} = require('socket.io-client');
 const socket = io("http://localhost:3000");

const fo = document.getElementById('form');
const inputmessage = document.querySelector(".inputmessage");
const section= document.querySelector("section");


const names={};
names.name= prompt("enter your name");

function append(position, message){
    // const outerdiv = document.createElement("div");
    // outerdiv.classList.add(position);
    // const innerdiv = document.createElement("div");
    // innerdiv.classList.add("message");
    // innerdiv.textContent=message;
    
    // outerdiv.append(innerdiv);

    // section.append(outerdiv);
    section.innerHTML += `<div class=${position}>
    <div class=message> ${message}</div>
    </div>`
}

socket.emit('new-user-joined',names.name);

socket.on('user-joined',(name)=>{
    append('center',`${name} joined chat`)
})

socket.on('joined',(name)=>{
    append('center',name)
})

fo.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(inputmessage.value===''){
        return;
    }
    
    socket.emit('send',inputmessage.value);
    append('right',inputmessage.value);
    inputmessage.value = '';
})

socket.on('receive',(message)=>{
    append('left',message);
})


   