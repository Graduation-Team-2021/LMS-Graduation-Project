import React,{useState,useEffect} from "react";
import { View,StyleSheet ,ScrollView} from 'react-native'
import { Button ,Text, Divider,Input} from "react-native-elements";
import { getAllDeliveredFilesByStudent } from "../Interface/Interface";
import { Ionicons,AntDesign,Entypo} from '@expo/vector-icons';

const StudentSubmissionScreen = (props)=>{
    const [userSubmissions,setUserSubmissions] = useState()
    const [submissionsLoaded,setSubmissionsLoaded] = useState(false)
    useEffect(() => {
      getAllDeliveredFilesByStudent(props.navigation.getParam('deliverable_id'),props.navigation.getParam('student').user_id).then((res)=>{
        setUserSubmissions(res)
        setSubmissionsLoaded(true)
      })
    }, []);
    return (
      <ScrollView>
      
        <View style={{marginLeft:20,marginTop:20}}>
        <Text><Text style={styles.text}>Name: </Text>{props.navigation.getParam('student').name}</Text>
        <Text><Text style={styles.text}>Email: </Text>{props.navigation.getParam('student').email}</Text>
        <Text><Text style={styles.text}>Mark:</Text>{props.navigation.getParam('student').mark==null?" not marked":props.navigation.getParam('student')}</Text>
        <Divider style={{marginVertical:20}}></Divider>
        <Input keyboardType='numeric' containerStyle={{width:"30%" ,alignSelf:"center"}} placeholder="ex: 3"></Input>
        <Button containerStyle={{width:"40%",alignSelf:"center"}} titleStyle={{fontSize:13}} title="Submit Mark"></Button>
        </View>
        <Divider style={{marginVertical:20}}></Divider>
        <Text style={styles.headerStyle}>Uploaded Files</Text>
      {submissionsLoaded&&<View>
     {userSubmissions.map((ele,i)=>{
       return(<View style={{flexDirection:"row",marginLeft:20}}>
         <AntDesign name="filetext1" size={18}></AntDesign>
         <Text style={{fontSize:16,marginBottom:7}}>
           {ele.file_name}{ele.file_type}
         </Text>
         </View>)
     })}
     </View>
     }
     
     </ScrollView>
    )
    
}
const styles = StyleSheet.create({
  text:{
    fontWeight:"bold",
    fontSize:16
  },
  headerStyle:{
    fontWeight:"500",
    fontSize:18,
    textAlign:"center",
    marginBottom:20
  }
});
export default StudentSubmissionScreen;