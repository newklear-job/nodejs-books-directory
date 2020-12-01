import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import BookForm from '@/components/Books/Form.vue'

describe('Form.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(BookForm, {
      props: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
