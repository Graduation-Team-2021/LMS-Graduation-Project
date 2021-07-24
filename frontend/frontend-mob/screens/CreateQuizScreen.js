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
import { AddQuiz } from "../Interface/Interface";

const CreateQuizScreen = (props) => {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { question: "", mark: "" } });

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
        { answer: "true", right_answer: false },
        { answer: "false", right_answer: false },
      ]);
    }
  }, [value]);

  return (
    <View style={styles.main}>
      <View style={{ paddingVertical: 3 }} />
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
            name="mark"
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
                  name={`answers.${index}.right_answer`}
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
            onPress={() => append({ answer: "", right_answer: false })}
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
              `the quiz contains of ${questions.current.length} questions in 15 minute, if you want more please purchase the full version `,
              [
                {
                  text: "not yet",
                  style: "destructive",
                },
                {
                  text: "send",
                  style: "default",
                  onPress: () => {
                    let total_marks = 0;
                    questions.current.forEach((question) => {
                      total_marks += parseInt(question.mark);
                    });
                    let kak = {
                      course_id: props.navigation.getParam("course").CourseID,
                      exam_duration: "15 Minutes",
                      exam_marks: total_marks,
                      questions: questions.current,
                    };
                    console.log(kak);
                    AddQuiz(kak).then((res) => {
                      console.log(
                        "[Davids wanna sleep]===================================="
                      );
                      console.log(res);
                      console.log(
                        "[Davids wanna sleep]===================================="
                      );
                      return Alert.alert(
                        "Quiz Uploaded Successfully",
                        "You have made one successfull upload for a quiz",
                        [{ text: "Okay" }]
                      );
                    });
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
