import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const textStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }));

  const dataTypes = [
    {
      value: 'Indication',
      label: 'Indication',
    },
    {
      value: 'Drug',
      label: 'Drug',
    },
  ];

//const classes = textStyles();

// *************************** ERROR: invalid hook call **********************************

// const [values, setValues] = React.useState({
//   number: '5',
//   datatype: 'indication',
// });

// const handleChange = name => event => {
//   setValues({ ...values, [name]: event.target.value });
// };


export default class TextFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert(this.state.value + ' file was submitted');
    event.preventDefault();
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit} className={textStyles.container} noValidate autoComplete="off">
          <TextField
              id="standard-select-datatype"
              select
              label="Select"
              className={textStyles.textField}
              value={this.state.value}
              onChange={this.handleChange}
              SelectProps={{
              MenuProps: {
                  className: textStyles.menu,
                  },
              }}
              helperText="Please select the file type"
              margin="normal"
              variant="outlined"
          >
              {dataTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                  {option.label}
              </MenuItem>
              ))}
          </TextField>
          <TextField
              id="standard-number"
              label="Number of existing entries"
              //value="5"
              //onChange={handleChange('n')}
              type="number"
              className={textStyles.textField}
              InputLabelProps={{
              shrink: true,
              }}
              margin="normal"
              variant="outlined"
          />
          <input type="submit" value="Submit" />
      </form>
    );
  }
}