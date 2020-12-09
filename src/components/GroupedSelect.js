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
  const [subj, setSubj] = React.useState('');
  const [vid, setVid] = React.useState('');

  const handleChangeS = (event) => {
    setSubj(event.target.value);
  };
  const handleChangeV = (event) => {
    setVid(event.target.value);
  };

  console.log(OPTIONS);
  console.log(subj);
  console.log(vid);

  return (
    <div style={{ marginTop: '-20px' }}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">과목 선택</InputLabel>
        <Select defaultValue="" id="grouped-select" onChange={handleChangeS}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {OPTIONS.map((x, i) => {
            return <MenuItem value={x.subject}>{x.subject}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">영상 선택</InputLabel>
        <Select defaultValue="" id="grouped-select" onChange={handleChangeV}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {OPTIONS.map((x, i) => {
            return <MenuItem value={x.title}>{x.title}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
