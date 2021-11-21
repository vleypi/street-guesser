import React from 'react'

const Score = ({score}) => {
    const check = [1,6300,12500,19000,25000]
    const scores = ['#89bde0','#89bde0','#89bde0','#89bde0','#89bde0']
    for(let i=0;check.length > i;i++){
        if(score >= check[i] && score <= check[i+1]){
            for(let k=0;i+1 > k;k++){
                scores[k] = '#3498db'
            }
        }
    }
    return (
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
            <g class="layer">
                <rect fill={scores[0]} height="10" id="svg_21"  width="8" x="0" y="30"/>
                <rect fill={scores[1]} height="20" id="svg_22"  width="8" x="10" y="20"/>
                <rect fill={scores[2]} height="30" id="svg_23"  width="8" x="21" y="10"/>
                <rect fill={scores[3]} height="40" id="svg_24"  width="8" x="32" y="3"/>
            </g>
        </svg>
    )
}

export default Score
