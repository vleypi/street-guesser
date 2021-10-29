import React from 'react'
import { useHistory } from 'react-router'
import style from '../../styles/question.module.css'
import question from '../../image/question.png'

const Question = React.memo(() => {
    const history = useHistory()
    const [promt,setPrompt] = React.useState(false)
    const ref = React.useRef()
    React.useEffect(()=>{
        ref.current.addEventListener('mouseover',()=>{
            setPrompt(true)
        })
        ref.current.addEventListener('mouseout',()=>{
            setPrompt(false)
        })
    },[])
    return (
        <>
            {promt && <div className={style.prompt}>Что такое <span>MapsGuesser?</span></div>}
            <img ref={ref} src={question} onClick={()=>history.push('/rules')} className={style.question} alt="question"/>
        </>
    )
})

export default Question
