import React from 'react'
import style from '../styles/lobby.module.css'
import online from '../image/coump/online.png'
import offline from '../image/coump/offline.png'
import z from '../image/z.svg'
import { useHistory, useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { useDispatch, useSelector } from 'react-redux'
import { setLobby } from '../redux/actions/lobby'
import { socket } from '../hooks/useAuth'
import {modes,places} from '../component/Modes/Modes'
import Popup from '../component/Modes/Popup'

const Mode = () => {
    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const profile = useSelector(({profile})=>profile)
    const {request} = useFetch()
    const [searching,setSearching] = React.useState(false)
    React.useEffect(()=>{
        if(modes.findIndex(it=>{return it.mode === params.mode}) === -1 || places.findIndex(it=>{return it.mode === params.mode}) === -1){
            
        }
        else if(places.findIndex(it=>{return it.option === params.option}) === -1 || modes.findIndex(it=>{return it.option === params.option})){
            
        }
    },[modes,places,params])
    const seacrh = async (it) =>{
            setSearching('animationOpen')
            setTimeout(async ()=>{
                try{
                    const data = await request('/api/lobby/search','POST',
                        {
                            name: profile.name,
                            mode: params.mode,
                            option: params.option,
                            game: it
                        },
                        {
                            auth: 'Bearer '+profile.JWT
                        }
                    )
                    await dispatch(setLobby(data.lobby))
                    await socket.emit('connectLobby',{
                        lobby: data.lobby,
                        profile
                    })
                    if(data.lobby.owner === profile.id){
                        socket.emit('startGame',{
                            locs: data.lobby.games.map((it)=>{
                                return it.location
                            }),
                            pls: data.lobby.games.map((it)=>{
                                return {name: it.name, id: it.id}
                            }), 
                            lobby: data.lobby._id,
                            rd: 0,
                            mode: data.lobby.mode,
                            players: data.lobby.users.length,
                            game: it
                        })
                    }
                    setTimeout(()=>{
                        setSearching(false)
                        if(it === 'multi'){
                            history.replace('/home/lobby')
                        }
                        else{
                            history.replace('/home/game')
                        }
                    },180)
                }
                catch(err){
                    setTimeout(()=>{
                        setSearching(false)
                    },150)
                }
            },3000)
    }
    const [popup,setPop] = React.useState({popup: false, reason: ''})
    const popupHandler = (reason) =>{
        setPop({popup: !popup.popup, reason})
    }
    return (
        <>
        {popup.popup && <Popup popup={popup} popupHandler={popupHandler}/>}
        <div className={style.lobby}>
            {searching && 
                <div className={`${searching === 'animationOpen' && style.loaderOpen} ${searching === 'animationClose' && style.loaderClose}`}>
                    <div className={style.loaderContent}>
                        <h2>MapsGuesser</h2>
                        <div className={style.loaderStartExpect}></div>
                    </div>
                </div>
            }
            {!searching && 
            <div className={style.content}>
                <div className={style.compoundContent}>
                <div className={style.infoCompound}>
                    <h1 className={style.compoundMode}>{params.mode.charAt(0).toUpperCase() + params.mode.slice(1)}</h1>
                    <h4 className={style.compoundOption}>{params.option.charAt(0).toUpperCase() + params.option.slice(1)}</h4>
                </div>
                <div className={style.compound}>
                    <div onClick={()=>params.mode == 'BattleRoyale' ? popupHandler('singleAndBattleRoyale') : seacrh('single')} className={style.single}>
                        {params.mode !== 'BattleRoyale' ? 
                            <>
                                <img src={offline} alt='single'/>
                                <p>Single</p>
                            </> :
                            <img style={{maxWidth: '100px'}} src={z} alt='z' />
                        }
                    </div>
                    <div onClick={()=>seacrh('multi')} className={style.multi}>
                        <img src={online} alt="multi"/>
                        <p>Multi</p>
                    </div>
                </div>
                </div>
            </div>}
        </div>
        </>
    )
}

export default Mode
