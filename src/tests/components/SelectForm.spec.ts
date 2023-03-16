import SelectForm from '@/components/SelectForm.vue'
import { describe, test, expect, beforeEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {
  mount, /*, flushPromises */
  VueWrapper
} from '@vue/test-utils'

describe("selectForm", () => {
  let vuetify;
  let wrapper: VueWrapper;
  beforeEach(() => {
    vuetify = createVuetify({ components, directives });
    wrapper = mount(SelectForm, {
      global: {
        plugins: [vuetify],
      },
      props: {
        label: 'label form select',
        modelValue: '',
        options: ['option1', 'option2'],
        name: 'radio'
      }
    });
  });

  test('update:modelValue event should be emitted after one option selected with the right payload ', async () => {
    const component = wrapper.findComponent({ ref: 'form-select' })
    await component.setValue('option1')
    await component.trigger('input');
    const inputCall = wrapper.emitted('update:modelValue');
    expect(inputCall).toHaveLength(1);
    expect((inputCall as unknown[][])[0][0]).toBe('option1');
  })
});



