import React from 'react'

const HomeWelcome = ({style}) => {
    const modes = ['with friends', 'alone','the terrain','new countries','popular places']
    const [mode,setMode] = React.useState(0)
    const [animation,setAnimation] = React.useState(true)
    React.useEffect(()=>{
        setTimeout(()=>{
            setAnimation(false)
        },1000)
        setTimeout(()=>{
            if(mode === 4){
                setAnimation(true)
                setMode(0)
            }
            else{
                setAnimation(true)
                setMode(p=>p+1)
            }
        },3500)
    },[mode])
    return (
        <div className={style.welcome}>
            <h2>Welcome to <span>StreetGuesser!</span></h2>
            <p>Guess  <span className={animation ? style.animation : ''}>{modes[mode === 5 ? 0 : mode]}</span> and have fun</p>
        </div>
    )
}

export default HomeWelcome
