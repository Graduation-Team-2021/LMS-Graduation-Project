import * as React from 'react';
import { View, StyleSheet, Button, ProgressViewIOSComponent ,Text} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { materialUri} from "../Interface/Interface";

export default function VideoScreen(props) {
  const videoId = props.navigation.state.params.videoId
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [videoUrl,setVideoUrl] = React.useState("")
  React.useEffect(()=>{
    materialUri(videoId).then((res) => {
        setVideoUrl(res)
    });
},[])
  
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri:"http://lmsproj.centralus.cloudapp.azure.com:5000"+videoUrl,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
