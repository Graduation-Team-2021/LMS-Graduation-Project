import React, { Fragment } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";
const PdfItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const previewPdfHandler = () => {
    props.previewPdfHandler(props.pdf.material_id);
  };

  const deleteMaterialHandler = () => {
    props.deleteMaterialHandler(props.pdf.material_id, "pdf");
  };
  const deleteAlertHandler = () => {
    Alert.alert(
      "Delete Pdf ",
      "Are you sure you want to delete " + props.pdf.material_name + "?",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        { text: "Confirm", onPress: deleteMaterialHandler },
      ]
    );
  };
  return (
    <View
      style={{
        marginLeft: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <TouchableCmp
          onPress={previewPdfHandler}
          style={{ flexDirection: "row" }}
        >
          <Fragment>
            <FontAwesome
              name="file-pdf-o"
              size={20}
              style={{ marginRight: 6 }}
            />
            <Text style={{ width: "66%" }}>
              {props.pdf.material_name}
              {props.pdf.material_type}
            </Text>
          </Fragment>
        </TouchableCmp>
        {props.userData.Role == "professor" && (
          <TouchableCmp
            style={{ marginLeft: "auto" }}
            onPress={deleteAlertHandler}
          >
            <Entypo name="circle-with-cross" size={20} color="red" />
          </TouchableCmp>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  iconStyle: {
    marginLeft: 11,
  },
  dividerStyle: {
    margin: 20,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(PdfItem);
