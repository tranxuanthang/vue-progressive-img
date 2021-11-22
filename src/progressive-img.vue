<template>
  <span
    ref="pilElement"
    class="progressive-img_wrapper"
    :class="wrapperClass"
  >
    <canvas
      ref="canvasElement"
      :width="width"
      :height="height"
      class="progressive-img_tiny progressive-img_filter-blur"
      :class="{ 'progressive-img_hidden': isLoaded }"
      :style="{
        backgroundImage: `url('${tinySrc}')`,
        backgroundSize: '100% 100%'
        }"
    ></canvas>

    <img
      v-if="shouldLoad"
      class="progressive-img_full"
      :class="{ 'progressive-img_hidden': !isLoaded }"
      :src="src"
      :width="width"
      :height="height"
      @load="originalImageLoaded(index)"
      alt=""
      v-bind="$attrs"
    >
  </span>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  inheritAttrs: false,

  props: {
    width: Number,
    height: Number,
    src: String,
    tinySrc: String,
    wrapperClass: [String, Object],
  },

  setup (props) {
    const shouldLoad = ref(false)
    const isLoaded = ref(false)
    const pilElement = ref(null)
    const canvasElement = ref(null)
    let tinyImage = null
    let observer = null

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          shouldLoad.value = true

          observer.disconnect()
        }
      })
    }

    const initIntersectionObserver = () => {
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(observerCallback)
        observer.observe(pilElement.value)
      } else {
        shouldLoad.value = true
      }
    }

    const originalImageLoaded = () => {
      isLoaded.value = true
    }

    const onTinyImageLoaded = () => {
      const ctx = canvasElement.value.getContext('2d')
      ctx.drawImage(tinyImage, 0, 0, tinyImage.naturalWidth, tinyImage.naturalHeight, 0, 0, props.width, props.height);
      tinyImage.removeEventListener('load', onTinyImageLoaded)
    }

    const createPlaceholder = () => {
      // tinyImage = new Image()
      // tinyImage.src = props.tinySrc
      // tinyImage.addEventListener('load', onTinyImageLoaded)
    }


    onMounted(() => {
      createPlaceholder()
      initIntersectionObserver()
    })

    onBeforeUnmount(() => {
      tinyImage.removeEventListener('load', onTinyImageLoaded)
      if (observer) {
        observer.disconnect()
      }
    })

    return {
      originalImageLoaded,
      pilElement,
      shouldLoad,
      isLoaded,
      canvasElement
    }
  }
}
</script>

<style>
/* @import './styles.css'; */
</style>
