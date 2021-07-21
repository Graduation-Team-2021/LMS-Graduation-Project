import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import MultiSelect from "react-native-multiple-select";
import { getDoctors, AddCourse as AC } from "../Interface/Interface";

const AddCourse = (props) => {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      course_code: "",
      course_name: "",
      weekly_hours: "",
      group_number: "",
      max_students: "",
      course_description: "",
      doctors: "",
    },
  });
  const onSubmit = (data) => {
    data["doctors"] = items;
    data["course_deadline"] = date.toISOString().slice(0, 10);

    //TODO: send the request to te backend here
    AC(data).then((res) => {
      if (res) {
        //TODO: Show it Succeded
        reset();
        setDate(new Date());
        setItems([]);
      }
    });
  };

  const [isVisible, setVisible] = React.useState(false);

  const [date, setDate] = React.useState(new Date());

  const [items, setItems] = React.useState([]);

  const [Doctors, setDoctors] = React.useState([]);

  React.useEffect(() => {
    getDoctors().then((res) => {
      if (res) {
        setDoctors(
          res.map((val) => ({ id: val.id.toString(), name: val.name }))
        );
      }
    });
  }, []);

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
              label="Course Code"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.course_code}
            />
          )}
          name="course_code"
          rules={{
            required: true,
            validate: (value) => value.length <= 7 && value.length > 0,
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Course Name"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.course_name}
            />
          )}
          name="course_name"
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
              label="Weekly Hours"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.weekly_hours}
              keyboardType="numeric"
            />
          )}
          name="weekly_hours"
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
              label="Number of Groups"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.group_number}
              keyboardType="numeric"
            />
          )}
          name="group_number"
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
              label="Max Number of Students"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.max_students}
              keyboardType="numeric"
            />
          )}
          name="max_students"
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
              label="Course Description"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.course_description}
            />
          )}
          name="course_description"
          rules={{
            required: true,
            validate: (value) => value.length > 0,
          }}
          defaultValue=""
        />
        <MultiSelect
          uniqueKey="id"
          selectText="List of Doctors"
          items={Doctors}
          onSelectedItemsChange={(Items) => {
            setItems(Items);
          }}
          selectedItems={items}
        />
        <Button
          icon="lock-reset"
          mode="contained"
          onPress={() => {
            setVisible(true);
          }}
        >
          Choose Enrollment Deadline
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
          Submit Course
        </Button>
      </ScrollView>
    </View>
  );
};

export default AddCourse;
