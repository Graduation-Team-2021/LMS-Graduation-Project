import { useState } from 'react';
import LSB from '../LeftDrawer/Sidebar';
import TopBar from '../TopBar1/TopBar'
import cls from './DeliverablesPage.module.css';
import Table from '../DelivTable/DelivTable'
import Modal from '../Modal/Modal'


export default function Messenger(props) {
  const [showSide, setSide] = useState({ showSide: false })
  const showSideBar = () => {
    setSide({ showSide: !showSide.showSide })
  }

  const [showModal, setModal] = useState({showMod: false})

  const [modalContent, setModalContent] = useState({content:null})

  const onRowClickHandler = (rowId) => {
    setModalContent({content:<p>Hi from quiz with ID: {rowId}</p>})
    setModal({showMod: true});
  }


  return (
    <div className={cls.Messenger}>
      <Modal show={showModal.showMod} onClick={()=>setModal({showMod: false})}>{modalContent.content}</Modal>
      <TopBar showS={showSideBar} />
      <LSB showSState={showSide.showSide} />
      <Table onRowHand = {onRowClickHandler} />
    </div>
  );
}