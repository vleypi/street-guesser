import React from 'react'
import style from '../../styles/warn.module.css'

const ConfirmWarn = () => {
    const [highlight,setHighlight] = React.useState(false)
    React.useEffect(()=>{
        window.addEventListener('scroll',(e)=>{
            if(window.pageYOffset === 0){
                setHighlight(true)
                setTimeout(()=>{
                    setHighlight(false)
                },3000)
            }
        })
    }, [])
    return (
        <div className={`${style.ConfirmWarn} ${highlight && style.ConfirmWarnHigh}`}>
            <p>We’ll send you a confirmation email to verify that the address is correct. If you don't confirm your email, your account will be deleted after in one hour. </p>
        </div>
    )
}

export default ConfirmWarn
