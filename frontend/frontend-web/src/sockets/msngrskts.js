import  io  from 'socket.io-client'

const URL = 'lmsproj.centralus.cloudapp.azure.com:9000'

const socket = io(URL,{autoConnect:false});

export default socket