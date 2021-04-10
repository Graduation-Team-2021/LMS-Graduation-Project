import cls from './Sidebar.module.css';


export default function Item(props) {

  let tabCls = [cls.tab]

  if (props.showSState) {tabCls = [cls.tab];}
  else {tabCls.push(cls.tabClosed)}
  

  const USER_NAME = "John Jacobs"
    return (
      <div className={tabCls.join(' ')}>
        <div className={cls.tabcontent}>
            <div className={cls.welcome}>Welcome, <b>{USER_NAME}</b>!</div>
            <div className={cls.slot}><img src="/dashboard_white.svg" width="30" height="30" alt="Overview" /><div className={cls.text}>Overview</div></div>
            <div className={cls.slot}><img src="/assignment_white.svg" width="30" height="30" alt="Deliverables" /><div className={cls.text}>My Deliverables</div></div>
            <div className={cls.slot}><img src="/group_white.svg" width="30" height="30" alt="My Team" /><div className={cls.text}>My Team</div></div>
            <div className={cls.slot}><img src="/logout_white.svg" width="30" height="30" alt="Logout" /><div className={cls.text}>Logout</div></div>
        </div>
      </div>
    );
}