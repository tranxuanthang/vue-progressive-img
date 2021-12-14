import component from './progressive-img.vue'
import directive from './directive.js'
import { createFilterElement } from './utils.js'

const plugin = {
  install (Vue, options) {
    Vue.component('progressive-img', component)
    Vue.directive('progressive-img', directive)

    createFilterElement()
  }
}

export {
  component as ProgressiveImgComponent,
  directive as ProgressiveImgDirective,
  plugin as ProgressiveImgPlugin
}
