const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.querySelector('img')
      target.src = target.dataset.fullSrc
    }
  })
}

export default {
  beforeMount(el, binding) {
    el.observer = null

    if ('IntersectionObserver' in window) {
      el.observer = new IntersectionObserver(observerCallback)
    }

    const selector = binding.value
    const imgs = el.querySelectorAll(selector)

    imgs.forEach(img => {
      const width = img.width
      const height = img.height
      const fullSrc = img.src || img.dataset.fullSrc
      const tinySrc = img.dataset.tinySrc

      if (!width || !height || !tinySrc) {
        return
      }

      // Set src to blank to prevent original image from loading
      img.src = ''

      const piWrapper = document.createElement('span')
      piWrapper.className = 'progressive-img_capturer progressive-img_wrapper'

      const piTiny = document.createElement('canvas')
      piTiny.className = 'progressive-img_tiny progressive-img_filter-blur'
      piTiny.width = width
      piTiny.height = height
      piTiny.style.backgroundImage = `url('${tinySrc}')`
      piTiny.style.backgroundSize = '100% 100%'

      const piFull = document.createElement('img')
      piFull.className = 'progressive-img_full progressive-img_hidden'
      piFull.width = width
      piFull.height = height
      piFull.dataset.fullSrc = fullSrc
      piFull.onload = () => {
        piFull.classList.remove('progressive-img_hidden')
        piTiny.classList.add('progressive-img_hidden')

        // Add back attributes from original element
        img.attributes.forEach(attr => {
          if (!piFull.getAttribute(attr.name)) {
            piFull.setAttribute(attr.name, attr.value)
          }
        })

        // Add back classes from original element
        if (img.getAttribute('class')) {
          img.classList.forEach(cl => {
            piFull.classList.add(cl)
          })
        }
      }

      piWrapper.appendChild(piTiny)
      piWrapper.appendChild(piFull)

      img.replaceWith(piWrapper)

      if (el.observer) {
        el.observer.observe(piWrapper)
      } else {
        piFull.src = fulSrc
        piFull.classList.remove('progressive-img_hidden')
        piTiny.classList.add('progressive-img_hidden')
      }
    })
  },

  beforeUnmount(el, binding) {
    if (el.observer) {
      el.observer.disconnect()
    }
  }
}
