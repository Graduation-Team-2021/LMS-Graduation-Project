import React, { useEffect, useState } from "react";
import { ScrollView,View, StyleSheet, FlatList, Text,TouchableOpacity , TouchableNativeFeedback} from "react-native";
import { Button,Divider  } from "react-native-elements";
import { getAllPosts, uploadPost ,getPDFs,getVideos, getAllCourseDeliverables} from "../Interface/Interface";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";
import { setLocationPost, setNewPost } from "../Models/Post";
import Post from "../components/Post";
import PdfItem from '../components/PdfItem'
import VideoItem from '../components/VideoItem'
import About from "../components/About";
import NewPost from "../components/NewPost";
import DeliverableItem from "../components/DeliverableItem";

const data = ["sklahjdlsa"];
const CourseScreen = (props) => {
  let myCourse = props.navigation.getParam("course");
  const [Data, setData] = useState(data);
  const [pdfs,setPdfs] = useState([]);
  const [videos,setVideos] = useState([]);
  const [deliverables,setDeliverables] = useState([])
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
    });
},[])
  useEffect(()=>{
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
      });
  },[])
  useEffect(()=>{
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
    });
},[])
  

  const [post, setPost] = useState("");

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
      params: {deliverable_id:deliverable.deliverable_id,deliverable_name:deliverable.deliverable_name,mark:deliverable.mark,deadline:deliverable.deadline,description:deliverable.description}})
  }
  
  const previewVideoHandler = (video_id) =>{
    props.navigation.navigate({
    routeName: "Video",
    params: {videoId:video_id}})
}
  const createNewDeliverableHandler = () =>{
    props.navigation.navigate({
      routeName:"CreateDeliverable",
      params: {courseId:myCourse.CourseID}
    })
  }
  const materialsDetails = (
    <View style={styles.materialsContainer}>
      <Divider style={styles.dividerStyle}/>
      <Text style={styles.videos_pdfs_header}>Deliverables</Text>
      {deliverables.map((deliverable,i)=>(
        <DeliverableItem key ={i} deliverable={deliverable} previewDeliverableHandler={previewDeliverableHandler}></DeliverableItem>
      ))}
      {role=="professor" && <Button
      title="Create Deliverable"
      buttonStyle={{minWidth:150, width:"70%", maxWidth:200, alignSelf: 'center',marginTop:20}}
      
      onPress={createNewDeliverableHandler}
      />}
      <Divider style={styles.dividerStyle}/>
      <Text style={styles.videos_pdfs_header}>Videos</Text>
      {videos.map((video,i)=>(
        <VideoItem key ={i} video={video} previewVideoHandler={previewVideoHandler}></VideoItem>
      ))}
      <Divider style={styles.dividerStyle}/>
      <Text style={styles.videos_pdfs_header}>PDFs</Text>
      {pdfs.map((pdf,i)=>(
        <PdfItem key = {i} pdf={pdf} previewPdfHandler={previewPdfHandler}></PdfItem>
      ))}
      <Divider style={styles.dividerStyle}/>
      
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
