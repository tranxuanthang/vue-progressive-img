import component from './progressive-img.vue'
import directive from './directive.js'
import { createFilterElement } from './utils.js'

const plugin = {
  install: (app, options) => {
    app.component('progressive-img', component)
    app.directive('progressive-img', directive)

    createFilterElement()
  }
}

export {
  component as ProgressiveImgComponent,
  directive as ProgressiveImgDirective,
  plugin as ProgressiveImgPlugin
}
