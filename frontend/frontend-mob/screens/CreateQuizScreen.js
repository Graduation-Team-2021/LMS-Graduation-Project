import React, { Fragment, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
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

const CreateQuizScreen = (props) => {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { question: "", score: "", duration: "" } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });

  const questions = useRef([]);

  const onSubmit = (data) => {
    questions.current.push(data);
    remove();
    reset();
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
        render={({ field: { onBlur, onChange, value } }) => {
          return (
            <TextInput
              label="duration"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value.toString()}
              keyboardType="phone-pad"
            />
          );
        }}
        name="duration"
        defaultValue={""}
        rules={{ minLength: 1 }}
      />
      <View style={{paddingVertical:3}} />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              label="question"
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          );
        }}
        name="question"
        defaultValue={""}
        rules={{ minLength: 1 }}
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RadioButton value="true/false" />
              <Text>true/false</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RadioButton value="choose" />
              <Text>choose</Text>
            </View>
          </RadioButton.Group>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 5 }}>
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value } }) => {
              return (
                <TextInput
                  label="score"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(text)}
                  value={value.toString()}
                  keyboardType="phone-pad"
                />
              );
            }}
            name="score"
            defaultValue={""}
            rules={{ minLength: 1 }}
          />
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
                />

                <IconButton
                  icon="delete"
                  color={Colors.red400}
                  size={20}
                  onPress={() => remove(index)}
                />
              </View>
            </Fragment>
          );
        })}
      </ScrollView>
      {value === "choose" ? (
        <View style={styles.buttonPadding}>
          <Button
            mode="contained"
            onPress={() => append({ answer: "", correct: false })}
          >
            add new answer
          </Button>
        </View>
      ) : null}

      <View style={styles.buttonPadding}>
        <Button icon="check" mode="text" onPress={handleSubmit(onSubmit)}>
          submit Question
        </Button>
      </View>
      <View style={styles.buttonPadding}>
        <Button
          icon="send"
          mode="outlined"
          onPress={() => {
            Alert.alert(
              "Are you sure that you want to submit?",
              `the quiz contains of ${questions.current.length} questions `,
              [
                {
                  text: "not yet",
                  style: "destructive",
                },
                {
                  text: "send",
                  style: "default",
                  onPress: () => {
                    console.log("====================================");
                    console.log("ok");
                    console.log("====================================");
                  },
                },
              ]
            );
          }}
        >
          submit the entire quiz
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
