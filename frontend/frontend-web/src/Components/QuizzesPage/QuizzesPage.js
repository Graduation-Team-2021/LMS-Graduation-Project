import React, { useState } from "react";
import cls from "./QuizzesPage.module.css";
import Table from "../QuizTable/QuizTable";
import Modal from "../Modal/Modal";
import Item from "./Item/Item";
import { withRouter, Switch, Route } from "react-router-dom";
import Card from "../Card/Card";

function QuizzesPage(props) {
  const [showModal, setModal] = useState({ showMod: false });
  const [modalContent, setModalContent] = useState({ content: null });

  const onRowClickHandler = (rowData) => {
    setModalContent({
      content: (
        <div>
          <h2>
            {rowData["row"].name} - {rowData["row"].type} -{" "}
            {rowData["row"].course}
          </h2>
          <h3>Deadline: {rowData["row"].deadline}</h3>
          <h3>Allowed time: {rowData["row"].leeway}</h3>
          <button
            className={cls.button}
            onClick={() => {
              setModal({ showMod: false });
              props.history.push({
                pathname: `/Quiz/${rowData.id}`,
                state: { data: rowData["row"] },
              });
            }}
          >
            Start
          </button>
        </div>
      ),
    });
    setModal({ showMod: true });
  };

  return (
    <Card>
      <Modal
        show={showModal.showMod}
        onClick={() => setModal({ showMod: false })}
      >
        {modalContent.content}
      </Modal>
      <Switch>
        <Route
          path="/Course/:id/Quiz"
          exact
          render={() => (
            <Table name={props.location.state.name} id={props.match.params.id} onRowHand={onRowClickHandler} />
          )}
        />
        <Route path="/Quiz/:id" exact component={Item} />
      </Switch>
    </Card>
  );
}

export default withRouter(QuizzesPage);
