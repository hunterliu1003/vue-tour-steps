<template lang="pug">
  div
    TourMask(
      v-bind='bindTour' 
      :hideOverlay='tour.hideOverlay' 
      @click='!tour.persistent && setStep(step + 1)'
    )
    TourWrapper(v-bind='bindTour' :class='wrapperClass')
      slot(name='wrapper' v-bind='bindScopedSlots')
      TourPopper(
        :placement='tour.placement' 
        :offsetX='tour.offsetX' 
        :offsetY='tour.offsetY'
      )
        slot(name='popper' v-bind='bindScopedSlots')
</template>

<script>
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import TourMask from './TourMask.vue'
import TourWrapper from './TourWrapper.vue'
import TourPopper from './TourPopper.vue'

export default {
  components: { TourMask, TourWrapper, TourPopper },
  props: {
    steps: {
      /**
        [{
          target          String  default ''
          strokeWidth     Number  default 0
          radius          Number  default 0
          hideOverlay     Boolean default false
          persistent      Boolean default false
          lockScroll      Boolean default true
          placement String  default 'top'
          offsetX   Number  default 0
          offsetY   Number  default 0
        }, ...]
      */
      type: Array,
      default: () => []
    },
    step: { type: Number, default: 0 },
    wrapperClass: { type: String, default: '' }
  },
  data: () => ({
    x: 0,
    y: 0,
    maskWidth: 0,
    maskHeight: 0,
    $targetElement: null
  }),
  computed: {
    tour() {
      return {
        target: '',
        strokeWidth: 0,
        radius: 0,
        hideOverlay: false,
        persistent: false,
        lockScroll: true,
        placement: 'top',
        offsetX: 0,
        offsetY: 0,

        ...this.steps[this.step]
      }
    },
    bindTour() {
      const { x, y, maskWidth, maskHeight, tour } = this
      return {
        x,
        y,
        maskWidth,
        maskHeight,
        strokeWidth: tour.strokeWidth,
        radius: tour.radius
      }
    },
    bindScopedSlots() {
      const { close, setStep } = this
      return {
        ...this.bindTour,
        close,
        setStep
      }
    }
  },
  watch: {
    step: 'setTour',
    'tour.lockScroll'(val) {
      val ? disableBodyScroll(this.$targetElement) : clearAllBodyScrollLocks()
    }
  },
  mounted() {
    this.setTour()
    this.$nextTick(() => {
      this.scrollIntoView(this.$targetElement)
      disableBodyScroll(this.$targetElement)
    })
    window.addEventListener('resize', this.setTour, false)
    window.addEventListener('scroll', this.setTour, true)
  },
  beforeDestroy() {
    clearAllBodyScrollLocks()
    window.removeEventListener('resize', this.setTour, false)
    window.removeEventListener('scroll', this.setTour, true)
  },
  methods: {
    setTour() {
      this.$targetElement = document.querySelector(this.tour.target)
      if (!this.$targetElement) {
        this.resetTour()
        return
      }
      const rect = this.$targetElement.getBoundingClientRect()
      this.x = rect.left
      this.y = rect.top
      this.maskWidth = this.$targetElement.offsetWidth
      this.maskHeight = this.$targetElement.offsetHeight
    },
    resetTour() {
      this.x = 0
      this.y = 0
      this.maskWidth = 0
      this.maskHeight = 0
    },
    setStep(step) {
      this.steps[step] ? this.$emit('setStep', step) : this.close()
      this.$nextTick(() => {
        this.scrollIntoView(this.$targetElement)
      })
    },
    close() {
      this.$emit('close')
      this.$emit('setStep', 0)
    },
    scrollIntoView($targetElement) {
      $targetElement &&
        $targetElement.scrollIntoView({
          block: 'end',
          inline: 'nearest',
          behavior: 'smooth'
        })
    }
  }
}
</script>
