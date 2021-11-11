import React from 'react'
import { useSelector } from 'react-redux'
import style from '../../../styles/maps.module.css'
import correct from '../../../image/check.png'
import Avatar from '../../General/Avatar'

const Players = () => {
    const state = useSelector(state => state)
    return (
        <div className={style.players}>
        <h2 style={{textAlign: 'center'}}>Players</h2>
        {state.game.players.map((it,index)=>(
            <div className={style.playerGame} key={it.id+'_'+index}>                 
                    <div className={style.playerNameAvatar}>
                        <Avatar profile={it}/>
                        <div>
                            <p className={style.playerName}>{it.name}</p>
                            {state.game.mode === 'BattleRoyale' && <p className={style.playerPts} style={{color: it.points < 0 && 'red'}}>{it.points}</p>}
                        </div>
                    </div>
                    {state.game.mode === 'BattleRoyale' &&
                    <div className={style.playerGuessed}>
                    {it.tries.map((it2,index)=>(
                        <>
                        {it2.type === 'notguessed' ?
                            <img 
                                key={it.id+'_'+index+'_'+it2.img.name}
                                className={style.playerCountries}
                                src={'data:image/svg+xml;base64,'+window.btoa(it2.img.chunk)} 
                                title={it2.img.name}
                            /> :
                            <img 
                                key={it.id+'_'+index+'_'+it2.img.name}
                                className={style.playerCountries}
                                src={correct} 
                                title="correct"
                            />
                        }
                        </>
                    ))}
                    {Array(3 - it.tries.length).fill(<div className={style.emptyGap}></div>)}
                    </div>}
                    {state.game.mode === 'Points' && <p className={style.playerPts} style={{color: it.points < 0 && 'red'}}>{it.points}</p>}
                </div>
        ))}
        </div>
    )
}

export default Players
