import React from "react";
import { View, Image, ScrollView ,StyleSheet} from "react-native";
import { Button ,Text, Divider} from "react-native-elements";

const DeliverableDescription = (props) => {
  
  return (
    <View>
    <Text h4 style={styles.header}>{props.navigation.getParam('deliverable_name')}</Text>
    <Divider style={styles.dividerStyle}/>
    <ScrollView>
    <View style={styles.deliverableInfo}>
    <Text>Deadline: {props.navigation.getParam('deadline')}</Text>
    <Text>Mark: {props.navigation.getParam('mark')}</Text>
    <Text multiline={true}>Description: {props.navigation.getParam('description')}</Text>
    </View>
    </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  header:{
    marginTop:10,
    textAlign:"center"
  },
  deliverableInfo:{
    marginLeft:10,
    marginRight:10
  },
  dividerStyle:{
    margin:20
  }
});
export default DeliverableDescription;
