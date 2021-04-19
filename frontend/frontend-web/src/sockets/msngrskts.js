import  io  from 'socket.io-client'

const URL = 'http://localhost:9000'

const socket = io(URL,{autoConnect:false});

socket.onAny((event, ...args) => {
  
});


export default socket