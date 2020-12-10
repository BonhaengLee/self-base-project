import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundImage: 'linear-gradient(360deg, white 70%, transparent 63%)',
    marginBottom: '15px',
  },
}));

export default function GroupedSelect(props) {
  const classes = useStyles();
  const OPTIONS = props.st;

  console.log(OPTIONS);

  return (
    <div style={{ marginTop: '-20px' }}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">영상 선택</InputLabel>
        <Select
          defaultValue=""
          id="grouped-select"
          onChange={props.handleChangeV}
        >
          <MenuItem value="">
            <em>전체</em>
          </MenuItem>
          {OPTIONS.map((x, i) => {
            return (
              <MenuItem value={x.vId}>
                [{x.subject}]{x.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
