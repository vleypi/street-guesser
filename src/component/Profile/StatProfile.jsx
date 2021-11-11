import React from 'react'
import style from '../../styles/profile.module.css'
import LikesProfile from './LikesProfile'

const StatProfile = ({profile,shortid}) => {
    return (
        <div className={style.contentStatProfile}>
            <div className={style.titleStat}>
                <h1>{profile.name}'s statistics</h1>
                <LikesProfile profile={profile} shortid={shortid}/>
            </div>
            <div className={style.profileStat}>
                <div>
                    <p>{profile.statistics.played}</p>
                    <h2>Game Played</h2>
                </div>
                <div>
                    <p>{profile.statistics.victoriesBD + profile.statistics.victoriesBR}</p>
                    <h2>Victories</h2>
                </div>
                <div>
                    <p>{profile.statistics.scoreBEST}</p>
                    <h2>Best Score</h2>
                </div>
                <div>
                    <p>{profile.statistics.scoreAVG}</p>
                    <h2>AVG Score</h2>
                </div>
                <div>
                    <p>{profile.statistics.accuracyAVG}</p>
                    <h2>AVG Accuracy</h2>
                </div>
                <div>
                    <p>{profile.statistics.victoriesBD}</p>
                    <h2>Victories Points</h2>
                </div>
                <div>
                    <p>{profile.statistics.victoriesBR}</p>
                    <h2>Victories BR</h2>
                </div>
            </div>
        </div>
    )
}

export default StatProfile
