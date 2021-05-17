import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import DeliverableItem from "../components/DeliverableItem";


const Deliverables = [
  {
    name: "Creating FSD",
    type: "Quiz",
    status: "In Progress",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "40 minutes",
    mark: "N/A",
    id: 1,
    coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    name: "Sever Deployment",
    type: "Assignment",
    status: "Not Started",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "N/A",
    mark: "N/A",
    id: 2,
    coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    name: "Configuration analysis",
    type: "Quiz",
    status: "Completed",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "40 minutes",
    mark: "7",
    id: 3,
    coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    name: "Data Architecture",
    type: "Assignment",
    status: "Completed",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "N/A",
    mark: "9",
    id: 4,
    coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    name: "Data",
    type: "Assignment",
    status: "Not Started",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "N/A",
    mark: "N/A",
    id: 5,
    coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    name: "Dynamic Routing",
    type: "Assignment",
    status: "Completed",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "N/A",
    mark: "N/A",
    id: 6,
    coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    name: "noSQL",
    type: "Assignment",
    status: "In Progress",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "N/A",
    mark: "N/A",
    id: 7,
    coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    name: "Genetic Breeding model",
    type: "Quiz",
    status: "In Progress",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "40 minutes",
    mark: "N/A",
    id: 8,
    coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
  {
    name: "Phenomenological model",
    type: "Assignment",
    status: "Completed",
    course: "Software Engineering",
    coursecode: "CSE412",
    deadline: "09-04-2021",
    leeway: "N/A",
    mark: "N/A",
    id: 9,
    coursePicURI: "https://images3.alphacoders.com/165/thumb-1920-165087.jpg",
  },
];

const AllDelivList = (props) => {
  const renderItem = ({ item }) => {
    return <DeliverableItem Deliverable={item} navigation={props.navigation} />;
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={Deliverables}
        renderItem={renderItem}
        keyExtractor={(_, index) => `${index}`}
      />
    </View>
  );
};

export default AllDelivList;