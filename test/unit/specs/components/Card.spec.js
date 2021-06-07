import { text } from '../../helpers'

import Vue from 'vue'
import { makeItem } from '@/app/utils/data'
import Card from '@/app/views/elements/Card'

describe('Card.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Card)
    const vm = new Constructor({
      propsData: {
        item: makeItem('Add a new field', 'Field should be called "Gender"')
      }
    }).$mount()
    expect(text(vm, '.item-title'))
      .toEqual('Add a new field')
    expect(text(vm, '.item-description'))
      .toEqual('Field should be called "Gender"')
  })
})
