import { useState } from 'react';
import LSB from '../LeftDrawer/Sidebar';
import TopBar from '../TopBar1/TopBar'
import cls from './DeliverablesPage.module.css';
import Table from '../DelivTable/DelivTable'

export default function Messenger(props) {
  const [showSide, setSide] = useState({ showSide: false })
  const showSideBar = () => {
    setSide({ showSide: !showSide.showSide })
  }

  return (
    <div className={cls.Messenger}>
      <TopBar showS={showSideBar} />
      <LSB showSState={showSide.showSide} />
      <Table />
    </div>
  );
}