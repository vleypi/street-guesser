import React from 'react'
import { socket } from '../../../../hooks/useAuth'
import { useSelector } from 'react-redux'

const Notice = ({style,it,state}) => {
    const [visible,setVisible] = React.useState(true)
    React.useEffect(()=>{
       setTimeout(()=>{
        setVisible(false)
       },4000) 
    },[])
    return (
        <>  
            {visible &&
            <>
                {it.type === '404' && 
                    <div>
                        <h2>404</h2>
                        <p>Такая Страна не найдена</p>
                    </div>
                }
                {it.type === 'been' && 
                    <div>
                        <h2>Кто-то уже делал выбор <span>{it.info}</span>!</h2>
                    </div>
                }
                {it.type === 'correct' && 
                    <div style={{background: 'linear-gradient(0deg, rgba(0,144,75,1) 0%, rgba(183,255,195,1) 100%)'}}>
                        <h2>Поздравляю, <span>{it.info}</span> правильный ответ!</h2>
                    </div>
                }
                {it.type === 'incorrect' && 
                    <div>
                        <h2>Неверно, <span>{it.info}</span> неправильный ответ!</h2>
                    </div>
                }
                {it.type === 'guesspts' &&
                    <div style={{background: it.info.dis < 4001 && 'linear-gradient(0deg, rgba(0,144,75,1) 0%, rgba(183,255,195,1) 100%)'}}>
                        {it.info.dis > 4000 ?
                            <h2>Полученно поинтов {it.info.getPts}. Точность - {it.info.dis}км. Стрна - {it.info.pls.name}!</h2> :
                            <h2>Полученно поинтов {it.info.getPts}. Точность - {it.info.dis}км. Стрна - {it.info.pls.name}</h2>
                        }
                    </div>
                }
            </>
            }   
        </>
    )
}

export default Notice
