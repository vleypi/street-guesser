import React from 'react'
import { socket } from '../../../hooks/useAuth'
import {useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import style from '../../../styles/maps.module.css'
import { setGame } from '../../../redux/actions/game'

const Leave = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const history = useHistory()
    const leave = async () =>{
        try{  
            if(state.lobby.lobby){
                let unblock = history.block(tx => {
                    unblock();
                });
                unblock()
                dispatch(setGame(null,null,null,null,null,null))
                socket.emit('leaveLobby',{id: state.profile.id})
                history.replace('/')
            }
        }
        catch(err){}
    }
    return (
        <div className={style.leave}>
            <button onClick={leave}>Exit</button>
        </div>
    )
}

export default Leave
