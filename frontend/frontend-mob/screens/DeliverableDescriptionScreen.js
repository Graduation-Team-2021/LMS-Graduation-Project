import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Button } from "react-native-elements";

const DeliverableDescription = (props) => {
  const Deliverable = props.navigation.getParam("Deliverable");
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image
        style={{ width: "100%", height: "40%" }}
        //source={require($`props.image`)}
        source={{
          uri: Deliverable.coursePicURI,
        }}
      />
      <ScrollView>
        <Text style={{ padding: 20, fontSize: 24, textAlign: "center" }}>
          {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor purus ut efficitur imperdiet." +
            "Phasellus vel tortor sit amet ligula sollicitudin suscipit. Proin lobortis ut lorem ac tristique. Vivamus leo diam, " +
            "dictum ac consectetur ut, mattis sit amet est. Proin at dui tincidunt, rutrum nulla sed, placerat augue."}
        </Text>
      </ScrollView>
      <Text style={{ padding: 20, fontSize: 24, textAlign: "center" }}>
        {Deliverable.name}
      </Text>
      <Text style={{ padding: 10, fontSize: 16, textAlign: "center" }}>
        {Deliverable.type === "Quiz"
          ? `Allowed time: ${Deliverable.leeway}`
          : null}
      </Text>
      <Button
        //title= "go to $`props.CourseName`"
        title={
          Deliverable.type === "Quiz"
            ? `Begin ${Deliverable.name} ${Deliverable.type}`
            : `Go to ${Deliverable.name} ${Deliverable.type}`
        }
        color="#F0F8FF"
        onPress={() => {
          props.navigation.navigate({
            routeName: "DeliverableSubmetion",
            params: { delevrableName: Deliverable.name,deliverableType:Deliverable.type },
          });
        }}
      />
    </View>
  );
};

export default DeliverableDescription;
