import  io  from 'socket.io-client'

const URL = 'http://localhost:9000'

const socket = io(URL,{autoConnect:false});

socket.onAny((event, ...args) => {
  console.log("Hello from hell")
  console.log(event, args);
});


export default socket