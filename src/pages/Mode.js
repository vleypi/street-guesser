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
import { countriesList } from '../component/Countries/CountriesLIST'

const Mode = () => {
    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const profile = useSelector(({profile})=>profile)
    const {request} = useFetch()
    const [searching,setSearching] = React.useState(false)
    const country = async () =>{
        try{
            
        }
        catch(err){
            console.log(err)
        }
    }
    React.useEffect(()=>{
        if(countriesList.findIndex(it=>it.name === params.option) === -1){
            history.replace('/404')
        }
        else if(modes.findIndex(it=>it.mode === params.mode) === -1){
            history.replace('/404')
        }
        else if(params.mode === 'BattleRoyale' && params.option !== 'World'){
            history.replace('/404')
        }
        else{

        }
    },[modes,places,params])

    const seacrh = async (it) =>{
            history.block()
            setSearching('animationOpen')
            setTimeout(async ()=>{
                try{
                    const data = await request('/api/lobby/search','POST',
                        {
                            name: profile.name,
                            shortid: profile.shortid,
                            avatar: profile.avatar,
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
                            game: it,
                            _id: profile.id
                        })
                    }
                    setTimeout(()=>{
                        const unblock = history.block(()=>{
                            unblock()
                        })
                        setSearching(false)
                        if(it === 'multi'){
                            unblock()
                            history.replace('/lobby')
                        }
                        else{
                            unblock()
                            history.replace('/game')
                        }
                    },800)
                }
                catch(err){
                    const unblock = history.block(()=>{
                        unblock()
                    })
                    setTimeout(()=>{
                        unblock()
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
                        <h2>StreetGuesser</h2>
                        <div className={style.loaderStartExpect}></div>
                    </div>
                </div>
            }
            {!searching && 
            <div className={style.content}>
                <div className={style.compoundContent}>
                <div className={style.infoCompound}>
                    <h1 className={style.compoundMode}>{params.mode}</h1>
                    <h4 className={style.compoundOption}>{params.option}</h4>
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
