import React from 'react'
import { useFetch } from '../hooks/useFetch'
import randomStreetView from 'random-streetview'
import { useSelector } from 'react-redux'


const Test = () => {
    const {request} = useFetch()
    const state = useSelector(state=>state)
    const start = async () =>{
            for(let k=0;1000 > k;k++){
                const games = await request('/api/game/make','GET',null,{auth: 'Bearer '+state.profile.JWT})
                await randomStreetView.setHighCpuUsage()
                await randomStreetView.setParameters({
                    enableCaching: false
                })
                const locations = []
                for(let i=0;1 > i;i++){
                    await randomStreetView.setParameters({
                        polygon: games.game[i]
                    })
                    const location = await randomStreetView.getRandomLocation()
                    await request('/api/game/test','POST',{
                        location: location,
                        name: games.places[i].name,
                        id: games.places[i].id,
                    },{auth: 'Bearer '+state.profile.JWT})
                }
            }
    }
    return (
        <button style={{fontSize: '50px', color: 'white',background: 'red', 'border': 0, 'marginTop': '20px','cursor': 'pointer', borderRadius: '20px'}} onClick={start}>
            Make
        </button>
    )
}

export default Test
