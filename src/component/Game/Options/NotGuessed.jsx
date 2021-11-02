import React from 'react'
import { useSelector } from 'react-redux'

const NotGuessed = ({style}) => {
    const state = useSelector(state => state)
    const tries = state.game.players.map((it)=>{
        return it.tries.map((it2)=>{
            return it2
        })
    })
    const notGuessed = [...new Set(tries.flat(1).filter((it)=>{return it.type === 'notguessed'}).map((it)=>{
        return it.img.chunk
    }))]
    return (
        <div className={style.notGuessed}>
            <h3>Failed attempts:</h3>
            <div className={style.attemptGame}>
                {notGuessed.map((it,index)=>(
                    <img 
                        key={tries.flat(1).find((img)=>{return img.img.chunk === it}).img.name+'_'+index}
                        className={style.playerCountries}
                        src={'data:image/svg+xml;base64,'+window.btoa(it)} 
                        title={tries.flat(1).find((img)=>{return img.img.chunk === it}).img.name}
                    />
                ))}
           </div>       
        </div>
    )
}

export default NotGuessed
