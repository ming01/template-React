/* eslint-disable no-restricted-imports */
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useSelector, useDispatch} from 'react-redux'
import * as demoRedux from '../_redux/demoRedux'
import Button from '@material-ui/core/Button'

function GameConfig() {

    const demoReducer = useSelector(({demo}) => demo)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        //   setAge(event.target.value);
        // ใบ้ SetRedux(event.target.value)
        dispatch(demoRedux.actions.updateImposter(event.target.value))
    };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Imposter :</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={demoReducer.imposter}
          onChange={handleChange}
        >
          {demoReducer.playerList.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={()=>{
          // Clone object player,
          let objToUpdate = [...demoReducer.playerList]
          // add to object
          objToUpdate.push("XXX")
          // dispatch
          dispatch(demoRedux.actions.addPlayer(objToUpdate))
      }}>
        Add New Player
      </Button>
    </div>
  );
}

export default GameConfig;
