/*
import InputForm from '@/components/InputForm.vue'
import { describe, test, expect, beforeEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount, flushPromises } from '@vue/test-utils'

describe('InputForm', () => {
  let vuetify;
  beforeEach(() => {
    vuetify = createVuetify({ components, directives });
  })
  test('label and modelValue should be displayed', async () => {
    const wrapper = mount(InputForm, {
      global: {
        plugins: [vuetify],
      },
      props: {
        label: "input label",
        modelValue: 5,
      },
    });
    const wrapperHtml = wrapper.html();
    expect(wrapper.find('input').element.value).toEqual('5');
    expect(wrapperHtml).toContain('input label');
  });


  test('update:modelValue event should be emitted and input value updated', async () => {
    const wrapper = mount(InputForm, {
      global: {
        plugins: [vuetify],
      },
      props: {
        label: "input label",
        modelValue: "",
      },
    });

    await wrapper.find('input').setValue('5');

    const inputCallUpdate = wrapper.emitted('update:modelValue');
    expect(inputCallUpdate).toHaveLength(1);
    expect(inputCallUpdate[0]).toEqual(['5']);

    expect(wrapper.find('input').element.value).toEqual('5');
  });

});
*/

