import React from 'react'
import { socket } from '../../../../hooks/useAuth'
import { useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useFetch} from '../../../../hooks/useFetch'
import Time from '../Time'

const Finish = ({style}) => {
    const history = useHistory()
    const {request} = useFetch()
    const loc = useSelector(({game})=>game.loc)
    const players = useSelector(({game})=>game.players)
    const id = useSelector(({profile})=>profile.id)
    const JWT = useSelector(({profile})=>profile.JWT)
    const [vis,setVis] = React.useState(null)
    React.useEffect(()=>{
        socket.on('endRound',msg=>{
            setVis({info: msg.out.out,chunk: msg.chunk, name: msg.name, type: 'end'})
        })
        socket.on('win',async  msg=>{
            if(players.find((it)=>{return it._id === id}) !== -1 && msg.out.win._id !== id){
                const data = await request('/api/game/results','GET',null,{auth: 'Bearer '+JWT})
                setVis({info: msg.out.win,my: data.result.players[0], chunk: msg.chunk, name: msg.name, type: 'win'})
            }
            else{
                setVis({info: msg.out.win,chunk: msg.chunk, name: msg.name, type: 'win'})
            }
        })
    },[])
    React.useEffect(()=>{
        setVis(null)
    },[loc])
    const leave = () =>{
        history.push('/')
        window.location.reload()
    }

    return (
        <>
        {vis &&
            <div className={style.finish}>
                <div className={`
                    ${vis.type === 'end' && vis.info._id === id && style.finishPopUpRed}
                    ${vis.type === 'end' && vis.info._id !== id && style.finishPopUp}
                    ${vis.type === 'win' && vis.info._id == id && style.finishPopUp}
                    ${vis.type === 'win' && vis.info._id !== id && style.finishPopUpRed}`
                }>
                    {vis.type === 'win' &&
                        <div className={style.finishContent}>
                            <div className={style.finishCorrect}>
                                <img 
                                    src={'data:image/svg+xml;base64,'+window.btoa(vis.chunk)} 
                                    title={vis.name}
                                />
                            </div>
                            {vis.info._id === id ?
                                <h2>Ты побеждаешь!</h2> :
                                <h2>{vis.info.name} побеждает!</h2>
                            }
                            <div className={style.statistics}>
                                {vis.info._id === id &&
                                    <>
                                        <h3>Моя статистика</h3>
                                        <p>Правильных овтетов - {Math.round(vis.info.correct / (vis.info.correct+vis.info.incorrect) * 100) || 0}%</p>
                                        <p>Правильных - {vis.info.correct}</p>
                                        <p>Неправильных - {vis.info.incorrect}</p>
                                    </>
                                }
                                {vis.my  &&
                                    <>
                                        <h3>Моя статистика</h3>
                                        <p>Правильных овтетов - {Math.round(vis.my.correct / (vis.my.correct+vis.my.incorrect) * 100) || 0}%</p>
                                        <p>Правильных - {vis.my.correct}</p>
                                        <p>Неправильных - {vis.my.incorrect}</p>
                                    </>
                                }
                                {vis.info._id !== id && !vis.my &&
                                    <>
                                        <h3>Статистика {vis.info.name}</h3>
                                        <p>Правильных овтетов - {Math.round(vis.info.correct / (vis.info.correct+vis.info.incorrect) * 100) || 0}%</p>
                                        <p>Правильных - {vis.info.correct}</p>
                                        <p>Неправильных - {vis.info.incorrect}</p>
                                    </>
                                }
                            </div>
                            <div className={style.popUpBtns}>
                                <button onClick={leave}  className={style.leave}>Выйти</button>
                            </div>
                        </div>
                    }
                    {vis.type === 'end' &&
                            <div className={style.finishContent}>
                                <div className={style.finishCorrect}>
                                    <img 
                                        src={'data:image/svg+xml;base64,'+window.btoa(vis.chunk)} 
                                        title={vis.name}
                                    />
                                </div>
                                {vis.info._id === id ?
                                    <h2>Ты вылетаешь...</h2> :
                                    <h2>{vis.info.name} вылетает</h2>
                                }
                                <div className={style.statistics}>
                                    <h3>Статистика {vis.info.name}</h3 >
                                    <p>Правильных овтетов - {Math.round(vis.info.correct / (vis.info.correct+vis.info.incorrect) * 100) || 0}%</p>
                                    <p>Правильных - {vis.info.correct}</p>
                                    <p>Неправильных - {vis.info.incorrect}</p>
                                </div>
                                {vis.info._id === id ?
                                    <div className={style.popUpBtns}>
                                        <button onClick={leave} className={style.leave}>Выйти</button>
                                        <p>Следующий раунд через...<Time style={style} vis={vis} history={history}/></p>
                                    </div> :
                                    <div>
                                        <p>Следующий раунд через...<Time style={style} vis={vis} history={history}/></p>
                                    </div>
                                }
                            </div>
                    }
                </div>
            </div>
        }
        </>
    )
}

export default Finish
