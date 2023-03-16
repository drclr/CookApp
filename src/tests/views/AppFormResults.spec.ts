import AppFormResults from '@/views/AppFormResults.vue';
import { describe, test, expect, beforeEach, vi } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useRecipeStore } from '@/store/recipe'


describe('AppFormResults', () => {
  test('store action should be called and CardRecipe components displayed', () => {
    const vuetify = createVuetify({ components, directives });
    const pinia = createTestingPinia({
      initialState: {
        recipe: {
          recipesFromTags: [{
            id: 'id1', recipe: {
              title: 'title recipe 1',
              content: 'content recipe 1',
              tagsRequired: ['tag'],
              ingredients: {
                '0': {
                  quantity: 'quantity ingredient 1',
                  unit: 'unit ingredient 1',
                  name: 'ingredient 1'
                }
              }
            }
          }, {
            id: 'id2', recipe: {
              title: 'title recipe 2',
              content: 'content recipe 2',
              tagsRequired: ['tag'],
              ingredients: {
                '0': {
                  quantity: 'quantity ingredient 1',
                  unit: 'unit ingredient 1',
                  name: 'ingredient 1'
                }
              }
            }
          }
          ]
        }
      }
    });
    const store = useRecipeStore();
    const wrapper = mount(AppFormResults, {
      global: {
        plugins: [pinia, vuetify],
      },
    });
    expect(store.toDefineRecipesFromTags).toHaveBeenCalledOnce();
    expect(wrapper.find('[data-test="title recipe 1"]').exists()).toBe(true);
    expect(wrapper.find('[data-test="title recipe 2"]').exists()).toBe(true);
  });
});

