
import React, { Fragment,useEffect,useState} from "react";
import { View, FlatList,ScrollView, StyleSheet, Text,ActivityIndicator } from "react-native";
import { Button,Divider  } from "react-native-elements";
import { PieChart } from "react-native-svg-charts";
import {getAllStudentsDeliverables,deleteDeliverable} from "../Interface/Interface";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";
import DeliverableItem from "../components/DeliverableItem";
import {showMessage, hideMessage} from "react-native-flash-message";
import { Entypo,AntDesign} from '@expo/vector-icons';
const Deliverables = [
  {
    name: "Creating FSD",
    type: "Quiz",
    status: "In Progress",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "40 minutes",
    mark: "N/A",
    id: 1,
    coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  }
];

const AllDelivList = (props) => {
  const [deliverables,setDeliverables] = useState()
  const [deliverablesLoaded,setDeliverablesLoaded]= useState(false)
  const x =[0,1]
  useEffect(() => {
    retrieveStudentDeliverables()
  }, []);
  const retrieveStudentDeliverables=(()=>{
    getAllStudentsDeliverables(props.userData.Token).then((res) => {
      setDeliverables(res)
      setDeliverablesLoaded(true)
  });
  })
  ////////////////////////////////////////////////////////////////
  //TODO: Modify this part
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
  const sortDeliverables = (deliverables) =>{
    deliverables.sort(function(a,b){
      if (a.id !== b.id) {
        return a.id - b.id
    }
    if (a.name === b.name) {
      return 0;
    }
    return a.name > b.name ? 1 : -1;
    })
  }
  const previewDeliverableHandler = (deliverable) =>{
    props.navigation.navigate({
      routeName: "DeliverableDescription",
      params: {deliverable_id:deliverable.deliverable_id,deliverable_name:deliverable.deliverable_name,mark:deliverable.mark,deadline:deliverable.deadline,description:deliverable.description,status:deliverable.status,updateDeliverables:retrieveStudentDeliverables}})
  }
  const deleteDeliverableHandler = (deliverable_id) =>{ 
    deleteDeliverable(deliverable_id).then(res=>{
    retrieveStudentDeliverables()
    showMessage({
      message: "Deliverable deleted successfully.",
      type: "success",
      duration:"3000"
    });
    })
  }
  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
      0,
      7
    );
  const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () => console.log("press", index),
      },
      key: `pie-${index}`,
    }));
  ////////////////////////////////////////////////////////////////

  return (
      <ScrollView>
      <Text style={styles.headerStyle}>All Deliverables</Text>
      <Divider style={styles.dividerStyle}/>
      <PieChart style={{ height: 200 }} data={pieData} />
      {deliverablesLoaded?(deliverables.map((course) =>{
        return(
        <View>
          <Divider style={styles.dividerStyle}/>
        <View style={styles.headerContainer}>
          <Text style={styles.courseHeaderStyle}>{course.course_name}</Text>
        </View>
        
        
        {sortDeliverables(course.deliverables)}
        {course.deliverables.map((deliverable,i)=>{
          return(
            <View>
            <DeliverableItem key ={i} deliverable={deliverable} deleteDeliverableHandler={deleteDeliverableHandler} previewDeliverableHandler={previewDeliverableHandler}></DeliverableItem>
            </View>
          )
        })}
        </View>
        )
        })):<ActivityIndicator size="large" style={{marginTop:20}}/>}
        <Divider style={styles.dividerStyle}/>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  dividerStyle:{
    marginVertical:20
  },
  courseHeaderStyle:{
    marginBottom:10,
    fontSize:20,
    textAlign:'center',
  },
  headerStyle:{
    marginTop:20,
    fontSize:20,
    textAlign:'center',
  },
  headerContainer:{
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(AllDelivList);
