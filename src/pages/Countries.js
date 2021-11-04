import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import CountriesLIST from '../component/Countries/CountriesLIST'
import CountriesSVG from '../component/Countries/CountriesSVG'
import InfoCountries from '../component/Countries/InfoCountries'
import style from '../styles/countries.module.css'

const Countries = () => {
    const lobby = useSelector(({lobby})=>lobby.lobby)
    const history = useHistory()
    React.useEffect(()=>{
        if(lobby){
            history.replace('/')
        }
    },[])
    return (
        <>
        <div className={style.countries}>
            <div className={style.countriesContent}>
                <CountriesSVG />
                <CountriesLIST />
            </div>
            <InfoCountries />
        </div>
        </>
    )
}

export default Countries
