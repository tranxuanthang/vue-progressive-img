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

    onMounted(() => {
      initIntersectionObserver()
    })

    onBeforeUnmount(() => {
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
