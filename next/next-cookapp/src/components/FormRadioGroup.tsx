import { FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, FormHelperText } from "@mui/material";

export default function FormRadioGroup({ optionsRadio, label, indexQuestion, error, currentValue, handleAnswer }) {


  const radioButtons = optionsRadio.map((opt, indexButton) => {
    return (<FormRadio currentValue={currentValue} key={'radio' + indexButton} value={opt.value} label={opt.label} handleChange={(event) => handleAnswer(event.target.value, indexQuestion)}></FormRadio>)
  })

  const textHelper = (error ? 'At least one item must be selected' : '');

  return (<div>
    <FormControl error={error}>
      <FormLabel id={'question-' + indexQuestion}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={'question-' + indexQuestion}
        defaultValue="null"
        name="radio-buttons-group"
      >
        {radioButtons}
      </RadioGroup>
      <FormHelperText>{textHelper}</FormHelperText>
    </FormControl>
  </div>)
}

export function FormRadio({ value, currentValue, label, handleChange }) {
  return (<FormControlLabel value={value} control={<Radio />} label={label} onChange={handleChange} checked={currentValue == value} />)
}