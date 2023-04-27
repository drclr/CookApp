<template>
  <div class="d-flex justify-center w-100">
    <v-progress-circular v-if="questionsStep.length == 0" indeterminate></v-progress-circular>
    <v-form v-else class="w-100 d-flex flex-column align-center" @submit.prevent="onSubmit">
      <CardQuestion v-for="question in questionsStep" :key="question.id" v-model="answersForm[question.id]"
        :currentQuestion="question">
      </CardQuestion>
      <v-btn class="my-10 text-green-darken-3" type="submit">
        Next
        <v-icon icon="mdi-arrow-right"></v-icon>
      </v-btn>
    </v-form>
  </div>
</template>
<script lang="ts" setup>
import { useFirestore } from 'vuefire';
import CardQuestion from '../components/CardQuestion.vue';
import { ref, onBeforeMount } from 'vue';
import Question from '../models/question';
import { useForm } from 'vee-validate';
import { getDocs, /*addDoc,*/ query, where, /*getCountFromServer, getFirestore,*/ collection } from "firebase/firestore";
import { useRouter } from 'vue-router';
import { useRecipeStore } from '@/store/recipe';
const router = useRouter();
const db = useFirestore();
const storeRecipe = useRecipeStore();

interface Answers {
  [key: string]: string | null
}

const questionsStep = ref<Question[]>([]);
const answersForm = ref<Answers>({});
const tagsSelected = ref<string[]>([]);
const { handleSubmit } = useForm();
const step = ref(0);


onBeforeMount(async function () {
  await toGetQuestions();
});


const onSubmit = handleSubmit(async () => {
  for (const tag of Object.values(answersForm.value)) {
    if ((tag != 'noTag') && (!tagsSelected.value.includes(tag as string))) {
      tagsSelected.value.push(tag as string);
    }
  }
  tagsSelected.value.sort();
  if (step.value != 1) {
    step.value++;
    await toGetQuestions();
    if (questionsStep.value.length == 0) {
      await toDisplayResults();
    }
  } else {
    await toDisplayResults();

  }
}
);

async function toDisplayResults() {
  await storeRecipe.toDefineRecipesFromTags(tagsSelected.value);
  router.push('/recipes');
}

async function toGetQuestions() {
  questionsStep.value = [];
  answersForm.value = {};
  let question = {} as Question;
  let q;
  if (step.value == 0) {
    q = query(collection(db, "questions"), where("isStepIni", '==', true));
  } else {
    let tagsBdd = {} as { [key: string]: string };
    for (let i = 0; i < tagsSelected.value.length; i++) {
      tagsBdd[i] = tagsSelected.value[i];
    }
    q = query(collection(db, "questions"), where("combinations", 'array-contains', tagsBdd));
  }
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    question = doc.data() as Question;
    question.id = 'field' + questionsStep.value.length.toString();
    answersForm.value[question.id] = null;
    questionsStep.value.push(question);
  });
}

</script>
