import React from 'react'
import { socket } from '../../../../hooks/useAuth'
import {useDispatch } from 'react-redux'
import { guessed, notGuessed, playerOut, roundEndBattle} from '../../../../redux/actions/game'
import Players from '../Players'
import NotGuessed from '../NotGuessed'

const Battle = ({style}) => {
    const dispatch = useDispatch()
    React.useEffect(()=>{
        socket.on('notguessed',async msg=>{
            dispatch(notGuessed(msg.id,msg.img,msg.getPts,msg.dis,msg.pts))
        })
        socket.on('guessed',msg=>{
            dispatch(guessed(msg.id,msg.img,msg.getPts,msg.dis,msg.pts))
        })
        socket.on('endRound',msg=>{
            dispatch(playerOut(msg.out.out._id))
            dispatch(roundEndBattle())
        })
    },[])
    return (
        <div className={style.options}>
            <NotGuessed style={style}/>
            <Players style={style}/>
        </div>
    )
}


export default Battle
