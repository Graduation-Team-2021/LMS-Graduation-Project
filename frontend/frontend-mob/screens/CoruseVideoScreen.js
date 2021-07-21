import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import VideoList from "../components/videos_list";
import { getVideos } from "../Interface/Interface";
const CourseVideoScreen = (props) => {
  const myCourse = props.navigation.getParam("course");
  const [videos, setVideos] = useState([]);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const retrieveVideos = () => {
    getVideos(myCourse.CourseID).then((res) => {
      const temp = [];
      res.forEach((ele, index) => {
        temp.push({
          material_id: ele["material_id"],
          material_name: ele["material_name"],
          material_type: ele["material_type"],
        });
      });
      setVideos(temp);
      setVideosLoaded(true);
    });
  };
  useEffect(() => {
    retrieveVideos();
  }, []);

  if (videosLoaded) {
    return <VideoList videos={videos} navigation={props.navigation} />;
  } else {
    return <ActivityIndicator color="red" />;
  }
};

export default CourseVideoScreen;
