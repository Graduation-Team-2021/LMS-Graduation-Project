import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import MultiSelect from "react-native-multiple-select";
import { SignUp as AC } from "../Interface/Interface";
import validator from "validator";

const AddUser = (props) => {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      national_id: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    data["role"] = items[0];
    data["birthday"] = date.toISOString().slice(0, 10);

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
              label="Name"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.name}
            />
          )}
          name="name"
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
              label="Email"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.email}
            />
          )}
          name="email"
          rules={{
            required: true,
            validate: (value) => validator.isEmail(value),
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="National ID"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.weekly_hours}
              keyboardType="numeric"
            />
          )}
          name="national_id"
          rules={{
            required: true,
            validate: (value) => value.toString().length === 14,
          }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              onChangeText={(value) => onChange(value)}
              value={value}
              mode="outlined"
              error={errors.group_number}
              secureTextEntry
            />
          )}
          name="password"
          rules={{
            required: true,
            validate: (value) => value.length > 0,
          }}
          defaultValue=""
        />
        <MultiSelect
          uniqueKey="id"
          selectText="Role"
          items={[
            { id: "professor", name: "Professor or TA" },
            { id: "student", name: "Student" },
          ]}
          onSelectedItemsChange={(Items) => {
            setItems(Items);
          }}
          selectedItems={items}
          single
        />
        <Button
          icon="lock-reset"
          mode="contained"
          onPress={() => {
            setVisible(true);
          }}
        >
          Select Birthday
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
          Submit User
        </Button>
      </ScrollView>
    </View>
  );
};

export default AddUser;
