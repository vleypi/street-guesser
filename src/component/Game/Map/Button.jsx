import React from 'react'
import { useSelector } from 'react-redux'
import {socket} from '../../../hooks/useAuth'
import {useFetch} from '../../../hooks/useFetch'

const Button = ({markers,style}) => {
    const state = useSelector(state => state)
    const {request} = useFetch()
    const [disabled,setDisabled] = React.useState(false)
    const [attempts,setAttenpts] = React.useState(false)
    const me = state.game.players.find((it)=>it._id === state.profile.id)
    let timeout;
    const guess = async () =>{
            setDisabled(true)
            const data = await request('/api/game/guess','POST',{
                lobby: state.lobby.lobby._id,
                lat1: markers[0].lat,
                lng1: markers[0].lng,
                lat2: state.game.loc[0],
                lng2: state.game.loc[1],
            },{auth: 'Bearer '+state.profile.JWT})
            if(state.game.mode === 'BattleRoyale'){
                socket.emit('guessBattle',{
                    loc: state.game.loc,
                    locs: state.game.locs,
                    rd: state.game.rd,
                    mode: state.game.mode,
                    id: state.profile.id,
                    name: state.profile.name,
                    pts: data.points,
                    getPts: data.getPoints,
                    dis: data.getDistance,
                    pls: state.game.pls,
                    mark: [markers[0].lat, markers[0].lng],
                    players: state.game.players.length,
                    been: state.game.players.map((it)=>{
                        return it.tries
                    }).flat(1).filter(it=>{return it.type !== 'guessed'}).map(it=>{
                        return it.img.name
                    })
                })
            }
            else if(state.game.mode === 'Points'){
                socket.emit('guessPoints',{
                    loc: state.game.loc,
                    locs: state.game.locs,
                    rd: state.game.rd,
                    mode: state.game.mode,
                    id: state.profile.id,
                    name: state.profile.name,
                    pts: data.points,
                    getPts: data.getPoints,
                    dis: data.getDistance,
                    pls: state.game.pls,
                    mark: [markers[0].lat, markers[0].lng],
                    players: state.game.players,
                })
            }
            timeout = setTimeout(()=>{
                setDisabled(false)
            },2000)
    }
    React.useEffect(()=>{
        if(me){
            if(state.game.mode === 'BattleRoyale' && me.tries.length > 2 || me.tries.findIndex(it=>{return it.type === 'guessed'}) !== -1){
                clearTimeout(timeout)
                setAttenpts(true)
            }
            else if(me.tries.length > 0 && state.game.mode === 'Points'){
                clearTimeout(timeout)
                setAttenpts(true)
            }
        }
    },[state.game.players])
    React.useEffect(()=>{
        socket.on('roundGame',msg=>{
            setAttenpts(false)
            setDisabled(false)
        })
    },[])
    return (
        <>
        {!attempts &&
            <>
                {markers[0] && me && <button disabled={disabled || attempts} style={{cursor:disabled || attempts && 'no-drop'}} onClick={guess} className={style.guessBtn}>Guess</button> }
            </>
        }
        </>
    )
}

export default Button
