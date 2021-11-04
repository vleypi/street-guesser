import React from 'react'
import { useSelector } from 'react-redux'
import { GoogleMap, Marker, Polyline,Polygon } from '@react-google-maps/api'
import markerIcon from '../../../image/marker.png'
import redmarkerIcon from '../../../image/redMarker.png'
import Button from './Button'
import { socket } from '../../../hooks/useAuth'

const Map = ({style}) => {
    const state = useSelector(state=>state)
    const [zoomMap] = React.useState(3)
    const [centerMap] = React.useState({lat: 0, lng: 0})
    const [markers,setMarkers] = React.useState([])
    const [open,setOpen] = React.useState({size: false, open: false})
    const putMarker = (e) =>{
        if(markers.length < 2){
            setMarkers([{lat: e.latLng.lat(), lng: e.latLng.lng(),marker: markerIcon}])
        }
    }
    React.useEffect(()=>{
        setMarkers([])
    },[state.game.loc])
    React.useEffect(()=>{
        socket.on('guessPts',msg=>{
            setMarkers(p=>[...p,{lat: msg.loc[0], lng: msg.loc[1],marker: redmarkerIcon}])
        })
    },[])
    React.useEffect(()=>{
        if(window.innerWidth < 981){
            setOpen({...open, size: true})
        }
        window.addEventListener('resize',()=>{
            if(window.innerWidth < 981){
                setOpen({...open, size: true})
            }
            else{
                setOpen({...open, size: false})
            }
        })
    },[])
    const options = {
        strokeColor: '#3498db',
        strokeOpacity: 0.8,
        fillColor: '#3498db',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        zIndex: 1
    };
      
    return (
        <>
        <div className={`${style.guessMaps} ${open.size && open.open && style.guessMapsOpen}`}>
            <GoogleMap
                zoom={zoomMap}
                center={centerMap}
                onClick={putMarker}
                mapContainerStyle={mapContainerStyleMap}
                options={{streetViewControl: false,scrollwheel: true,mapTypeControl: false,fullscreenControl: false,disableDefaultUI: true, draggableCursor: 'crosshair', draggingCursor: 'crosshair'}}
            >
                {markers.length > 0 &&
                    markers.map((marker)=>(
                        <Marker 
                            key={marker.lat}
                            position={{lat: marker.lat,lng: marker.lng}}
                            icon={{
                                url: marker.marker
                            }}
                        />
                    ))
                }
                {markers.length > 1 &&
                    <Polyline
                        path={[
                            {lat: markers[0].lat, lng: markers[0].lng},
                            {lat: markers[1].lat, lng: markers[1].lng},
                          ]}
                        options={options}
                    />
                }
            </GoogleMap>
            <Button markers={markers} style={style} state={state}/>
        </div>
        <button onClick={()=>setOpen({...open, open: !open.open})} className={style.openMaps}>
            {open.open ?
                 'Close open':
                'Open map'
            }
        </button>
        </>
    )
}

export default Map

const mapContainerStyleMap = {
    height: "900px",
    width: "900px",
    cursor: 'crosshair'
};