import React, { useEffect, useState, Fragment } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Portal, FAB, Modal } from "react-native-paper";

import * as Interface from "../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../store/reduxMaps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import ANHeaderButton from "../components/ANHeaderButton";
const RecentEventScreen = (props) => {
  const [events, setEvents] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  useEffect(() => {
    Interface.getRecentEvent(props.userData.Token, props.userData.ID).then(
      (res) => {
        setEvents(res);
      }
    );
  }, []);

  let content = <ActivityIndicator color="red" />;
  if (events != null) {
    content = (
      <Portal.Host>
        <Portal>
          <FAB
            onPress={showModal}
            icon="plus"
            style={styles.fab}
            loading={visible}
          />
        </Portal>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.containerStyle}
          >
            <Text>Example Modal. Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
        <Text style={styles.row}>{events.event_name}</Text>
        <Text style={styles.row}>{events.course_code}</Text>
        <Text style={styles.row}>{events.event_description}</Text>
        <Text style={styles.row}>{events.event_type}</Text>
        <Text style={styles.row}>{events.event_date}</Text>
      </Portal.Host>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

RecentEventScreen.navigationOptions = (navData) => {
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  containerStyle: { backgroundColor: "white", padding: 20 },
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentEventScreen);
