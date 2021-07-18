import React, { useEffect, useState, Fragment } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as Interface from "../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { connect } from "react-redux";
const RecentEventScreen = (props) => {
  const list = [{ event_name: "hahsdjhjsad", event_deadline: "sajkhsdakjha" }];
  const [events, setEvents] = useState(null);
  useEffect(() => {
    Interface.getRecentEvent(props.userData.Token, props.userData.ID).then(
      (res) => {
        console.log("[ibtahim]", res);
        setEvents(res);
      }
    );
  }, []);

  let content = <ActivityIndicator color="red" />;
  if (events != null) {
    content = (
      <Fragment>
        <Text style={styles.row}>{events.event_name}</Text>
        <Text style={styles.row}>{events.course_code}</Text>
        <Text style={styles.row}>{events.event_description}</Text>
        <Text style={styles.row}>{events.event_type}</Text>
        <Text style={styles.row}>{events.event_date}</Text>
      </Fragment>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  row: {
    padding: 4,
    borderBottomColor: "red",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentEventScreen);
