import React from 'react'
import { GoogleMap, useLoadScript} from '@react-google-maps/api'
import { useSelector,useDispatch } from 'react-redux'
import Map from './Map/Map'
import style from '../../styles/maps.module.css'
import { setPlayers } from '../../redux/actions/game'
import NoticeHandler from './Options/NoticeHandler/NoticeHandler'
import StreetView from './Map/StreetView'
import FinishBattle from './Options/Battle/Finish'
import FinishPoints from './Options/Points/Finish'
import Panel from './Options/Panel'
import TimeLine from './Options/TimeLine'
import { useHistory } from 'react-router'

const Game = React.memo(() => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const history = useHistory()
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: '',
        language: 'en'
    })
    React.useEffect(()=>{
        history.block()
        dispatch(setPlayers(state.lobby.lobby.users))
    },[])
    return (
        <>
            {isLoaded ?
                <div className={style.game}>
                    <div className={style.maps}>
                        {state.game.mode === 'BattleRoyale' && <FinishBattle style={style}/>}
                        {state.game.mode === 'Points' && <FinishPoints style={style}/>}
                        <TimeLine style={style}/>
                        <NoticeHandler style={style}/>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            zoom={2}

                        >
                            <StreetView />
                        </GoogleMap>
                        <Map style={style}/>
                    </div>
                    <Panel />
                </div> : <div>Loading</div>
            }
        </>
    )
})

export default Game

const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
};
