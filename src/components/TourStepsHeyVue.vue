<template lang="pug">
	TourSteps#tourStepsHeyVue(
		v-model="showTour"
		:steps='steps' 
		:step='step' 
		@setStep='s => { step = s }'
		wrapperClass='tour-wrapper-animation'
	)
		template(v-slot:wrapper='slotProps')
			div.wrapper-inner
				div.any-key
					| -click to go next step-
		template(v-slot:popper='slotProps')
			div.popper-inner(
				:style="{ width: '300px', height: '100px', display: 'flex', 'flex-direction': 'column', 'align-items': 'center' }" 
				@click='slotProps.setStep(step + 1)'
			)
				IconArrow
				span some infomation
				div(@click.stop='')
					button(@click='slotProps.setStep(step - 1)') prev
					button(@click='slotProps.setStep(step + 1)') next
					button(@click='slotProps.close()') skip
</template>

<script>
import TourSteps from '@/components/TourSteps'
import IconArrow from '@/components/IconArrow.vue'

export default {
  components: {
    TourSteps,
    IconArrow
  },
  data: () => ({
    showTour: true,
    step: 0,
    steps: [
      {
        target: '#tourStep1',
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 30,
        paddingLeft: 40,
        radius: 4,
        persistent: true,
        placement: 'bottom',
        lockScroll: false,
        offsetY: -10,
        popperOffsetY: 10,
        beforeStep() {
          console.log('before: #tourStep1')
        },
        afterStep() {
          console.log('after: #tourStep1')
        }
      },
      {
        target: '#tourStep2',
        radius: 4,
        hideOverlay: true,
        lockScroll: true,
        beforeStep() {
          console.log('before: #tourStep2')
        },
        afterStep() {
          console.log('after: #tourStep2')
        }
      },
      {
        target: '#tourStep3',
        radius: 4,
        beforeStep() {
          console.log('before: #tourStep3')
        },
        afterStep() {
          console.log('after: #tourStep3')
        }
      }
    ]
  }),
  mounted() {
    setTimeout(() => {
      this.showTour = true
    }, 1000)
  }
}
</script>
