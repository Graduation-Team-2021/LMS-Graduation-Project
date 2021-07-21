import React from "react";
import Table from "../DelivTable/DelivTable";
import Assignment from "./Assignment/Assignment";
import { withRouter, Switch, Route } from "react-router-dom";
import Card from "../Card/Card";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/reduxMaps";

function DeliverablesPage(props) {

  const onRowClickHandler = (rowData) => {
    if (props.userData.Role === "student") {
      props.history.push({
        pathname: `/Deliv/Assignment/${rowData.id}`,
        state: { data: rowData["row"] },
      });
      } else {
      if (!props.location.state || !props.location.state.student) {
        props.history.push({
          pathname: `/Deliv/Assignment/${rowData.id}`,
          state: { data: rowData["row"], student: true },
        });
      } else {
        console.log(rowData);
        props.history.push({
          pathname: `/Deliv/Assignment/${rowData.id}/${rowData["row"].gid}`,
          state: { data: rowData["row"]},
        });
      }
    }
  };

  return (
    <Card>
      <Switch>
        <Route
          path="/Deliv"
          exact
          render={() => <Table onRowHand={onRowClickHandler} />}
        />
        <Route
          path="/Course/:id/Deliv"
          exact
          render={() => (
            <Table
              name={props.location.state.name}
              id={props.match.params.id}
              onRowHand={onRowClickHandler}
            />
          )}
        />
        <Route
          path="/Deliv/Assignment/:id"
          exact
          render={() => {
            if (props.userData.Role === "student") return <Assignment />;
            else
              return (
                <Table
                  student={props.location.state.student}
                  name={props.location.state.data.name}
                  id={props.match.params.id}
                  onRowHand={onRowClickHandler}
                />
              );
          }}
        />
        <Route
          path="/Deliv/Assignment/:id/:group_id"
          exact
          render={() => {
            <Assignment group={props.match.params.group_id} />;
          }}
        />
      </Switch>
    </Card>
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeliverablesPage)
);
