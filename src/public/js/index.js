const socket = io();

let user;
const chatBox = document.getElementById("chatBox");


Swal.fire({
    title: 'Identificate',
    input:"text",
    text:"Ingresa el usuario para identificarse en el chat",
    inputValidator:(value) => {
      return !value && "Necesitas ingresar un nombre de usuario para continuar";
    },
    allowOutsideClick:false
  }).then((result) =>{
    user = result.value
    socket.emit("inicio", user);
  });
  
  
  
  chatBox.addEventListener('keyup', evt=>{
    if(evt.key === "Enter"){
      if(chatBox.value.trim().length>0){
        socket.emit("message", {user:user,message:chatBox.value});
        chatBox.value="";
      }
    }
  });

  socket.on("connected", (data) => {
    if (user !== undefined) {
      Swal.fire({
        text: `Nuevo usuario conectado: ${data}`,
        toast: true,
        position: "top-right",
      });
    }
  });

  socket.on('messageLogs' ,data =>{
    const log = document.getElementById('messageLogs');
    let messages = "";
    console.log(data);
    data.forEach(message => {
      messages +=  `${message.user} dice: ${message.message} </br>`  ;
    });
    log.innerHTML = messages;
  })