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
        strokeWidth: 10,
        radius: 4,
        persistent: true,
        placement: 'bottom',
        offsetY: 10
      },
      {
        target: '#tourStep2',
        strokeWidth: 4,
        radius: 4,
        hideOverlay: true,
        lockScroll: false
      },
      {
        target: '#tourStep3',
        strokeWidth: 4,
        radius: 4
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
