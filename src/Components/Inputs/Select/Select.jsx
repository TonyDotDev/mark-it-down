import React from 'react';
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  FormHelperText,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  labelRoot: {
    '&.Mui-focused': {
      color: theme.palette.secondary.main,
    },
  },
  selectUnderline: {
    '&::after': {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
}));

const Select = ({ value, label, onChange, id, labelId, items, helpText }) => {
  const classes = useStyles();

  const menuItems = items.map((item) => (
    <MenuItem disabled={item.disabled} key={item.value} value={item.value}>
      {item.name}
    </MenuItem>
  ));

  return (
    <FormControl className={classes.formControl}>
      {label && (
        <InputLabel classes={{ root: classes.labelRoot }} id={labelId}>
          {label}
        </InputLabel>
      )}
      <MuiSelect
        classes={{ underline: classes.selectRoot }}
        labelId={labelId}
        id={id}
        value={value}
        onChange={onChange}
      >
        {menuItems}
      </MuiSelect>
      {helpText && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
};

Select.propTypes = {
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  labelId: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  helpText: PropTypes.string,
};

Select.defaultProps = {
  helpText: '',
};

export default Select;
