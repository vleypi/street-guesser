import React from 'react'
import style from '../../styles/warn.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useFetch } from '../../hooks/useFetch'
import { socket } from '../../hooks/useAuth'
import { setProfile, setWarn } from '../../redux/actions/profile'

const Warn = () => {
    const [disabled,setDisabled] = React.useState(false)
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const {request} = useFetch()
    const quitLobby = async () =>{
        try{
            setDisabled(true)
            const data = await request('/api/lobby/deleteWarn','PATCH',null,{auth: 'Bearer '+state.profile.JWT})
            if(data.lobby){
                socket.emit('warnKick',{lobby: data.lobby,owner: data.owner ? data.owner : null,id: state.profile.id})
                dispatch(setWarn(null))
            }
            else if(!data.lobby){
                dispatch(setWarn(null))
            }
            setTimeout(()=>{
                setDisabled(false)
            },1500)
        }
        catch(err){
            console.log(err)
        }
    }
    const updateWarn = async () =>{
        try{
            setDisabled(true)
            const data = await request('/api/auth/profile','GET',null,{auth: 'Bearer '+state.profile.JWT})
            await dispatch(setProfile(state.profile.JWT,state.profile.id,data.name,data.premium,data.check,data.isActivated))
            setTimeout(()=>{
                setDisabled(false)
            },1500)
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className={style.warn}>
            <div className={style.info}>
                <h2>StreetGuesser <span>Warning</span></h2>
                <h3>You are already in <span>LOBBY#{state.profile.warn}</span></h3>
                <p>To continue, you need to log out of it, in a different browser / window.</p>
                <p>If you think this is a mistake, click the "Exit Lobby" button</p>
                <div>
                    <button disabled={disabled} onClick={updateWarn}>Refresh</button>
                    <button disabled={disabled} onClick={quitLobby}>Exit the lobby</button>
                </div>
            </div>
        </div>
    )
}

export default Warn
