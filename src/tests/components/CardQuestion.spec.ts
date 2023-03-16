import CardQuestion from '@/components/CardQuestion.vue';
import { describe, test, expect, beforeEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'

describe('CardQuestion', () => {
  let vuetify;
  beforeEach(() => {
    vuetify = createVuetify({ components, directives });
  });
  test('prop with select content should render select component', () => {

    const wrapper = mount(CardQuestion, {
      global: {
        plugins: [vuetify]
      },
      props: {
        currentQuestion: {
          type: 'select',
          label: 'select label',
          optionsSelect: ['option1', 'option2'],
          tagsToSelect: ['tag1'],
          tagsRequired: [],
          id: 'id1',
        },
        modelValue: null
      }
    });
    expect(wrapper.find('[data-test="select-form-component"]').exists()).toBe(true);
  });
  test('prop with radio content should render radio component', () => {
    const wrapper = mount(CardQuestion, {
      global: {
        plugins: [vuetify]
      },
      props: {
        currentQuestion: {
          type: 'radio',
          label: 'radio label',
          optionsRadio: [{
            label: 'radio button 1',
            value: '1'
          },
          {
            label: 'radio button 2',
            value: '2'
          }
          ],
          tagsToSelect: ['tag1'],
          tagsRequired: [],
          id: 'id2'
        },
        modelValue: null
      }
    });
    expect(wrapper.find('[data-test="radio-form-component"]').exists()).toBe(true);

  });
});
