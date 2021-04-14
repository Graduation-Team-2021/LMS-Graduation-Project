import { useEffect, useState } from 'react';
import shave from 'shave';
import cls from './Item.module.css';



export default function Item(props) {

  const [isOnline, setIsOnline] = useState({ isOnline: false })

  useEffect(() => {
    shave('.snippet', 20);
  })

  useEffect(() => {
    setIsOnline({ isOnline: props.isOnline })
  }, [props.isOnline])

  const { photo, name, text } = props.data;

  let statCls = [cls.status]
  if (isOnline.isOnline) { statCls = [cls.status] }
  else { statCls.push(cls.offline) }

  let itemCls = [cls.item]
  if(props.isCurrent) {itemCls.push(cls.active)}
  else {itemCls = [cls.item]}

  return (
    <div className={itemCls.join(' ')} onClick={props.onClick}>
      <div className={cls.holder}>
        <div className={statCls.join(' ')} />
        <img className={cls.photo} src={photo} alt="conversation" />
      </div>
      <div className={cls['conversation-info']}>
        <h1 className={cls.title}>{name}</h1>
        <p className={cls.snippet}>{text}</p>
      </div>
    </div>
  );
}