import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AddNewDeliv as AC } from "../Interface/Interface";

const AddDeliver = (props) => {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      deliverable_name: "",
      mark: "",
      students_number: "",
      description: "",
    },
  });

  const course = props.navigation.getParam("course");

  const onSubmit = (data) => {
    data["deadline"] = date.toISOString().slice(0, 10);
    data["course_deliverables"] = course.CourseID;
    //TODO: send the request to te backend here
    AC(data).then((res) => {
      if (res) {
        //TODO: Show it Succeded
        console.log("====================================");
        console.log(res);
        console.log("====================================");
        reset();
        setDate(new Date());
        setItems([]);
        props.navigation.getParam("retriveDeliv")();
        props.navigation.goBack();
      }
    });
  };

  const [isVisible, setVisible] = React.useState(false);

  const [date, setDate] = React.useState(new Date());

  const [items, setItems] = React.useState([]);

  const [Doctors, setDoctors] = React.useState([]);

  const onChange = (cdate) => {
    const val = cdate || date;
    setVisible(false);
    setDate(val);
  };

  return (
    <View>
      <ScrollView>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Deliverable Name"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.deliverable_name}
            />
          )}
          name="deliverable_name"
          rules={{
            required: true,
            validate: (value) => value.length > 0,
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Marks"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.mark}
              keyboardType="numeric"
            />
          )}
          name="mark"
          rules={{
            required: true,
            validate: (value) => parseInt(value) >= 0,
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Max Number of Students"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.students_number}
              keyboardType="numeric"
            />
          )}
          name="students_number"
          rules={{
            required: true,
            validate: (value) => parseInt(value) > 0,
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Description"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.description}
              multiline
            />
          )}
          name="description"
          rules={{
            required: true,
            validate: (value) => value.length > 0,
          }}
          defaultValue=""
        />
        <Button
          icon="lock-reset"
          mode="contained"
          onPress={() => {
            setVisible(true);
          }}
        >
          Select Deadline
        </Button>
        {isVisible && (
          <DateTimePicker
            mode="date"
            value={date}
            onChange={(_, date) => onChange(date)}
          />
        )}
        <Button
          icon="lock-reset"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Submit Deliverable
        </Button>
      </ScrollView>
    </View>
  );
};

export default AddDeliver;
