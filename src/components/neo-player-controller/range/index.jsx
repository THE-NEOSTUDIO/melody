import React, {useEffect} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {EMPTY_CUBE_COLOR} from "../../../common/constants/color";

const useStyles = makeStyles(() => ({
  root: {
    width: 100,
    paddingTop: '.1rem',
    height: '1.1rem',
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: EMPTY_CUBE_COLOR,
    width: 100,
  },
  thumb: {
    backgroundColor: EMPTY_CUBE_COLOR,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  track: {
    width: 100,
    borderRadius: 4,
  },
  rail: {
    width: 100,
    borderRadius: 4,
  },
})(Slider);

export default function CustomizedSlider(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PrettoSlider
        orientation="vertical"
        onChange={(e, value) => props.player && props.player.setBPM(value * 2 + 40)}
        defaultValue={30}/>
    </div>
  );
}
