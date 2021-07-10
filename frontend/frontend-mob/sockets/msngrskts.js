import  io  from 'socket.io-client'

const URL = 'http://192.168.1.68:9000'

const socket = io(URL,{autoConnect:false});

export default socket