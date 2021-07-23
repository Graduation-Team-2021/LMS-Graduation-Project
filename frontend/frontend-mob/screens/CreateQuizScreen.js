import React, { Fragment, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  IconButton,
  Colors,
  RadioButton,
} from "react-native-paper";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { ErrorMessage } from "@hookform/error-message";

const CreateQuizScreen = (props) => {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { question: "" } });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { control, name: "answers" }
  );

  const onSubmit = (data) => {
    console.log("[DATA]====================================");
    console.log(data);
    console.log("[DATA]====================================");
  };
  const [value, setValue] = useState("choose");

  useEffect(() => {
    remove();
    if (value === "true/false") {
      append([
        { answer: "true", correct: false },
        { answer: "false", correct: false },
      ]);
    }
  }, [value]);

  return (
    <View style={styles.main}>
      <Controller
        control={control}
        render={({ field }) => {
          return <TextInput label="question" {...field} />;
        }}
        name="question"
        defaultValue={""}
        rules={{ minLength: 1 }}
      />
      <ErrorMessage
        errors={errors}
        name="question"
        render={(kak) => {
          console.log("message", kak);
          return <Text>Hi</Text>;
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <Text>Choose Type</Text>
          <RadioButton.Group
            onValueChange={(newValue) => setValue(newValue)}
            value={value}
          >
            <View style={{ flexDirection: "row" }}>
              <RadioButton value="true/false" />
              <Text>true/false</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <RadioButton value="choose" />
              <Text>choose</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <TextInput mode="outlined" label="score" />
        </View>
      </View>
      <ScrollView>
        {fields.map((item, index) => {
          return (
            <Fragment key={item.id}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Controller
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => {
                    return (
                      <TextInput
                        label={`answer #${index + 1}`}
                        onBlur={onBlur}
                        onChangeText={(text) => onChange(text)}
                        value={value}
                        style={{ flex: 1 }}
                        mode="outlined"
                      />
                    );
                  }}
                  name={`answers.${index}.answer`}
                  defaultValue={item.value}
                  rules={{ minLength: 1, required: true }}
                />

                <Controller
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => {
                    return (
                      <IconButton
                        icon={value ? "check" : "close"}
                        color={value ? Colors.green500 : Colors.red700}
                        size={20}
                        onPress={() => onChange(!value)}
                      />
                    );
                  }}
                  name={`answers.${index}.correct`}
                  defaultValue={item.value}
                  rules={{ minLength: 1, required: true }}
                />

                <IconButton
                  icon="delete"
                  color={Colors.red400}
                  size={20}
                  onPress={() => remove(index)}
                />
              </View>
              <ErrorMessage
                errors={errors}
                name={`answers.${index}.answer`}
                render={(kak) => {
                  console.log("message", kak);
                  return <Text>Hi</Text>;
                }}
              />
            </Fragment>
          );
        })}
      </ScrollView>
      <View style={styles.buttonPadding}>
        <Button
          mode="contained"
          onPress={() => append({ answer: "", correct: false })}
        >
          add new answer
        </Button>
      </View>

      <View style={styles.buttonPadding}>
        <Button icon="check" mode="contained" onPress={handleSubmit(onSubmit)}>
          submit Question
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    margin: 0,
    padding: 10,
  },
  buttonPadding: {
    padding: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuizScreen);
