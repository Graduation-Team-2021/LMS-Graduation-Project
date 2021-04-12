import {useEffect} from 'react';
import shave from 'shave';
import cls from './Item.module.css';



export default function Item(props) {
  useEffect(() => {
    shave('.snippet', 20);
  })

    const { photo, name, text } = props.data;

    return (
      <div className={cls.item} onClick={props.onClick}>
        <img className={cls.photo} src={photo} alt="conversation" />
        <div className={cls['conversation-info']}>
          <h1 className={cls.title}>{ name }</h1>
          <p className={cls.snippet}>{ text }</p>
        </div>
      </div>
    );
}