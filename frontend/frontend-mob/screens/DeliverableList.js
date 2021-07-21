import React, { useEffect, useState, useRef, Fragment } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { Divider } from "react-native-elements";
import { PieChart } from "react-native-svg-charts";
import {
  getAllStudentsDeliverables,
  deleteDeliverable,
} from "../Interface/Interface";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";
import DeliverableItem from "../components/DeliverableItem";
import { showMessage, hideMessage } from "react-native-flash-message";
import sha256 from "crypto-js/sha512";
import { Snackbar } from "react-native-paper";

const AllDelivList = (props) => {
  const [deliverables, setDeliverables] = useState();
  const [deliverablesLoaded, setDeliverablesLoaded] = useState(false);
  const [PieData, setPieData] = useState({});
  const [SnackBarVisablity, setSnackBarVisablity] = useState(false);
  const snackBarMessage = useRef("");
  const [snackBarColor, setSnackBarColor] = useState("black");
  useEffect(() => {
    retrieveStudentDeliverables();
  }, []);
  const retrieveStudentDeliverables = () => {
    getAllStudentsDeliverables(props.userData.Token).then((res) => {
      const pieData = {};
      res.forEach((course) => {
        pieData[course.course_name] = course.deliverables.length;
      });
      setPieData(pieData);
      setDeliverables(res);
      setDeliverablesLoaded(true);
    });
  };

  const sortDeliverables = (deliverables) => {
    deliverables.sort(function (a, b) {
      if (a.id !== b.id) {
        return a.id - b.id;
      }
      if (a.name === b.name) {
        return 0;
      }
      return a.name > b.name ? 1 : -1;
    });
  };
  const previewDeliverableHandler = (deliverable) => {
    props.navigation.navigate({
      routeName: "DeliverableDescription",
      params: {
        deliverable_id: deliverable.deliverable_id,
        deliverable_name: deliverable.deliverable_name,
        mark: deliverable.mark,
        deadline: deliverable.deadline,
        description: deliverable.description,
        status: deliverable.status,
        updateDeliverables: retrieveStudentDeliverables,
      },
    });
  };
  const deleteDeliverableHandler = (deliverable_id) => {
    deleteDeliverable(deliverable_id).then((res) => {
      retrieveStudentDeliverables();
      showMessage({
        message: "Deliverable deleted successfully.",
        type: "success",
        duration: "3000",
      });
    });
  };
  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
      0,
      7
    );
  const pieData = Object.keys(PieData).map((value, index) => {
    const target = value;
    const hashedItem = sha256(JSON.stringify(target));
    let avatarColor = "#";
    for (let index = 0; index < 6; index++) {
      const element = hashedItem.words[index];
      const newIndex = Math.abs(element % 16);
      avatarColor = avatarColor.concat(newIndex.toString(16));
    }
    return {
      value: PieData[value],
      svg: {
        fill: avatarColor,
        onPress: () => {
          snackBarMessage.current = value;
          setSnackBarColor(avatarColor);
          setSnackBarVisablity(true);
        },
      },
      key: `pie-${index}`,
    };
  });
  ////////////////////////////////////////////////////////////////

  return (
    <Fragment>
      <Snackbar
        visible={SnackBarVisablity}
        onDismiss={() => setSnackBarVisablity(false)}
        duration={500}
        style={{ backgroundColor: snackBarColor }}
      >
        {snackBarMessage.current}
      </Snackbar>
      <ScrollView>
        <Text style={styles.headerStyle}>All Deliverables</Text>
        <Divider style={styles.dividerStyle} />
        <PieChart style={{ height: 200 }} data={pieData} />
        {deliverablesLoaded ? (
          deliverables.map((course, index) => {
            return (
              <View key={`course ${index}`}>
                <Divider style={styles.dividerStyle} />
                <View style={styles.headerContainer}>
                  <Text style={styles.courseHeaderStyle}>
                    {course.course_name}
                  </Text>
                </View>

                {sortDeliverables(course.deliverables)}
                {course.deliverables.map((deliverable, i) => {
                  return (
                    <View key={i}>
                      <DeliverableItem
                        deliverable={deliverable}
                        deleteDeliverableHandler={deleteDeliverableHandler}
                        previewDeliverableHandler={previewDeliverableHandler}
                      ></DeliverableItem>
                    </View>
                  );
                })}
              </View>
            );
          })
        ) : (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        )}
        <Divider style={styles.dividerStyle} />
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  dividerStyle: {
    marginVertical: 20,
  },
  courseHeaderStyle: {
    marginBottom: 10,
    fontSize: 20,
    textAlign: "center",
  },
  headerStyle: {
    marginTop: 20,
    fontSize: 20,
    textAlign: "center",
  },
  headerContainer: {},
});
export default connect(mapStateToProps, mapDispatchToProps)(AllDelivList);
