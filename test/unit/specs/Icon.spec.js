import { shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'
import Icon from '@/components/icon'

describe('Icon.vue', () => {
  let cmp

  beforeEach(() => {
    cmp = shallow(Icon, {
      propsData: {
        name: 'type'
      }
    })
  })

  it('equals name to `type`', () => {
    expect(cmp.vm.name).toEqual('type')
  })

  it('should render correct contents', () => {
    const renderer = createRenderer()
    renderer.renderToString(cmp.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})
