import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import ANHeaderButton from "../components/ANHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";


const ResetPasswordScreen = (props) => {
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      repeatedPassword: "",
    },
  });
  const onSubmit = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    //TODO: send the request to te backend here
  };

  return (
    <View style={styles.main}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="old password"
            onChangeText={(value) => onChange(value)}
            value={value}
            mode="outlined"
            secureTextEntry
            error={errors.oldPassword}
          />
        )}
        name="oldPassword"
        rules={{ required: true }}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Your New Password"
            onChangeText={(value) => onChange(value)}
            value={value}
            mode="outlined"
            onBlur={onBlur}
            secureTextEntry
            error={errors.newPassword}
          />
        )}
        name="newPassword"
        rules={{ required: true, validate: (value) => value.length > 4 }}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Confirm Your New Password"
            onChangeText={(value) => onChange(value)}
            value={value}
            onBlur={onBlur}
            mode="outlined"
            secureTextEntry
            error={errors.repeatedPassword}
          />
        )}
        name="repeatedPassword"
        rules={{
          required: true,
          validate: (value) =>
            value === getValues("newPassword") && value.length > 0,
        }}
        defaultValue=""
      />
      <View style={styles.buttonPadding}>
        <Button
          mode="contained"
          onPress={() =>
            reset({
              oldPassword: "",
              newPassword: "",
              repeatedPassword: "",
            })
          }
        >
          empty the fields
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
ResetPasswordScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={ANHeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default ResetPasswordScreen;
