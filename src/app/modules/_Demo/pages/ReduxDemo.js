import React from 'react'
import Player from '../components/Player'
import Room from '../components/Room'
import GameConfig from '../components/GameConfig'
import {useSelector} from 'react-redux'

function ReduxDemo() {
    const demoReducer = useSelector(({demo})=>demo)
    return (
        <div>
            <GameConfig></GameConfig>
            <Room></Room>
            {
                demoReducer.playerList.map((item,index) => (
                    <Player key={index} name={item}></Player>
                ))
            }
        </div>
    )
}

export default ReduxDemo
