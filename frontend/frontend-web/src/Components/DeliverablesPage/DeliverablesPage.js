import React, { useState } from 'react';
import cls from './DeliverablesPage.module.css';
import Table from '../DelivTable/DelivTable'
import Modal from '../Modal/Modal'
import Item from './Item/Item'
import Assignment from './Assignment/Assignment'
import { withRouter, Switch, Route } from "react-router-dom";
import Card from '../Card/Card';

function DeliverablesPage(props) {
  const [showModal, setModal] = useState({ showMod: false });
  const [modalContent, setModalContent] = useState({ content: null });

  const onRowClickHandler = (rowData) => {
    setModalContent({
      content: (
        <div>
          <h2>{rowData['row'].name} - {rowData['row'].type} - {rowData['row'].course}</h2>
          <h3>Deadline: {rowData['row'].deadline}</h3>
          <h3>Allowed time: {rowData['row'].leeway}</h3>
          <button className={cls.button} onClick={() => {
            setModal({ showMod: false });
            props.history.push({
              pathname: `/Deliv/${rowData['row'].type}/${rowData.id}`,
              state: { data: rowData['row'] }
            })
          }}>Start</button>
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
        <Route path="/Deliv" exact render={() => <Table onRowHand={onRowClickHandler} />} />
        <Route path="/Course/:id/Deliv" exact render={() => <Table name={props.location.state.name} id={props.match.params.id} onRowHand={onRowClickHandler} />} />
        <Route path="/Deliv/Assignment/:id" exact component={Assignment} />
      </Switch>
    </Card>
  );
}

export default withRouter(DeliverablesPage);
