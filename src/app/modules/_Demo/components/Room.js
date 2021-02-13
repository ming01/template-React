/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import * as demoRedux from '../_redux/demoRedux'


function Room() {
    const demoReducer = useSelector(({demo})=> demo)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (demoReducer.switch1 && demoReducer.switch2 && demoReducer.switch3) {
            //Set Light = ON
            dispatch(demoRedux.actions.updateLightStatus('ON'))
        } else {
            //Set light = OFF
            dispatch(demoRedux.actions.updateLightStatus('OFF'))
        }
    }, [demoReducer.switch1,demoReducer.switch2,demoReducer.switch3])
    return (
        <div>
            {/* <h1>switch1 : {demoReducer.switch1.toString()}</h1>
            <h1>switch2 : {demoReducer.switch2.toString()}</h1>
            <h1>switch3 : {demoReducer.switch3.toString()}</h1> */}
            <h1>
                Light Status : {demoReducer.lightState}
            </h1>
        </div>
    )
}

export default Room
