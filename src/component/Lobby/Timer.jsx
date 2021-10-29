import React from 'react'
import {socket} from '../../hooks/useAuth'


const Timer = React.memo(({style}) => {
    const [timer,setTimer] = React.useState(null)
    React.useEffect(()=>{
        socket.on('timetTo',msg=>{
            setTimer(msg)
        })
    },[])
    return (
        <div className={style.TimeToStart}>
            <h3>Start In</h3>
            {timer ? <p>{timer}</p> : <div className={style.loaderStart}></div>}
        </div>
    )
})

export default Timer
