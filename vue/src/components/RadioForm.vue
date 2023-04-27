<template>
  <div data-test="radio-form-component">
    <v-label ref="label-radio-button" :text="label" class="text-white text-wrap mb-5"></v-label>
    <v-radio-group class="text-white" @update:modelValue="$emit('update:modelValue', $event)" :model-value="modelValue">
      <v-radio :ref="'radio-button-' + opt.label" v-for="opt in options" :key="opt.value" :label="opt.label"
        :value="opt.value" :name="name">
      </v-radio>
    </v-radio-group>
    <error-message v-slot="{ message }" :name="name">
      <v-alert type="error"> {{ message }}</v-alert>
    </error-message>
  </div>
</template>
<script lang='ts' setup>
import { Option } from '../models/question';
import { ErrorMessage, useField } from 'vee-validate'
import * as yup from 'yup';
const props = defineProps<{
  options: Array<Option>,
  name: string,
  modelValue: string | number | null,
  label: string,
}>();

useField(props.name, yup.string().required('At least one item must be selected').typeError('At least one item must be selected'), {
  initialValue: props.modelValue
}
);

</script>