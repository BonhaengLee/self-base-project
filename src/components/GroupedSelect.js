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

export default function GroupedSelect() {
  const classes = useStyles();

  return (
    <div style={{ marginTop: '-20px' }}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">강의 선택</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>캡스톤디자인</ListSubheader>
          <MenuItem value={1}>Option 1</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <ListSubheader>자기주도연구</ListSubheader>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
          <ListSubheader>자기주도프로젝트</ListSubheader>
          <MenuItem value={5}>Option 3</MenuItem>
          <MenuItem value={6}>Option 4</MenuItem>
          <ListSubheader>수학1</ListSubheader>
          <MenuItem value={7}>Option 3</MenuItem>
          <MenuItem value={8}>Option 4</MenuItem>
          <ListSubheader>약품분자생물학</ListSubheader>
          <MenuItem value={9}>Option 3</MenuItem>
          <MenuItem value={10}>Option 4</MenuItem>
          <ListSubheader>국제금융론</ListSubheader>
          <MenuItem value={11}>Option 3</MenuItem>
          <MenuItem value={12}>Option 4</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
