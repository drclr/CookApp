<template>
  <v-form class="d-flex flex-column align-center" @submit.prevent="onSubmit">
    <CardQuestion v-for="question in questionsStep" :key="question.id" v-model="answersForm[question.id]"
      :currentQuestion="question">
    </CardQuestion>
    <v-btn class="mt-4 text-blue-grey-darken-5 bg-yellow-darken-1" type="submit">
      Suivant
      <v-icon icon="mdi-arrow-right"></v-icon>
    </v-btn>
    <v-btn class="ma-4 text-blue-grey-darken-5 bg-yellow-darken-1" @click="resetForm()"> Reset form </v-btn>
    <div class="w-50 pa-10 mt-10 flex-column align-center" min-width="300px">

    </div>
    <div> {{ answersForm }}</div>
    <div> {{ tagsSelected }}</div>
  </v-form>
</template>
<script lang="ts" setup>

import { useFirestore } from 'vuefire';
import CardQuestion from '../components/CardQuestion.vue';
import { ref, onBeforeMount } from 'vue';
import Question from '../models/question';
import { useForm } from 'vee-validate';
import { getDocs, /*addDoc,*/ query, where, collection, getCountFromServer } from "firebase/firestore";
import { useRouter } from 'vue-router';
import { useRecipeStore } from '@/store/recipe'
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


onBeforeMount(async function () {
  await toGetQuestions();
});


const onSubmit = handleSubmit(async () => {
  for (const question of questionsStep.value) {
    const answer = answersForm.value[question.id];
    const tag = question.tagsToSelect[answer as string];
    if (!tagsSelected.value.includes(tag) && tag) {
      tagsSelected.value.push(tag);
    }
  }
  const numberRecipes = await toGetRecipesNumberWithSelectedTags();
  console.log(numberRecipes);
  if (numberRecipes != 1) {
    toGetQuestions();
  } else {
    storeRecipe.toDefineTagsSelectedFromForm(tagsSelected.value);
    router.push('/recipe');
  }
});

async function toGetRecipesNumberWithSelectedTags() {
  const q = query(collection(db, "recipes"), where("tagsRequired", 'in', [tagsSelected.value]));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
}

async function toGetQuestions() {
  questionsStep.value = [];
  answersForm.value = {};
  let question = {} as Question;
  const q = query(collection(db, "questions"), where("tagsRequired", 'in', [tagsSelected.value]));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    question = doc.data() as Question;
    question.id = 'field' + questionsStep.value.length.toString();
    answersForm.value[question.id] = null;
    questionsStep.value.push(question);
  })
}

function resetForm() {
  answersForm.value = {};
  tagsSelected.value = [];
  toGetQuestions();
}

</script>