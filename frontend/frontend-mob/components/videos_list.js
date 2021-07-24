import React from "react";
import { FlatList } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import VideoItem from "./VideoItem";
import { deleteMaterial } from "../Interface/Interface";

const VideoList = (props) => {
  const previewVideoHandler = (video_id) => {
    props.navigation.navigate({
      routeName: "Video",
      params: { videoId: video_id },
    });
  };
  const deleteMaterialHandler = (material_id, material_type) => {
    deleteMaterial(material_id).then((res) => {
      let new_videos = [...videos];
      var index = new_videos.findIndex(function (element) {
        return element.material_id === material_id;
      });
      if (index !== -1) {
        new_videos.splice(index, 1);
        setVideos(new_videos);
      }

      showMessage({
        message: "Material deleted successfully.",
        type: "success",
        duration: "3000",
      });
    });
  };
  return (
    <FlatList
      data={props.videos}
      keyExtractor={(_, index) => index.toString()}
      renderItem={(item, i) => {
        return (
          <VideoItem
            key={i}
            video={item.item}
            previewVideoHandler={previewVideoHandler}
            deleteMaterialHandler={deleteMaterialHandler}
          />
        );
      }}
    />
  );
};

export default VideoList;
