import cls from './Sidebar.module.css';
import { withRouter } from "react-router-dom";

export default withRouter(function Item(props) {

    return (
      <div className={cls.tab}>
        <div className={cls.tabcontent}>
            <div className={cls.logo}
            onClick={()=>props.history.push('/')}
            ><img src="/ASU_1.png" width="50" height="50" alt="search button" /></div>
            <button className={cls.button}><img src="/inbox.svg" width="30" height="30" alt="search button" /></button>
            <button className={cls.button}><img src="/messages.png" width="30" height="30" alt="search button" /></button>
            <button className={cls.button}><img src="/calendar.png" width="30" height="30" alt="search button" /></button>
            <div className={cls.bottomTab}>
                <button className={cls.button}><img src="/settings_black.png" width="30" height="30" alt="search button" /></button>
                <button className={cls.button}><img src="/dark_mode.svg" width="30" height="30" alt="search button" /></button>
            </div>
        </div>
      </div>
    );
})