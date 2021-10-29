import React from 'react'
import { useSelector } from 'react-redux'
import { socket } from '../../../hooks/useAuth'
import style from '../../../styles/maps.module.css'

const TimeLine = () => {
    const game = useSelector(({game})=>game)
    const [initialTime,setInitialTime] = React.useState(0)
    const [time,setTime] = React.useState(0)
    const [dif,setDif] = React.useState(new Date().getTime()-game.time)  
    React.useEffect(()=>{
        if(time > 0){
            setTimeout(()=>{
                setTime(initialTime - ((Date.now()-dif) - game.time))
                console.log(time)
            },50)
        }
    },[time])
    React.useEffect(()=>{
        if(game.mode === 'Points'){
            setInitialTime(120000)
            setTime(120000)
        }
        else if(game.mode === 'BattleRoyale'){ 
            setInitialTime(260000)
            setTime(260000 * (1 - ((game.rd) * 0.1)))
        }
    },[game.loc])
    React.useEffect(()=>{
        socket.on('endRound',msg=>{
            setTime(0)
        })
    },[])
    return (
        <>
        {time > 0 ?
            <>
                <div className={style.time}>
                    <p>Режим - {game.mode}</p>
                    <p>Раунд - {game.rd}</p>
                    <p>{new Date(time).getMinutes()}:{new Date(time).getSeconds()}</p>
                </div>
                <div className={style.deadLine}>
                    <div style={{width: `${(time / initialTime)*100}%`}} className={style.line}></div>
                </div>
            </> :
            <></>
        }
        </>
    )
}

export default TimeLine
