<template>
  <span
    ref="pilElement"
    class="progressive-img_wrapper"
    :class="wrapperClass"
  >
    <canvas
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
      @load="originalImageLoaded"
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
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    tinySrc: {
      type: String,
      required: true
    },
    wrapperClass: {
      type: [String, Object],
      default: ''
    }
  },

  data () {
    shouldLoad: false,
    isLoaded: false,
    observer: null
  },

  mounted () {
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.shouldLoad = true

          observer.disconnect()
        }
      })
    }

    const initIntersectionObserver = () => {
      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver(observerCallback)
        this.observer.observe(this.$refs.pilElement.value)
      } else {
        this.shouldLoad = true
      }
    }

    this.initIntersectionObserver()
  },

  methods: {
    originalImageLoaded () {
      this.isLoaded = true
    }
  },

  beforeDestroy () {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}
</script>
