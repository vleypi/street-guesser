import React from 'react'
import menu from '../../../image/12.png'
import { useSelector } from 'react-redux'
import style from '../../../styles/maps.module.css'
import Battle from './Battle/Battle'
import Points from './Points/Points'
import Leave from './Leave'


const Panel = () => {
    const state = useSelector(state=>state)
    const [show,setShow] = React.useState(false)
    return (
        <>
        <div onClick={()=>setShow(!show)} className={`${style.showPan} ${show && style.showPanTrue}`}>
            <img src={menu} />
        </div>
        <div className={`${style.panel} ${show && style.panelShow}`}>
            {state.game.mode === 'BattleRoyale' && <Battle style={style} state={state}/>}
            {state.game.mode === 'Points' && <Points style={style} state={state}/>}
            <Leave />
        </div>
        </>
    )
}


export default Panel
