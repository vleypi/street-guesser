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
                <h2>MapsGuesser <span>Warning</span></h2>
                <h3>Вы уже находитесь в <span>LOBBY#{state.profile.warn}</span></h3>
                <p>Чтобы продолжить, вам нужно выйти с него, в другом браузере/окне.</p>
                <p>Если вы считаете, что это ошибка - нажмите на кнопку "Выйти с Лобби",</p>
                <p>при это вы автоматически выйдите с <span>LOBBY#{state.profile.warn}</span></p>
                <div>
                    <button disabled={disabled} onClick={updateWarn}>Обновить</button>
                    <button disabled={disabled} onClick={quitLobby}>Выйти с Лобби</button>
                </div>
            </div>
        </div>
    )
}

export default Warn
