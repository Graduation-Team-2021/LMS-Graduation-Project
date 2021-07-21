import React, { useState, useEffect, Fragment } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";

const checkConnectivity = (WrappedComponnent) => {
  const ModifiedComponenect = (props) => {
    const [Connected, setConnected] = useState(true);
    const [Visiable, setVisiable] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);

    const showDialog = () => setDialogVisible(true);
    const hideDialog = () => setDialogVisible(false);

    useEffect(() => {
      NetInfo.addEventListener((newState) => {
        setConnected(newState.isConnected);
        if (!(newState.isConnected && Connected)) {
          setVisiable(true);
        }
        if (!newState.isConnected) {
          showDialog();
        } else {
          hideDialog();
        }
      });
    }, []);

    let alertStyle = styles.connectionAlert;
    let messageContent = "";
    let timer = setTimeout(() => setVisiable(false), 2500);
    if (Connected) {
      alertStyle = { ...alertStyle, ...styles.connection };
      messageContent = "Internet Connection Restored";
    } else {
      alertStyle = { ...alertStyle, ...styles.noConnections };
      messageContent = "No Internet Connection";
      clearTimeout(timer);
    }

    let alertMessage = (
      <TouchableWithoutFeedback onPress={showDialog}>
        <View style={alertStyle}>
          <Text>{messageContent}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
    if (!Visiable) {
      alertMessage = null;
    }
    return (
      <Fragment>
        {alertMessage}
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={hideDialog}>
            <Dialog.Title>No Internet Conncection</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Although there is not internet connection, you can still use the
                LMS application to browse the matierial and continue learning
                from the material saverd on your device, but some feature might
                not be available
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <WrappedComponnent {...props} />
      </Fragment>
    );
  };
  ModifiedComponenect.navigationOptions = WrappedComponnent.navigationOptions;
  return ModifiedComponenect;
};
const styles = StyleSheet.create({
  connectionAlert: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  noConnections: {
    backgroundColor: "red",
  },
  connection: {
    backgroundColor: "green",
  },
  text: {},
});
export default checkConnectivity;
