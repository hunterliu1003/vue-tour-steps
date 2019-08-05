<template lang="pug" functional>
  div.tour-wrapper(
    :class="[data.class, data.staticClass]"
    :style="{\
      top: `${props.y - props.strokeWidth / 2}px`,\
      left: `${props.x - props.strokeWidth / 2}px`,\
      width: `${props.maskWidth + props.strokeWidth}px`,\
      height: `${props.maskHeight + props.strokeWidth}px`\
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
