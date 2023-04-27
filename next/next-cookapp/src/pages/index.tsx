import Head from 'next/head'
import FormRadioGroup from '@/components/FormRadioGroup'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { firebaseApp } from '@/firebase'
import { useEffect, StrictMode } from 'react'
import { getDocs, /*addDoc,*/ query, where, /*getCountFromServer,*/ getFirestore, collection } from 'firebase/firestore'
const db = getFirestore(firebaseApp);


export default function Home() {
  const [questionsStep, setQuestionsStep] = useState([]);
  const [answersForm, setAnswerForm] = useState([]);
  const [errorStatusQuestions, setErrorStatusQuestions] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);

  function toGetQuestionsBack(querySnapshot) {
    let question;
    let questions = [];
    querySnapshot.forEach((doc) => {
      question = doc.data();
      questions.push(question);
    });
    setAnswerForm(Array(questions.length).fill(null));
    setErrorStatusQuestions(Array(questions.length).fill(false))
    setQuestionsStep([...questions]);

  }

  useEffect(() => {
    async function toGetQuestionsIni() {
      const q = query(collection(db, "questions"), where("isStepIni", '==', true));
      const querySnapshot = await getDocs(q);
      toGetQuestionsBack(querySnapshot);
    }
    toGetQuestionsIni();
  }, [])




  function handleAnswer(value, index) {
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

  async function handleSubmit(event) {
    event.preventDefault();
    const isFormNotFilled = answersForm.includes(null);
    if (isFormNotFilled) {
      toUpdateErrorsStatus();
    } else {
      const tags = tagsSelected.slice();
      answersForm.forEach((item) => {
        if (item != 'noTag') {
          tags.push(item);
        }
      })
      tags.sort();
      setTagsSelected([...tags]);
      let tagsBdd = {} as { [key: string]: string };
      for (let i = 0; i < tags.length; i++) {
        tagsBdd[i] = tags[i];
      }
      const q = query(collection(db, "questions"), where("combinations", 'array-contains', tagsBdd));
      const querySnapshot = await getDocs(q);
      toGetQuestionsBack(querySnapshot);
    }
  }

  const radioForms = questionsStep.map((question, index) => {
    return (<FormRadioGroup
      indexQuestion={index}
      currentValue={answersForm[index]}
      key={'question' + index}
      optionsRadio={question.optionsRadio}
      label={question.label}
      handleAnswer={handleAnswer}
      error={errorStatusQuestions[index]}
    ></FormRadioGroup>)
  })


  return (
    <>
      <StrictMode>
        <Head>
          <title>WhatToCook</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <main>
          <form onSubmit={handleSubmit}>
            {radioForms}
            <Button type="submit"> Next</Button>
          </form>
        </main>
      </StrictMode>
    </>
  )
}
