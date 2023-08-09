import { mount } from '@vue/test-utils'
import Blog from '@/components/Blog.vue'

describe("Blog.vue", () => {
  it("should blog data json", () => {
    const wrapper = mount(Blog);
    const blog = wrapper.get('[data-test="entrie"]');
    expect(blog.get('id')).toHaveLength > 0;
  })
})