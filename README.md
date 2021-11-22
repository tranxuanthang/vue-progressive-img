# vue-progressive-img

![Peek 2021-11-23 00-06](https://user-images.githubusercontent.com/15942946/142904401-28c22329-2e7f-45f8-9655-307f0aef4be2.gif)

Progressive Image Loading plugin for Vue 3

## Example/Demo
- https://github.com/tranxuanthang/cat-pics-pil
- https://awesome-shirley-c6c0a7.netlify.app/

## Installation
Install the package:


```shell
# npm
npm install --save vue-progressive-img

# yarn
yarn add vue-progressive-img
```

Initialize the plugin:

```diff
  import { createApp } from 'vue'
  import App from './App.vue'
+ import { ProgressiveImgPlugin } from 'vue-progressive-img'
+ import 'vue-progressive-img/src/styles.css'

  const app = createApp(App)
+ app.use(ProgressiveImgPlugin)
  app.mount('#app')
```

## Usage

Use `ProgressiveImg` component:

```vue
<template>
  <progressive-img
    tiny-src="60px-width-image.jpg"
    src="full-image.jpg"
    width="1280"
    height="720"
    alt="Image description"
    ...
  />
</template>
```

Or use directive:
```vue
<template>
  <span class="block flex justify-center mb-6 mx-auto max-h-[50vh]"
    v-for="(image, index) in images"
    :key="index"
  >
    <img
      :data-tiny-src="image.tinyUrl"
      :data-full-src="image.fullUrl"
      :width="image.width"
      :height="image.height"
      :alt="image.description"
    />
  </span>
</template>
```
