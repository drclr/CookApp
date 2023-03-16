import RadioForm from '@/components/RadioForm.vue';
import { describe, test, expect, beforeEach } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount, VueWrapper } from '@vue/test-utils'

describe('RadioForm', () => {
  let vuetify;
  let wrapper: VueWrapper;
  beforeEach(() => {
    vuetify = createVuetify({ components, directives });
    wrapper = mount(RadioForm, {
      global: {
        plugins: [vuetify],
      },
      props: {
        label: 'label form radio',
        options: [
          {
            label: 'Yes',
            value: '1'
          },
          {
            label: 'No',
            value: '0'
          }
        ],
        modelValue: '',
        name: 'radio'
      }
    });

  })
  test('props values are rendered as excepted', () => {
    expect(wrapper.findComponent({ ref: 'label-radio-button' }).html()).toContain('label form radio')
    expect(wrapper.findComponent({ ref: 'radio-button-Yes' }).html()).toContain('Yes')
    expect(wrapper.findComponent({ ref: 'radio-button-No' }).html()).toContain('No')
  });

  test('update:modelValue event should be emitted for user choice yes with the right payload', async () => {
    await wrapper.find('input[type=radio][value="1"]').setValue();
    await wrapper.find('input[type=radio][value="1"]').trigger('input');
    const inputCallUpdate = wrapper.emitted('update:modelValue');
    expect(inputCallUpdate).toHaveLength(1);
    expect((inputCallUpdate as unknown[][])[0][0]).toBe('1');
  });

  test('update:modelValue event should be emitted for user choice no with the right payload', async () => {
    await wrapper.find('input[type=radio][value="0"]').setValue();
    await wrapper.find('input[type=radio][value="0"]').trigger('input');
    const inputCall = wrapper.emitted('update:modelValue');
    expect(inputCall).toHaveLength(1);
    expect((inputCall as unknown[][])[0][0]).toBe('0');
  });
});

