import React from 'react'
import { StreetViewPanorama } from '@react-google-maps/api'
import { useSelector } from 'react-redux'

const StreetView = React.memo(() => {
    const state = useSelector(({game}) => game.loc)
    return (
        <StreetViewPanorama
            position={{lat: state[0],lng: state[1]}}
            visible={true}
            options={{showRoadLabels: false,linksControl: false,fullscreenControl: false,fullscreenControlOptions: false,enableCloseButton: false,disableDefaultUI: true}}
        />
    )
})

export default StreetView
