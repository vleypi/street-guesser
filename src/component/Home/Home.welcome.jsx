import React from 'react'

const HomeWelcome = ({style}) => {
    const modes = ['с друзьями', 'в одиночку','местность','новые страны','популярные места']
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
            <h2>Добро пожаловать в <span>MapsGuesser!</span></h2>
            <p>Угадывайте <span className={animation ? style.animation : ''}>{modes[mode === 5 ? 0 : mode]}</span> , получайте удовольствие</p>
        </div>
    )
}

export default HomeWelcome
