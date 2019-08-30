<template lang="pug">
	#tourGroup
		button(@click="showTourStepsHeyVue = true") open tour-steps
		TourStepsHeyVue(v-if="showTourStepsHeyVue")
</template>

<script>
import TourStepsHeyVue from '@/components/TourStepsHeyVue'
export default {
  components: {
    TourStepsHeyVue
  },
  data: () => ({
    showTourStepsHeyVue: false
  })
}
</script>
