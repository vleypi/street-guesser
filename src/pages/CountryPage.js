import React from 'react'
import { useHistory, useParams } from 'react-router'
import { useFetch } from '../hooks/useFetch'
import { countriesList } from '../component/Countries/CountriesLIST'
import style from '../styles/counPage.module.css'
import { NavLink } from 'react-router-dom'
import Avatar from '../component/General/Avatar'
import mark from '../image/marker.png'
import hearth from '../image/hearth.svg'
import played from '../image/played.svg'
import Loader from '../component/General/Loader'
import Score from '../component/CounPage/Score'

const CountryPage = () => {
    const params = useParams()
    const {request} = useFetch()
    const history = useHistory()
    const [statePage,setStatePage] = React.useState(null)
    let examination = countriesList.find(it=>it.name === params.name)
    React.useEffect(()=>{
        const country = async () =>{
            try{
                if(examination){
                    const data = await request(`/api/game/country/${params.name}`, 'GET',null)
                    setStatePage({...data})
                }
                else{
                    history.replace('/404')
                }
            }
            catch(err){
                console.log(err)
            }
        }
        country()
    },[])
    return (
        <>
            <main className={style.countryPage}>
                <div className={style.content}>
                    <div className={style.contentStatInfo}>
                        <section className={style.mainInfo}>
                            <img src={examination ? examination.img : countriesList[0].img} />
                            <div>
                                <h1>{statePage ? statePage.country : examination ? examination.name : 'none'}</h1>
                                <p>{statePage ? statePage.description : 'Loading...'}</p>
                            </div>
                        </section>
                        <section className={style.stats}>
                            {statePage ?
                                <div className={style.statsItem}>
                                    <Score score={statePage.statistics.scoreAVG}/>
                                    <div>
                                        <p>{statePage.statistics.scoreAVG}</p>
                                        <p>AVG Score</p>
                                    </div>
                                </div > : 
                                <Loader />
                            }
                            {statePage ?
                                <div className={style.statsItem}>
                                    <img src={played} />
                                    <div>
                                        <p>{statePage.statistics.played}</p>
                                        <p>Played</p>
                                    </div>
                                </div> :
                                <Loader />
                            }
                            {statePage ?
                                <div className={style.statsItem}>
                                    <img src={mark} />
                                    <div>
                                        <p>{statePage.statistics.places}+</p>
                                        <p>Places</p>
                                    </div>
                                </div>:
                                <Loader />
                            }
                            {statePage ?
                                <div className={style.statsItem}>
                                    <img src={hearth} />
                                    <div>
                                        <p>0</p>
                                        <p>Likes</p>
                                    </div>
                                </div> :
                                <Loader />
                            }
                        </section>
                    </div>
                    <section className={style.sectionBtn}>
                        <button 
                            className={style.playBtn}
                            onClick={()=>history.push('/create/Points/'+statePage.country+'')}
                        >
                            Play
                        </button>
                    </section>
                    <section className={style.lastResults}>
                        <h2>Last results</h2>
                        <ul className={`${!statePage && style.loaderPlayers}`}>
                            {statePage ?
                            <>
                            <li>
                                <div>
                                    <Avatar profile={{avatar: {icon: '#ff0000',back: '#fdff8a'}}}/>
                                    <NavLink to="/profile">Lolik</NavLink>
                                </div>
                                <p>Points: 0</p>
                            </li>
                            <li>
                                <div>
                                    <Avatar profile={{avatar: {icon: '#ff0000',back: '#fdff8a'}}}/>
                                    <NavLink to="/profile">Lolik</NavLink>
                                </div>
                                <p>Points: 0</p>
                            </li>
                            <li>
                                <div>
                                    <Avatar profile={{avatar: {icon: '#ff0000',back: '#fdff8a'}}}/>
                                    <NavLink to="/profile">Lolik</NavLink>
                                </div>
                                <p>Points: 0</p>
                            </li>
                            <li>
                                <div>
                                    <Avatar profile={{avatar: {icon: '#ff0000',back: '#fdff8a'}}}/>
                                    <NavLink to="/profile">Lolik</NavLink>
                                </div>
                                <p>Points: 0</p>
                            </li>
                            <li>
                                <div>
                                    <Avatar profile={{avatar: {icon: '#ff0000',back: '#fdff8a'}}}/>
                                    <NavLink to="/profile">Lolik</NavLink>
                                </div>
                                <p>Points: 0</p>
                            </li>
                            </>:
                            <Loader />
                            }
                        </ul>
                    </section>
                </div>
            </main>
        </>
    )
}

export default CountryPage
