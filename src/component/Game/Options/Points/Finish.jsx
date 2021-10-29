import React from 'react'
import { socket } from '../../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useFetch} from '../../../../hooks/useFetch'

const Finish = ({style}) => {
    const history = useHistory()
    const {request} = useFetch()
    const loc = useSelector(({game})=>game.loc)
    const id = useSelector(({profile})=>profile.id)
    const rd = useSelector(({game})=>game.rd)
    const [vis,setVis] = React.useState(null)
    React.useEffect(()=>{
        socket.on('endRound',msg=>{
            setVis({info: msg.win,chunk: msg.chunk, name: msg.name, type: 'end'})
        })
        socket.on('win',async  msg=>{
            setVis({info: msg.win,chunk: msg.chunk, name: msg.name, type: 'win'})
        })
    },[])
    React.useEffect(()=>{
        setVis(null)
    },[loc])
    const leave = () =>{
        history.push('/home')
        window.location.reload()
    }
    return (
        <>
        {vis &&
            <div className={style.finish}>
                <div className={style.finishPopUp}>
                        <div className={style.finishContent}>
                            <div className={style.finishCorrect}>
                                <img 
                                    src={'data:image/svg+xml;base64,'+window.btoa(vis.chunk)} 
                                    title={vis.name}
                                />
                            </div>
                            {vis.type === 'win' &&
                                <>
                                {vis.info[0]._id == id ?
                                    <h2>Ты побеждаешь!</h2> :
                                    <h2>{vis.info[0]._id} побеждает!</h2>
                                }
                                </>  
                            }
                            {vis.type === 'end'  &&
                                <h2>Раунд {rd}/10</h2> 
                            }
                            <div className={style.statisticsPoint}>
                                {vis.info.map((it,index)=>(
                                    <div key={it.points+'_'+index}>
                                        <p>{index+1}.{it.name}:</p>
                                        <p>{it.points}</p>
                                    </div>
                                ))}
                            </div>
                            {vis.type === 'win' && 
                                <div className={style.popUpBtns}>
                                    <button onClick={leave}  className={style.leave}>Выйти</button>
                                </div>
                            }
                        </div>
                </div>
            </div>
        }
        </>
    )
}

export default Finish