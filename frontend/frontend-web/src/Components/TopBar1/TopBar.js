import cls from './TopBar.module.css';


export default function Bar(props) {

  return (
    <div className={cls.tab}>
      <button className={cls.button} onClick={props.showS}><img src="/menu.svg" width="50" height="50" alt="open toolbar" /></button>
      <button className={cls.avatar}><img className={cls.img} src="/erwin.png" width="50" height="50" alt="profile" /></button>
    </div>
  );
}