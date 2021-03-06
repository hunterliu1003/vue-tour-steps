<template lang="pug">
  div(v-if="isActive")
    TourMask(
      v-bind='bindTour' 
      :hideOverlay='tour.hideOverlay' 
      @click='!tour.persistent && setStep(step + 1)'
    )
    TourWrapper(v-bind='bindTour' :class='wrapperClass')
      slot(name='wrapper' v-bind='bindScopedSlots')
      TourPopper(
        :placement='tour.placement' 
        :offsetX='tour.popperOffsetX' 
        :offsetY='tour.popperOffsetY'
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
    value: {
      type: Boolean,
      default: false
    },
    steps: {
      /**
        [{
          target          String  default null
          radius          Number  default 0
          hideOverlay     Boolean default false
          persistent      Boolean default false
          lockScroll      Boolean default true
          placement String  default 'top'
          offsetX   Number  default 0
          offsetY   Number  default 0
          popperOffsetX   Number  default 0
          popperOffsetY   Number  default 0
        }, ...]
      */
      type: Array,
      default: () => []
    },
    step: { type: Number, default: 0 },
    wrapperClass: { type: String, default: '' }
  },
  data: () => ({
    isActive: false,
    x: 0,
    y: 0,
    maskWidth: 0,
    maskHeight: 0,
    $targetElement: null
  }),
  computed: {
    tour() {
      return {
        target: null,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        radius: 0,
        hideOverlay: false,
        persistent: false,
        lockScroll: true,
        placement: 'top',
        offsetX: 0,
        offsetY: 0,
        popperOffsetX: 0,
        popperOffsetY: 0,
        beforeStep: () => {},
        afterStep: () => {},
        ...this.steps[this.step]
      }
    },
    bindTour() {
      const { x, y, maskWidth, maskHeight, tour } = this
      return {
        x,
        y,
        offsetX: tour.offsetX,
        offsetY: tour.offsetY,
        maskWidth,
        maskHeight,
        paddingLeft: tour.paddingLeft,
        paddingRight: tour.paddingRight,
        paddingTop: tour.paddingTop,
        paddingBottom: tour.paddingBottom,
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
    value: {
      handler(val) {
        this.$nextTick(() => {
          this.isActive = !!val
        })
      },
      immediate: true
    },
    isActive(val) {
      val ? this.handleShow() : this.handleHide()
    },
    step: 'handleStep',
    'tour.target': 'handleTarget',
    'tour.lockScroll'(val) {
      val ? disableBodyScroll(this.$targetElement) : clearAllBodyScrollLocks()
    }
  },
  beforeDestroy() {
    this.handleHide()
  },
  methods: {
    handleShow() {
      this.tour.beforeStep()
      this.setTour()
      this.scrollIntoView(this.$targetElement)
      window.addEventListener('resize', this.setTour, false)
      window.addEventListener('scroll', this.setTour, true)
    },
    handleHide() {
      clearAllBodyScrollLocks()
      window.removeEventListener('resize', this.setTour, false)
      window.removeEventListener('scroll', this.setTour, true)
    },
    handleStep(newVal, oldVal) {
      this.isActive &&
        newVal > oldVal &&
        this.steps[oldVal].afterStep &&
        this.steps[oldVal].afterStep()
      if (this.handleClose()) return
      this.isActive && newVal > oldVal && this.tour.beforeStep()
      this.setTour()
      this.scrollIntoView(this.$targetElement)
    },
    handleTarget() {
      if (this.handleClose()) return
      this.setTour()
      this.scrollIntoView(this.$targetElement)
    },
    setStep(step) {
      this.$emit('setStep', step)
    },
    handleClose() {
      if (!this.steps[this.step]) {
        this.close()
        return true
      }
    },
    close() {
      this.$emit('input', false)
      this.$nextTick(() => {
        this.setStep(0)
      })
    },
    setTour() {
      this.$targetElement = document.querySelector(this.tour.target)
      if (!this.$targetElement) {
        this.setStep(this.step + 1)
        return
      }
      if (this.tour.lockScroll) disableBodyScroll(this.$targetElement)
      const rect = this.$targetElement.getBoundingClientRect()
      this.x = rect.left
      this.y = rect.top
      this.maskWidth = this.$targetElement.offsetWidth
      this.maskHeight = this.$targetElement.offsetHeight
    },
    scrollIntoView($targetElement) {
      this.$nextTick(() => {
        this.isActive && // when closing tour should not scroll into first step
          $targetElement &&
          $targetElement.scrollIntoView({
            block: 'end',
            inline: 'nearest',
            behavior: 'smooth'
          })
      })
    }
  }
}
</script>
