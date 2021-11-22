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
      const fullSrc = img.src
      const tinySrc = img.dataset.tinySrc

      const piWrapper = document.createElement('span')
      piWrapper.className = 'progressive-img_capturer progressive-img_wrapper'

      const piTiny = document.createElement('canvas')
      piTiny.className = 'progressive-img_tiny progressive-img_filter-blur'
      piTiny.width = width
      piTiny.height = height

      const tinyImg = new Image()
      tinyImg.onload = () => {
        const ctx = piTiny.getContext('2d')
        ctx.drawImage(tinyImg, 0, 0, tinyImg.naturalWidth, tinyImg.naturalHeight, 0, 0, width, height);
      }
      tinyImg.src = tinySrc

      const piFull = document.createElement('img')
      piFull.className = 'progressive-img_full progressive-img_hidden'
      piFull.width = width
      piFull.height = height
      piFull.dataset.fullSrc = fullSrc
      piFull.onload = () => {
        piFull.classList.remove('progressive-img_hidden')
        piTiny.classList.add('progressive-img_hidden')

        img.attributes.forEach(attr => {
          if (!piFull.getAttribute(attr.name)) {
            piFull.setAttribute(attr.name, attr.value)
          }
        })

        if (img.getAttribute('class')) {
          piFull.classList.add(img.getAttribute('class'))
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
