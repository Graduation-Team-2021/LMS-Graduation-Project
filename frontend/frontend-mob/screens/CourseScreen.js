import React, { useEffect, useState } from "react";
import { ScrollView,View, StyleSheet, FlatList, Text,TouchableOpacity ,ActivityIndicator, TouchableNativeFeedback} from "react-native";
import { Button,Divider  } from "react-native-elements";
import { getAllPosts, uploadPost ,getPDFs,getVideos, getAllCourseDeliverables,uploadFile} from "../Interface/Interface";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";
import { setLocationPost, setNewPost } from "../Models/Post";
import Post from "../components/Post";
import PdfItem from '../components/PdfItem'
import VideoItem from '../components/VideoItem'
import About from "../components/About";
import NewPost from "../components/NewPost";
import DeliverableItem from "../components/DeliverableItem";
import * as Progress from 'react-native-progress';
import {showMessage, hideMessage} from "react-native-flash-message";
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons,AntDesign,Entypo} from '@expo/vector-icons';

const data = ["sklahjdlsa"];
const CourseScreen = (props) => {
  let myCourse = props.navigation.getParam("course");
  const [Data, setData] = useState(data);
  const [pdfs,setPdfs] = useState([]);
  const [videos,setVideos] = useState([]);
  const [deliverables,setDeliverables] = useState([])
  const [deliverablesLoaded,setDeliverablesLoaded] = useState(false)
  const [videosLoaded,setVideosLoaded] = useState(false)
  const [pdfsLoaded,setPdfsLoaded] = useState(false)
  const [file,setFile] = useState("")
  const [uploadedFiles,setUploadedFiles] = useState()
  const [uploadPercentage,setUploadPercentage] = useState(0)
  const role = props.userData.Role

  useEffect(() => {
    getAllPosts(props.userData.Token, myCourse.PostID).then((res) => {
      const Posts = [];
      if (res) {
        res.forEach((ele) => {
          Posts.push(
            setLocationPost(ele, myCourse.CourseName, props.userData.ID)
          );
        });
        Posts.reverse();
        setData([...data, ...Posts]);
      }
    });
  }, []);

  

  useEffect(()=>{
    getAllCourseDeliverables(myCourse.CourseID).then(res => {
        const temp = []
        res.forEach(
          (ele, index) => {
            temp.push({
              deliverable_name: ele['deliverable_name'],
              mark: ele['mark'],
              description: ele['description'],
              deadline: ele['deadline'],
              id: ele['deliverable_id']
            })
          }
        )
        setDeliverables(temp)
        setDeliverablesLoaded(true)
    });
},[])
  useEffect(()=>{
      retrievePdfs()
  },[])
  useEffect(()=>{
    retrieveVideos()
},[])
let retrievePdfs = () =>{
  getPDFs(myCourse.CourseID).then(res => {
    const temp = []
    res.forEach(
      (ele, index) => {
        temp.push({
          material_id: ele['material_id'],
          material_name: ele['material_name'],
          material_type: ele['material_type'],
        })
      }
    )
    setPdfs(temp)
    setPdfsLoaded(true)
});
}
let retrieveVideos = () =>{
  getVideos(myCourse.CourseID).then(res => {
    const temp = []
    res.forEach(
      (ele, index) => {
        temp.push({
          material_id: ele['material_id'],
          material_name: ele['material_name'],
          material_type: ele['material_type'],
        })
      }
    )
    setVideos(temp)
    setVideosLoaded(true)
});
}
let uploadFileHandler = () =>{

  uploadFile(props.userData.Token,file,myCourse.CourseID,setUploadPercentage).then((res)=>{
        setFile("")
        showMessage({
          message: "File uploaded successfully.",
          type: "success",
          duration:"3000"
        });
        setUploadPercentage(0)
        retrievePdfs()
        retrieveVideos()
        showMessage({
          message: "Material uploaded successfully.",
          type: "success",
          duration:"3000"
        });
      })
}
  

  const [post, setPost] = useState("");
  const alertDeliverableCreated = () =>{
    showMessage({
      message: "Deliverable created successfuly.",
      type: "success",
      duration:"3000"
    });
  }
  let pickDocumentHandler = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      multiple: true,
    });
    if(result.type!="cancel"){
      setFile(result)
    }
  }
  const updateDeliverables = () =>{
    getAllCourseDeliverables(myCourse.CourseID).then(res => {
      const temp = []
      res.forEach(
        (ele, index) => {
          temp.push({
            deliverable_name: ele['deliverable_name'],
            mark: ele['mark'],
            description: ele['description'],
            deadline: ele['deadline'],
            id: ele['deliverable_id']
          })
        }
      )
      setDeliverables(temp)
      setDeliverablesLoaded(true)
  });
  }
  const Submit = async () => {
    let postdata = setNewPost(post, myCourse.CourseName, props.userData.Name);
    let id = await uploadPost(
      props.userData.Token,
      props.userData.ID,
      myCourse.PostID,
      post
    );

    if (id) {
      postdata.PostId = id;
      let temp = [...data, postdata, ...Data.slice(1)];
      setData(temp);
    }
    setPost("")
  };

  
const previewPdfHandler = (pdf_id) =>{
  props.navigation.navigate({
    routeName: "Pdf",
    params:{pdfId:pdf_id}
  })
}


  const previewDeliverableHandler = (deliverable) =>{
    props.navigation.navigate({
      routeName: "DeliverableDescription",
      params: {deliverable_id:deliverable.id,deliverable_name:deliverable.deliverable_name,mark:deliverable.mark,deadline:deliverable.deadline,description:deliverable.description}})
  }
  
  const previewVideoHandler = (video_id) =>{
    props.navigation.navigate({
    routeName: "Video",
    params: {videoId:video_id}})
}
  const createNewDeliverableHandler = () =>{
    props.navigation.navigate({
      routeName:"CreateDeliverable",
      params: {courseId:myCourse.CourseID,alertDeliverableCreated:alertDeliverableCreated,updateDeliverables:updateDeliverables}
    })
  }
  const materialsDetails = (
    <View style={styles.materialsContainer}>
      <Divider style={styles.dividerStyle}/>
      <Text style={styles.videos_pdfs_header}>Deliverables</Text>
      {deliverablesLoaded &&
      deliverables.map((deliverable,i)=>(
        <DeliverableItem key ={i} deliverable={deliverable} previewDeliverableHandler={previewDeliverableHandler}></DeliverableItem>
      
        )) 
      
      }
      {!deliverablesLoaded&&<ActivityIndicator size="small" />}
      {role=="professor" && <Button
      title="CREATE DELIVERABLE"
      buttonStyle={{minWidth:150, width:"70%", maxWidth:200, alignSelf: 'center',marginTop:20}}
      titleStyle={{fontSize:"12"}}
      onPress={createNewDeliverableHandler}
      />}
      <Divider style={styles.dividerStyle}/>
      <Text style={styles.videos_pdfs_header}>Videos</Text>
      {videosLoaded &&
      videos.map((video,i)=>(
        <VideoItem key ={i} video={video} previewVideoHandler={previewVideoHandler}></VideoItem>
      ))
      }
      {!videosLoaded && <ActivityIndicator size="small" />}
      <Divider style={styles.dividerStyle}/>
      <Text style={styles.videos_pdfs_header}>PDFs</Text>
      {pdfsLoaded&&pdfs.map((pdf,i)=>(
        <PdfItem key = {i} pdf={pdf} previewPdfHandler={previewPdfHandler}></PdfItem>
      ))}
      {!pdfsLoaded && <ActivityIndicator size="small" />}
      <Divider style={styles.dividerStyle}/>
      {role=="professor" && <View>
        <Text style={styles.videos_pdfs_header}>Upload Material</Text>
      <Button
      title="Choose File" 
      buttonStyle={{minWidth:150, width:"70%", maxWidth:200, alignSelf: 'center',margin:10}}
      titleStyle={{fontSize:"12"}}
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
      }</View>}
      
    </View>
  );

  const renederitem = (itemdata) => {
    if (itemdata.index === 0) {
      let Element = <NewPost setPost={setPost} Submit={Submit} post={post} />;
      if(myCourse.isEnrolled!=='true'){
        Element=<Text>Please Enroll First...</Text>
      } 
      return Element;
    }
    return <Post post={itemdata.item} />;
  };
  const groupflag = props.navigation.getParam("groupflag");
  return (

    
    <View style={styles.screen}>
      <ScrollView>
      <View style={styles.topContainer}>
        <About description={myCourse.CourseDescription} />
      </View>
      
      {groupflag ? null : materialsDetails}
      
      <View style={{ width: "90%", flex: 1 }}>
        <FlatList 
          data={Data}
          renderItem={renederitem}
          keyExtractor={(_, index) => `${index}`}
        />
      </View> 
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  materialsContainer:{
    textAlign:'center'
  },
  submissionContainer:{
    marginLeft:20
  },
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    fontSize:20
  },
  topContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "70%",
  },
  buttonContainer: {
    paddingVertical: 5,
  },
  iconStyle:{
    marginLeft:11
  },
  dividerStyle:{
    margin:20
  },
  videos_pdfs_header:{
    textAlign:'center',
    fontSize:20,marginBottom:10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseScreen);
