import React from "react";
import { FlatList } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
import VideoItem from "./VideoItem";

const VideoList = (props) => {
  const previewVideoHandler = (video_id) => {
    props.navigation.navigate({
      routeName: "Video",
      params: { videoId: video_id },
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
            deleteMaterialHandler={props.deleteMaterialHandler}
          />
        );
      }}
    />
  );
};

export default VideoList;
