<template lang="pug">
  div.tour-popper(:style='style')
    slot
</template>

<script>
export default {
  props: {
    placement: { type: String, default: 'top' },
    // placement  String top, topLeft, topRight, right, rightTop, rightBottom, bottom, bottomLeft, bottomRight, left, leftTop, leftBottom'
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 }
  },
  computed: {
    style() {
      const style = {
        transform: `translate(0, 0)`
      }
      switch (this.placement) {
        case 'top':
          style.bottom = '100%'
          style.left = '50%'
          style.transform = `translate(-50%, 0)`
          break
        case 'topLeft':
          style.bottom = '100%'
          style.left = 0
          break
        case 'topRight':
          style.bottom = '100%'
          style.right = 0
          break
        case 'right':
          style.left = '100%'
          style.top = '50%'
          style.transform = `translate(0, -50%)`
          break
        case 'rightTop':
          style.left = '100%'
          style.top = 0
          break
        case 'rightBottom':
          style.left = '100%'
          style.bottom = 0
          break
        case 'bottom':
          style.top = '100%'
          style.left = '50%'
          style.transform = `translate(-50%, 0)`
          break
        case 'bottomLeft':
          style.top = '100%'
          style.left = 0
          break
        case 'bottomRight':
          style.top = '100%'
          style.right = 0
          break
        case 'left':
          style.top = '50%'
          style.right = '100%'
          style.transform = `translate(0, -50%)`
          break
        case 'leftTop':
          style.top = 0
          style.right = '100%'
          break
        case 'leftBottom':
          style.bottom = 0
          style.right = '100%'
          break
      }
      style.transform += ` translate(${this.offsetX}px, ${this.offsetY}px)`
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
.tour-popper {
  position: absolute;
  pointer-events: auto;
}
</style>
