<template lang="pug">
  svg.tour-mask(:class="{ 'hide-overlay': hideOverlay }" v-on='$listeners')
    defs
      mask#tourMask
        rect(fill='#fff' height='100%' width='100%')
        path(:d='\
          rightRoundedRect(\
            x + radius - strokeWidth / 2,\
            y - strokeWidth / 2,\
            maskWidth + strokeWidth,\
            maskHeight + strokeWidth,\
            radius\
          )\
          ' stroke='#000' :stroke-width='0'
        )
    rect(
      height='100%' 
      width='100%' 
      x='0' 
      y='0' 
      :mask="hideOverlay ? 'none' : 'url(#tourMask)'"
    )
</template>

<script>
import TourMixin from './TourMixin'
export default {
  mixins: [TourMixin],
  props: {
    hideOverlay: { type: Boolean, default: false }
  },
  methods: {
    rightRoundedRect(x, y, width, height, radius) {
      return `M${x},${y} 
        h${width - 2 * radius} 
        a${radius},${radius} 0 0 1 ${radius},${radius}
        v${height - 2 * radius}
        a${radius},${radius} 0 0 1 ${-radius},${radius}
        h${2 * radius - width} 
        a${radius},${radius} 0 0 1 ${-radius},${-radius}
        v${2 * radius - height}
        a${radius},${radius} 0 0 1 ${radius},${-radius}
        z
        `
    }
  }
}
</script>

<style>
.tour-mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  opacity: 0.5;
  /* pointer-events: none; */
}
.hide-overlay {
  opacity: 0;
}
</style>
