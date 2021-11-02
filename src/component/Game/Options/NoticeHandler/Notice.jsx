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
                        <p>Country not found</p>
                    </div>
                }
                {it.type === 'been' && 
                    <div>
                        <h2>Someone has already chosen <span>{it.info}</span>!</h2>
                    </div>
                }
                {it.type === 'correct' && 
                    <div style={{background: 'linear-gradient(0deg, rgba(0,144,75,1) 0%, rgba(183,255,195,1) 100%)'}}>
                        <h2>Correct, <span>{it.info}</span></h2>
                    </div>
                }
                {it.type === 'incorrect' && 
                    <div>
                        <h2>Incorrect, <span>{it.info}</span> is the wrong answer</h2>
                    </div>
                }
                {it.type === 'guesspts' &&
                    <div style={{background: it.info.dis < 4001 && 'linear-gradient(0deg, rgba(0,144,75,1) 0%, rgba(183,255,195,1) 100%)'}}>
                        {it.info.dis > 4000 ?
                            <h2>Received {it.info.getPts} points. Accuracy: {it.info.dis}km. Country: {it.info.pls.name}!</h2> :
                            <h2>Received {it.info.getPts} points. Accuracy: {it.info.dis}km. Country: {it.info.pls.name}</h2>
                        }
                    </div>
                }
            </>
            }   
        </>
    )
}

export default Notice
