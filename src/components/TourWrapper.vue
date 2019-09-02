<template lang="pug" functional>
  .tour-wrapper(
    :class="[data.class, data.staticClass]"
    :style="{\
      top: `${props.y + props.offsetY - props.paddingTop}px`,\
      left: `${props.x + props.offsetX - props.paddingLeft}px`,\
      width: `${props.maskWidth + props.paddingLeft + props.paddingRight}px`,\
      height: `${props.maskHeight + props.paddingTop + props.paddingBottom}px`\
    }"
  )
    slot
</template>

<script>
import TourMixin from './TourMixin'
export default {
  mixins: [TourMixin]
}
</script>

<style lang="scss" scoped>
.tour-wrapper {
  position: fixed;
  pointer-events: none;
  box-sizing: border-box;
}
</style>
