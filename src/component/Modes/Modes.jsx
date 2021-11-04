import React from 'react'
import { useHistory,useLocation } from 'react-router'
import {useDispatch,useSelector} from 'react-redux'
import style from '../../styles/modes.module.css'
import Popup from './Popup'

export const modes = [
    {nameMode: 'Battle Royale',name: 'World', option: 'world',mode: 'BattleRoyale'},
    {nameMode: 'Battle Distance',name: 'World',option: 'world',mode: 'Points'},
]
export const places = [
    {name: 'World', option: 'world', mode: 'Points', id: 'world'},
    {name: 'Italy', option: 'it',mode: 'Points'},
    {name: 'Russia', option: 'ru',mode: 'Points'},
    {name: 'Germany', option: 'de',mode: 'Points'},
    {name: 'France', option: 'fr',mode: 'Points'},
    {name: 'USA',option: 'us',mode: 'Points'},
    {name: 'Spain',option: 'es',mode: 'Points'},
    {name: 'All countries', option: '/countries'}
]

const Modes = () => {
    const profile = useSelector(({profile})=>profile)
    const lobby = useSelector(({lobby})=>lobby.lobby)
    const history = useHistory()
    const dispatch = useDispatch()
    const [popup,setPop] = React.useState({popup: false, reason: ''})
    const routes = async (it) =>{
        if(lobby){
            setPop({popup: true,reason: 'lobby'})
        }
        else if(profile.isActivated){
            if(it.option === '/countries'){
                history.push('/countries')
            }
            else{
                history.push(`/create/${it.mode}/${it.name}`)
            }
        }
        else if(!profile.JWT){
            setPop({popup: true,reason: 'signin'})
        }
        else{
            setPop({popup: true,reason: 'activate'})
        }
    }
    const popupHandler = (reason) =>{
        setPop({popup: !popup})
    }

    return (
        <>
        {popup.popup && <Popup popup={popup} popupHandler={popupHandler}/>}
        <div className={style.start}>
            <section className={style.mode}>
                {modes.map((it,index)=>(
                    <div key={it.mode+'_'+it.id+'_'+index} onClick={()=>routes(it)}>
                        <p>{it.nameMode}</p>
                    </div>
                ))}
            </section>
            <section className={style.places}>
                {places.map((it,index)=>(
                    <div className={style.modes}  key={it.mode+'_'+it.id+'_'+index} onClick={()=>routes(it)} >
                        <p>{it.name} <span></span></p>
                    </div>
                ))}
            </section>
        </div>
        </>
    )
}

export default Modes
