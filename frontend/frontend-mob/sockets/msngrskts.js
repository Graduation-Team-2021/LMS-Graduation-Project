import  io  from 'socket.io-client'
window.navigator.userAgent = 'react-native';
const URL = 'http://lmsproj.centralus.cloudapp.azure.com:9000'

const socket = io(URL,{autoConnect:false});

export default socket