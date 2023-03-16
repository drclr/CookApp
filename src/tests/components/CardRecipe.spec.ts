import CardRecipe from '@/components/CardRecipe.vue';
import { describe, test, expect } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'

describe('CardRecipe', () => {
  test('recipe items should be rendered as expected', () => {
    const vuetify = createVuetify({ components, directives });
    const wrapper = mount(CardRecipe, {
      global: {
        plugins: [vuetify],
      },
      props: {
        recipe: {
          title: 'recipe title',
          content: 'recipe content',
          ingredients: {
            0: {
              name: "yoghurt",
              quantity: '1',
              unit: 'none'
            },
          },
          tagsRequired: ['healthy', 'vegetarian']
        }
      }
    });
    expect(wrapper.findComponent({ ref: 'recipe-title' }).html()).toContain('recipe title')
    expect(wrapper.findComponent({ ref: 'recipe-ingredients' }).html()).toContain('1 yoghurt')
    expect(wrapper.findComponent({ ref: 'recipe-content' }).html()).toContain('recipe content')
    expect(wrapper.findComponent({ ref: 'tag-healthy' }).html()).toContain('#healthy')
    expect(wrapper.findComponent({ ref: 'tag-vegetarian' }).html()).toContain('#vegetarian')
  })
});

