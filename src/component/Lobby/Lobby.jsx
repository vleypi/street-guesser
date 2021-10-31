import React from 'react'
import { useSelector } from 'react-redux'
import add from '../../image/add.svg'
import Users from './Users'
import {useHistory} from 'react-router-dom'
import Timer from './Timer'

const Lobby = React.memo(({style}) => {
    const lobby = useSelector(({lobby})=>lobby.lobby)
    const history = useHistory()
    React.useEffect(()=>{
        if(!lobby){
            history.push('/')
        }
    },[lobby])
    return (
        <>
        {lobby &&
        <div className={style.lobbyExpect}>
            <h2>{lobby.mode.charAt(0).toUpperCase() + lobby.mode.slice(1)}</h2>
            <h4>{lobby.option.charAt(0).toUpperCase() + lobby.option.slice(1)}</h4>
            <div className={style.lobbyPlayers}>
                {lobby.users.map((it,index)=>(
                    <Users key={it._id+'_'+index} style={style} it={it} />
                ))}
                {Array(10 - lobby.users.length).fill(0).map((_, i) => (
                    <div key={i+'_field'} className={style.lobbyPlayer}>
                    </div>
                ))}
            </div>
            <Timer style={style}/>
        </div>
        }
        </>
    )
})

export default Lobby
