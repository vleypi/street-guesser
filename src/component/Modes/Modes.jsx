import React from 'react'
import { useHistory,useLocation } from 'react-router'
import {useDispatch,useSelector} from 'react-redux'
import style from '../../styles/modes.module.css'
import Popup from './Popup'

export const modes = [
    {name: 'Battle Royale',option: 'world',mode: 'BattleRoyale'},
    {name: 'Battle Distance',option: 'world',mode: 'Points'},
    
]
export const places = [
    {name: 'World', option: 'world', mode: 'Points'},
    {name: 'Italy', option: 'italy',mode: 'Points'},
    {name: 'Russia', option: 'russia',mode: 'Points'},
    {name: 'Germany', option: 'germany',mode: 'Points'},
    {name: 'France', option: 'france',mode: 'Points'},
    {name: 'USA', option: 'United States of America',mode: 'Points'},
    {name: 'Spain', option: 'spain',mode: 'Points'},
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
            history.push('/create/'+it.mode+'/'+it.option)
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
                    <div key={it.mode+'_'+it.option+'_'+index} onClick={()=>routes(it)}>
                        <p>{it.name}</p>
                    </div>
                ))}
            </section>
            <section className={style.places}>
                {places.map((it,index)=>(
                    <div className={style.modes}  key={it.mode+'_'+it.option+'_'+index} onClick={()=>routes(it)} >
                        <p>{it.name} <span></span></p>
                    </div>
                ))}
            </section>
        </div>
        </>
    )
}

export default Modes
