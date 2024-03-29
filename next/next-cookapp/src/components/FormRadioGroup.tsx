import { FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, FormHelperText, Card } from "@mui/material";
import { Option } from '@/models/question';
import { SyntheticEvent } from 'react';

type RadioGroupProp = {
  optionsRadio: Option[],
  label: string,
  indexQuestion: number,
  error: boolean,
  currentValue: string | null,
  handleAnswer: (value: string, index: number) => void,
}

type RadioProp = {
  value: string,
  currentValue: string | null,
  label: string,
  handleChange: (event: SyntheticEvent<Element, Event>) => void;
}

export default function FormRadioGroup({ optionsRadio, label, indexQuestion, error, currentValue, handleAnswer }: RadioGroupProp) {


  const radioButtons = optionsRadio.map((opt, indexButton) => {
    return (<FormRadio currentValue={currentValue} key={'radio' + indexButton} value={opt.value} label={opt.label} handleChange={(event) => handleAnswer((event.target as HTMLInputElement).value, indexQuestion)
    }></FormRadio >)
  })

  const textHelper = (error ? 'At least one item must be selected' : '');

  return (
    <Card variant="outlined" sx={{ width: 3 / 4, minWidth: 280, m: 2, p: 2 }}>
      <FormControl error={error}>
        <FormLabel id={'question-' + indexQuestion}>{label}</FormLabel>
        <RadioGroup
          aria-labelledby={'question-' + indexQuestion}
          defaultValue={null}
          name={'radio-buttons-group' + indexQuestion}
        >
          {radioButtons}
        </RadioGroup>
        <FormHelperText>{textHelper}</FormHelperText>
      </FormControl>
    </Card>)
}

export function FormRadio({ value, currentValue, label, handleChange }: RadioProp) {
  return (<FormControlLabel value={value} control={<Radio />} label={label} onChange={handleChange} checked={currentValue == value} />)
}