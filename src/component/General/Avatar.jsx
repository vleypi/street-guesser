import React from 'react'

const Avatar = ({profile}) => {
    return (
        <svg style={{background: profile.avatar.back}} version="1.0" xmlns="http://www.w3.org/2000/svg"width="500.000000pt" height="500.000000pt" viewBox="0 0 500.000000 500.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill={profile.avatar.icon} stroke="none">
                <path d="M2382 4249 c-574 -74 -953 -634 -807 -1193 89 -341 358 -601 712 -688 110 -27 301 -29 410 -4 375 83 656 364 739 739 25 109 23 300 -4 410 -45 184 -127 331 -254 461 -207 209 -507 313 -796 275z"/>
                <path d="M2310 2009 c-499 -38 -982 -231 -1380 -552 -114 -92 -272 -250 -364 -364 l-58 -73 58 -72 c469 -583 1187 -928 1934 -928 580 0 1143 205 1590 578 105 87 278 264 353 360 l47 61 -58 73 c-153 192 -346 366 -561 510 -360 239 -761 375 -1201 408 -149 11 -205 11 -360 -1z"/>
            </g>
        </svg>
    )
}

export default Avatar
