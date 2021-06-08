import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text,TouchableOpacity , TouchableNativeFeedback} from "react-native";
import { Button,Divider  } from "react-native-elements";
import { getAllPosts, uploadPost ,getPDFs,getVideos,downloadFile,previewPdf} from "../Interface/Interface";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";
import { setLocationPost, setNewPost } from "../Models/Post";
import Post from "../components/Post";
import PdfItem from '../components/PdfItem'
import VideoItem from '../components/VideoItem'
import About from "../components/About";
import NewPost from "../components/NewPost";



const data = ["sklahjdlsa"];

const CourseScreen = (props) => {
  let myCourse = props.navigation.getParam("course");
  const [Data, setData] = useState(data);
  const [pdfs,setPdfs] = useState([]);
  const [videos,setVideos] = useState([]);
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
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
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  const previewPdfHandler = (pdf_id) =>{
    previewPdf(pdf_id).then(res => {
      props.navigation.navigate({
        routeName: "Pdf",
        params: {pdfStream:res}
      });

    })
  }
  const downloadPdfHandler = (pdf_id) =>{
    
    
  }
  const previewVideoHandler = (video_id) =>{
          props.navigation.navigate({
          routeName: "Video",
          params: {videoId:video_id}})
  }
  
  const downloadVideoHandler = (video_id) =>{
    
  }
  const materialsDetails = (
    <View style={styles.materialsContainer}>
      <Divider style={styles.dividerStyle}/>
      <Text style={styles.videos_pdfs_header}>Videos</Text>
      {videos.map((video,i)=>(
        <VideoItem video={video} previewVideoHandler={previewVideoHandler} downloadVideoHandler={downloadVideoHandler}></VideoItem>
      ))}
      <Divider style={styles.dividerStyle}/>
      <Text style={styles.videos_pdfs_header}>PDFs</Text>
      {pdfs.map((pdf,i)=>(
        <PdfItem pdf={pdf} previewPdfHandler={previewPdfHandler} downloadPdfHandler={downloadPdfHandler}></PdfItem>
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
