import React, { Fragment } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
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
  } = useForm({ defaultValues: { question: "", answers: [{ answer: "" }] } });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { control, name: "answers" }
  );

  const onSubmit = (data) => {
    console.log("[DATA]====================================");
    console.log(data);
    console.log("[DATA]====================================");
  };

  return (
    <View style={styles.main}>
      <Controller
        control={control}
        render={({ field }) => {
          return (
            <TextInput label="question" {...field} error={errors.newPassword} />
          );
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
      <ScrollView>
        {fields.map((item, index) => {
          return (
            <Fragment key={item.id}>
              <Controller
                key={item.id}
                control={control}
                render={({ field }) => {
                  return (
                    <TextInput
                      label={`answer #${index}`}
                      {...field}
                      error={errors.newPassword}
                    />
                  );
                }}
                name={`answers.${index}`}
                defaultValue={item.value}
                rules={{ minLength: 1 }}
              />
              <ErrorMessage
                errors={errors}
                name={`answers.${index}`}
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
        <Button mode="contained" onPress={() => append({ answer: null })}>
          add new answer
        </Button>
      </View>

      <View style={styles.buttonPadding}>
        <Button
          icon="lock-reset"
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Reset My Password
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: "red",
    justifyContent: "center",
    margin: 0,
    padding: 10,
  },
  buttonPadding: {
    padding: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuizScreen);
