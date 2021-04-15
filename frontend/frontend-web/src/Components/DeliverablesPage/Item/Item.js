import { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import Countdown from 'react-countdown';
import cls from './Item.module.css';

function Page(props) {

    let ele = props.location.state.data;
    const [timer, setTimer] = useState(null)
    const onClickHandler = () => {
        setTimer(<Countdown className={cls.timer} date={Date.now() + ele.leeway.slice(0, ele.leeway.indexOf(' ')) * 60 * 1000}>
            <div className={cls.timer}>Time's up, Bucko!</div>
        </Countdown>)
    }

    return (
        <div className={cls.page}>
            <button className={cls.button} onClick={() => props.history.push('/')}><h2><b>Go Back...</b></h2></button>
            <div>
                <h1> This is "{ele.name}" {ele.type} from "{ele.course}" course</h1>
                {ele.type === 'Quiz' ? <h2><b>Allowed time: {ele.leeway}</b></h2> : ""}
                {ele.type === 'Quiz' ? <button className={cls.button} onClick={onClickHandler}><h2><b>Begin!</b></h2></button> : ""}
                {timer}
            </div>
        </div>
    )
}

export default withRouter(Page);