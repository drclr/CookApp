import CardIngredients from '@/components/CardIngredients.vue';
import { describe, test, expect } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'

describe('CardIngredients', () => {
  test('ingredients are displayed as expected', () => {
    const vuetify = createVuetify({ components, directives });
    const wrapper = mount(CardIngredients, {
      global: {
        plugins: [vuetify],
      },
      props: {
        ingredients: {
          0: {
            name: "lemon",
            quantity: '1',
            unit: 'none'
          },
          1: {
            name: 'orange',
            quantity: '3',
            unit: 'none'
          },
          2: {
            name: 'flour',
            quantity: '200',
            unit: 'g'
          }
        }
      }
    });
    expect(wrapper.get('[data-test="lemon"]').html()).toContain('1 lemon')
    expect(wrapper.get('[data-test="orange"]').html()).toContain('3 oranges')
    expect(wrapper.get('[data-test="flour"]').html()).toContain('flour : 200 g')
  });

});



