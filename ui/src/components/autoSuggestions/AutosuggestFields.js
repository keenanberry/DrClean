import React  from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { IndicationTypes } from './IndicationTypes';
import { IndicationSubtypes } from './IndicationSubtypes';
import { DrugTypes } from './DrugTypes';
import { DrugSubtypes } from './DrugSubtypes';


function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      margin="dense"
      variant="outlined"
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions( value, data ) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : data.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.toString().slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  //console.log(suggestion.label);
  return suggestion.label;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 50,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  LabelSontainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(0),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  LabelSist: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
}));

export default function IntegrationAutosuggest({
  labelId,
  typeId,
  textField,
  setTextField
}) {

  const classes = useStyles();

  var fieldLabelText = '';
  var placeholderText = '';
  let autoSelectData = null;

  if (typeId === "Tumor") {
    if (labelId === "typeMain") {
      fieldLabelText = "Tumor Type";
      placeholderText = "Select a Tumor Type";
      autoSelectData = IndicationTypes; 
    }else if (labelId === "typeSub") {
      fieldLabelText = "Tumor Subtype";
      placeholderText = "Select a Tumor Subtype";
      autoSelectData = IndicationSubtypes;
    }
  }else if (typeId === 'Drug') {
    if (labelId === 'typeMain') {
      fieldLabelText = 'Drug Type';
      placeholderText = 'Select a Drug Type';
      autoSelectData = DrugTypes;
    }else if (labelId === 'typeSub') {
      fieldLabelText = 'Drug Subtype';
      placeholderText = 'Select a Drug Subtype';
      autoSelectData = DrugSubtypes;
    }
  }

  const [stateSuggestions, setSuggestions] = React.useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions( value, autoSelectData ));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  function handleClick(event) {
    event.stopPropagation();
  }

  const handleChange = (event, { newValue }) => {
    event.stopPropagation();
    setTextField(newValue);
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          label: fieldLabelText.toString(),
          placeholder: placeholderText.toString(),
          value: textField,
          onClick: handleClick,
          onChange: handleChange,
        }}
        theme={{
          container: classes.container,
          LabelSontainerOpen: classes.LabelSontainerOpen,
          LabelSist: classes.LabelSist,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    </div>
  );
}