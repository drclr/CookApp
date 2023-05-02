import FormRadioGroup from '@/components/FormRadioGroup'
import { SyntheticEvent, useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { firebaseApp } from '@/firebase'
import Question from '@/models/question'
import { getDocs, query, where, getFirestore, collection, DocumentData, Query } from 'firebase/firestore'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import { CircularProgress, Grid } from '@mui/material'
const db = getFirestore(firebaseApp);

export default function FormQuestions() {
  const router = useRouter();
  const [questionsStep, setQuestionsStep] = useState<Question[]>([]);
  const [answersForm, setAnswerForm] = useState<(string | null)[]>([]);
  const [errorStatusQuestions, setErrorStatusQuestions] = useState<boolean[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const currentStep = useRef(0);
  const tagsSelected = useRef<string[]>([]);
  const maxStep = 1;

  async function toGetQuestionsBack(query: Query<DocumentData>) {
    setLoading(true);
    const querySnapshot = await getDocs(query);
    let question: Question;
    let questions: Question[] = [];
    querySnapshot.forEach((doc) => {
      question = doc.data() as Question;
      questions.push(question);
    });

    if (questions.length > 0) {
      setLoading(false);
      setAnswerForm(Array(questions.length).fill(null));
      setErrorStatusQuestions(Array(questions.length).fill(false));
      setQuestionsStep([...questions]);
    }
  }

  useEffect(() => {
    toGetQuestionsBack(query(collection(db, "questions"), where("isStepIni", '==', true)));
  }, [])

  function handleAnswer(value: string, index: number) {
    if (errorStatusQuestions[index]) {
      const newErrorStatusQuestions = errorStatusQuestions.slice();
      newErrorStatusQuestions[index] = false;
      setErrorStatusQuestions(newErrorStatusQuestions);
    }
    const nextAnswerForm = answersForm.slice();
    nextAnswerForm[index] = value;
    setAnswerForm(nextAnswerForm);
  }

  function toUpdateErrorsStatus() {
    let newErrorStatusQuestions = errorStatusQuestions.slice();
    answersForm.forEach((item, index) => {
      if (item == null) {
        newErrorStatusQuestions[index] = true;
      }
    });
    setErrorStatusQuestions(newErrorStatusQuestions);
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const isFormNotFilled = answersForm.includes(null);
    if (isFormNotFilled) {
      toUpdateErrorsStatus();
    } else {
      answersForm.forEach((item) => {
        if (item != 'noTag') {
          tagsSelected.current.push(item as string);
        }
      })
      tagsSelected.current.sort();
      let tagsBdd = {} as { [key: string]: string };
      for (let i = 0; i < tagsSelected.current.length; i++) {
        tagsBdd[i] = tagsSelected.current[i];
      }
      if (currentStep.current < maxStep) {
        toGetQuestionsBack(query(collection(db, "questions"), where("combinations", 'array-contains', tagsBdd)));
        currentStep.current++;
      } else {
        router.push({
          pathname: '/form-results',
          query: { tags: [...tagsSelected.current] }
        }, '/form-results'
        );
      }

    }
  }

  const questions = questionsStep.map((question, index) => {
    return (
      <Grid item xs={12} key={index} display="flex" justifyContent="center" alignItems="center">
        <FormRadioGroup
          indexQuestion={index}
          currentValue={answersForm[index]}
          optionsRadio={question.optionsRadio}
          label={question.label}
          handleAnswer={handleAnswer}
          error={errorStatusQuestions[index]}
        />
      </Grid>
    )
  })

  return (
    <form onSubmit={handleSubmit}>
      <Grid container sx={{ minWidth: 280, minHeight: 800, bgcolor: '#263238' }} display="flex" direction="column" alignItems="center">
        {loading ? <CircularProgress /> :
          <>
            <Grid container>
              {questions}
            </Grid>
            <Button sx={{ my: 10, px: 5, bgcolor: '#FAFAFA', width: '40px' }} type="submit"> Next</Button>
          </>}
      </Grid>
    </form >)
}
