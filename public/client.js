const socket=io()
//client send message logic no page refresh no ajax
//var audio = new Audio('ting.mp3');
let names;

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do {
    names = prompt('Please enter your name: ')
} while(!names)

textarea.addEventListener('keyup', (e) => { //any key pressed this event triggered
    if(e.key === 'Enter') {
        sendMessage(e.target.value) //whatever inside textarea
    }
})

function sendMessage(message) {
    let msg = {  //send to server mssg and user
        user: names,
        message: message.trim() //white space left right newline will be trimmed
    }
    // Append on main screen of mssgs and then go to server
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg) //event will be emit or send on server

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div') //create new div like div class of icoming mssg
    let className = type
    mainDiv.classList.add(className, 'message') //classs add on div
//html markup now add in main div
    let markup = `          
        <h4>${msg.user}</h4>
        <p>${msg.message}</p> 
    `
   
  
    mainDiv.innerHTML = markup //full div in main div
    messageArea.appendChild(mainDiv)
    
}
//receive mssg coming from server

socket.on('message', (msg) => { 
    //audio.play();// use same event name
    appendMessage(msg, 'incoming')//client code running on browser not server

    scrollToBottom()
})
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}