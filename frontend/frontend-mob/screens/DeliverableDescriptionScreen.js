import React,{useState,useEffect} from "react";
import { View, Image, ScrollView ,StyleSheet,ActivityIndicator} from "react-native";
import { Button ,Text, Divider} from "react-native-elements";
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons,AntDesign,Entypo} from '@expo/vector-icons';
import { getDeliversRelation,uploadDeliverable,studentsSubmissions,getAllDeliverablesByDeliverableId} from "../Interface/Interface";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";
import * as Progress from 'react-native-progress';
import {showMessage, hideMessage} from "react-native-flash-message";
import StudentDeliverableItem from "../components/StudentDeliverableItem"
const DeliverableDescription = (props) => {
  const [file,setFile] = useState("")
  const [uploadedFiles,setUploadedFiles] = useState()
  const [uploadPercentage,setUploadPercentage] = useState(0)
  const [deliverablesLoaded,setDeliverablesLoaded]= useState(false)
  const [studentDeliverables,setStudentDeliverables] = useState([])

  let pickDocumentHandler = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      multiple: true,
    });
    if(result.type!="cancel"){
      setFile(result.output)
    }
  }

  let uploadFileHandler = () =>{
    getDeliversRelation(props.navigation.getParam('deliverable_id'),props.userData.Token).then((res) => {
      if (res) {
        uploadDeliverable(props.userData.Token,file,res,setUploadPercentage).then((res)=>{
          setFile("")
          showMessage({
            message: "File uploaded successfully.",
            type: "success",
            duration:"4000"
          });
          setUploadPercentage(0)
          retrieveStudentSubmissions()
        })
      }
    });
  }
  const StudentSubmissionHandler = (student) =>{
    props.navigation.navigate({
    routeName: "StudentSubmission",
    params: {student:student,deliverable_id:props.navigation.getParam('deliverable_id')}
  })
  }
  let retrieveStudentSubmissions = () =>{
    studentsSubmissions(props.userData.ID, props.navigation.getParam('deliverable_id')).then((res) => {
      let temp =[]
      if (res) {
        res.data.forEach((ele) => {
          temp.push(
          {delivers_id:ele['delivers_id'],file_type:ele['file_type'],file_name:ele['file_name']}
          );
        });
        setUploadedFiles(temp)
        setDeliverablesLoaded(true)
        props.navigation.getParam('updateDeliverables')()
      }
    });
  }
  useEffect(() => {
    getAllDeliverablesByDeliverableId(props.navigation.getParam('deliverable_id')).then((res)=>{
      setStudentDeliverables(res)
    })
  }, []);
  useEffect(() => {
    retrieveStudentSubmissions()
  }, []);

  
  return (
    <ScrollView>
    <Text h4 style={styles.header}>{props.navigation.getParam('deliverable_name')}</Text>
    <Divider style={styles.dividerStyle}/>
    <View style={styles.deliverableInfo}>
    <Text multiline={true}><Text style={styles.text}>Deadline:</Text> {props.navigation.getParam('deadline')}</Text>
    <Text><Text style={styles.text}>Mark: </Text>{props.navigation.getParam('mark')}</Text>
    <Text multiline={true}><Text style={styles.text}>Description: </Text>{props.navigation.getParam('description')}</Text>
    </View>
    <Divider style={styles.dividerStyle}/>
    <View style={styles.bottomContainer}>
{props.userData.Role=="student"?<View>
    <Text style={styles.submissionHeader}>Submitted Files</Text>
      {deliverablesLoaded&&<View style={styles.submissionContainer}>
      {uploadedFiles.map((uploadedFile,i)=>(
        <View style={{flexDirection:"row"}}>
          <Text style={{margin:5}}>{<AntDesign name="file1" size={20} color="black" />}{uploadedFile.file_name}{uploadedFile.file_type}</Text> 
        </View>    
        )) }
      </View>}
      {!deliverablesLoaded&&<ActivityIndicator size="small" />}
      {deliverablesLoaded&&uploadedFiles.length==0&&<Text style={{alignSelf:"center"}}>There are no submitted files.</Text>}
      <Divider style={styles.dividerStyle}/>
      <Text style={styles.submissionHeader}>Upload a file</Text>
      <Button
      title="Choose File" 
      buttonStyle={{minWidth:150, width:"70%", maxWidth:200, alignSelf: 'center',margin:10}}
      titleStyle={{fontSize:12}}
      onPress={pickDocumentHandler}
      icon = {<AntDesign name="addfile" size={20} color="white" />}
      />
      <View style={{flexDirection:"row",justifyContent:"center"}}>
      {!file||file.name=="" ?<Text>No file is chosen</Text>:<Text>{file.name}</Text>}
      </View>
    <Button
      title="Upload File" 
      disabled = {file=="" ? true:false}
      buttonStyle={{minWidth:150, width:"70%", maxWidth:200, alignSelf: 'center',margin:10}}
      titleStyle={{fontSize:12}}
      onPress={uploadFileHandler}
      icon = {<AntDesign name="upload" size={20} color="white" />}
      />
      {uploadPercentage ==0? <Text></Text>:
      <View style={{alignItems:"center"}}>
    <Progress.Bar progress={uploadPercentage} width={150}/>
    </View>
      }
      </View>:
      <View>
      <Text style={{textAlign:"center",marginBottom:15,fontSize:17,fontWeight:"500"}}>Students' Submissions</Text>
      {studentDeliverables.map((studentDeliverable,i)=>{
        return(
        <StudentDeliverableItem studentDeliverable={studentDeliverable} StudentSubmissionHandler={StudentSubmissionHandler}>
        </StudentDeliverableItem>)
      })}
      </View>}

    </View>
    
    <Divider style={styles.dividerStyle}/>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  text:{
    fontWeight:"600",
    fontSize:16
  },
  header:{
    fontWeight:"500",
    fontSize:17,
    marginTop:10,
    textAlign:"center"
  },
  submissionHeader:{
    fontWeight:"600",
    fontSize:17,
    marginBottom:10,
    textAlign:"center"
  },
  submissionContainer:{
    marginLeft:20
  },
  deliverableInfo:{
    marginLeft:10,
    marginRight:10
  },
  dividerStyle:{
    margin:20
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(DeliverableDescription);
