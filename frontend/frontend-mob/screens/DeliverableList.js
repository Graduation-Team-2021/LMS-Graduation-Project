import React, { useEffect, useState, useRef, Fragment } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Divider } from "react-native-elements";
import { PieChart } from "react-native-svg-charts";
import {
  getAllStudentsDeliverables,
  deleteDeliverable,
  getQuizzes,
} from "../Interface/Interface";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../store/reduxMaps";
import DeliverableItem from "../components/DeliverableItem";
import { showMessage, hideMessage } from "react-native-flash-message";
import sha256 from "crypto-js/sha512";
import { Snackbar, Portal, FAB } from "react-native-paper";
import QuizItem from "../components/QuizItem";

const AllDelivList = (props) => {
  const [deliverables, setDeliverables] = useState([]);
  const [deliverablesLoaded, setDeliverablesLoaded] = useState(false);
  const [PieData, setPieData] = useState({});
  const [SnackBarVisablity, setSnackBarVisablity] = useState(false);
  const [snackBarColor, setSnackBarColor] = useState("black");
  const snackBarMessage = useRef("");
  const myCourse = props.navigation.getParam("course");
  const isQuiz = props.navigation.getParam("isQuiz");
  useEffect(() => {
    if (isQuiz) {
      retrieveCourseQuizes();
    } else {
      retrieveStudentDeliverables();
    }
  }, []);

  const retrieveCourseQuizes = () => {
    if (myCourse && isQuiz) {
      getQuizzes(myCourse.CourseID, props.userData.ID).then((res) => {
        console.log("[Quiz]====================================");
        console.log(res);
        console.log("[Quiz]====================================");
        let pieData = {};
        res.forEach((quiz) => {
          if (pieData[quiz.status]) {
            pieData[quiz.status] += 1;
          } else {
            pieData[quiz.status] = 1;
          }
        });
        setPieData(pieData);
        setDeliverables(res);
        setDeliverablesLoaded(true);
      });
    }
  };

  const retrieveStudentDeliverables = () => {
    getAllStudentsDeliverables(props.userData.Token).then((res) => {
      let newRes = res;
      if (myCourse) {
        newRes = newRes.filter((e) => {
          return e.course_name === myCourse.CourseName;
        });
      }

      const pieData = {};
      if (myCourse) {
        newRes[0].deliverables.forEach((delv) => {
          if (pieData[delv.status]) {
            pieData[delv.status] += 1;
          } else {
            pieData[delv.status] = 1;
          }
        });
      } else {
        newRes.forEach((course) => {
          pieData[course.course_name] = course.deliverables.length;
        });
      }
      setPieData(pieData);
      setDeliverables(newRes);
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

  const DeliverableContent = isQuiz ? null : (
    <ScrollView>
      {deliverables.map((course, index) => {
        return (
          <View key={`course ${index}`}>
            <Divider style={styles.dividerStyle} />
            <View style={styles.headerContainer}>
              <Text style={styles.courseHeaderStyle}>{course.course_name}</Text>
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
      })}
    </ScrollView>
  );

  const QuizContent = (
    <FlatList
      data={deliverables}
      keyExtractor={(_, index) => index.toString()}
      renderItem={(item) => (
        <QuizItem
          Quiz={item.item}
          previewQuizHandler={() =>
            props.navigation.navigate("DeliverableSubmission", {
              Quiz: item.item,
            })
          }
        />
      )}
    />
  );
  const ScrollViewContent = isQuiz ? QuizContent : DeliverableContent;

  return (
    <Portal.Host>
      {props.userData.Role === "professor" ? (
        <Portal>
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() =>
              props.navigation.navigate(
                isQuiz ? "CreateQuiz" : "AddDelivPage",
                {
                  course: myCourse,
                  isQuiz: isQuiz,
                }
              )
            }
          />
        </Portal>
      ) : null}
      <Snackbar
        visible={SnackBarVisablity}
        onDismiss={() => setSnackBarVisablity(false)}
        duration={500}
        style={{ backgroundColor: snackBarColor }}
      >
        {snackBarMessage.current}
      </Snackbar>
      {props.userData.Role === "student" ? (
        <PieChart style={{ height: 200, paddingTop: 10 }} data={pieData} />
      ) : null}
      {deliverablesLoaded ? (
        ScrollViewContent
      ) : (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      )}
      <Divider style={styles.dividerStyle} />
    </Portal.Host>
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 5,
    bottom: 15,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AllDelivList);
