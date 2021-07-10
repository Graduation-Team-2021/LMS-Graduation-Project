import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, Keyboard,View,StyleSheet,ScrollView} from "react-native";
import { Input, Text ,Button,Divider} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { postNewDeliverable} from "../Interface/Interface";

const CreateDeliverable = (props) => {
  const [mark,setMark] = useState([])
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  var today = new Date();
  let Data = {}
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  

  const createNewDeliverableHandler = () =>{
    Data = {
      mark:mark,
      deadline: String(`${date.toISOString().slice(0, 10)} ${date.toISOString().slice(11, 19)}`),
      deliverable_name: name,
      students_number:5,
      description:description,
      course_deliverables: props.navigation.getParam("courseId")
    }
    postNewDeliverable(Data).then((res) => {
      props.navigation.pop()
    });
  }

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.header}>Deliverable Name:</Text>
        <Input
   placeholder="Python Experiment"
   style={styles.placeholder}
   onChangeText={value => setName(value)}
   require={true}
  />
        <Text style={styles.header}>Description:</Text>
        <Input
   placeholder="In this assignment you are required..."
   style={styles.placeholder}
   onChangeText={value => setDescription(value)}
   multiline={true}
   require={true}
   keyboardShouldPersistTaps='handled'
  />
  <Text style={styles.header}>Mark:</Text>
        <Input
   placeholder="5"
   style={styles.placeholder}
   keyboardType = 'numeric'
   value = {mark}
   onChangeText={value => setMark(value)}
   require={true}
  />
  <Text style={styles.header}>Deadline:</Text>
  <View style={styles.dateContainer}>
      {(
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          style={styles.date}
          minimumDate={new Date(today.getFullYear(),String(today.getMonth() + 1).padStart(2, '0'),String((today.getDate())+1).padStart(2, '0'))}
          onChange={onDateChange}
        />
      )}
      {(
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"time"}
          style={styles.date}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
    <View>
        
    </View>
    <Button
      title="Submit Form"
      buttonStyle={{minWidth:200, width:"70%", maxWidth:250, alignSelf: 'center',marginBottom:40,marginTop:30}}
      type="outline"
      onPress={createNewDeliverableHandler}
      />
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dateContainer:{
  },
  date:{
    width:200,
    marginTop:20
  },
  header:{
    fontSize:20,
    color:"rgb(140,153,163)",
    fontWeight:"600"
  },
  dividerStyle:{
    margin:20
  },
  placeholder:{
    fontWeight:"200"
  },
  container:{
    padding:10,
    color:"#A6B0B7"
  }
});

export default CreateDeliverable;