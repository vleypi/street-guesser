import React from 'react'
import Players from '../Players'
import { socket } from '../../../../hooks/useAuth'
import { useDispatch } from 'react-redux'
import { guess, roundEndPoints } from '../../../../redux/actions/game'

const Points = ({style}) => {
    const dispatch = useDispatch()
    React.useEffect(()=>{
        socket.on('guessPoints',async msg=>{
            dispatch(guess(msg.id,msg.img,msg.getPts,msg.dis,msg.pts))
        })
        socket.on('endRound',msg=>{
            dispatch(roundEndPoints())
        })
    },[])
    return (
        <div className={style.options}>
            <Players style={style}/>
        </div>
    )
}


export default Points
