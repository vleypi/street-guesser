import React from 'react'

const Time = ({vis,history,style}) => {
    const [time,setTime] = React.useState(10)
    React.useEffect(()=>{
        if(time > 0 && vis){
            setTimeout(()=>{
                setTime(time-1)
            },1000)
        }
    },[time])
    return (
        <>
        {vis && <div className={style}>{time}</div>}
        </>
    )
}

export default Time
