<template>
  <div>
    <h1>Vue Tour Steps</h1>
    <p>Guide your users through a tour of your app.</p>
    <div
      style="width: 100%; display: flex; flex-direction: column;align-items:center;"
    >
      <button @click="showTour = true">open tour-steps</button>
      <p style="width: 200px;" v-for="i in 2" :key="i">
        Duo amet elitr elitr.
      </p>
      <p
        id="tourStep1"
        style="width: 200px; height: 100px; background: gray; display: flex; justify-content: center; align-items: center;"
      >
        Duo amet elitr elitr.
      </p>
      <p id="tourStep2" style="width: 200px;">Duo amet elitr elitr.</p>
      <p style="width: 400px;">
        Sed ut gubergren gubergren rebum tempor sed. Dolor stet justo dolore
        dolores rebum et elitr amet dolores. Clita dolore invidunt ipsum et kasd
        lorem takimata, sadipscing eos et et rebum consetetur ea, sit et ipsum
        vero nonumy, at sed sed aliquyam invidunt duo dolores consetetur kasd
        ipsum, et justo at invidunt dolores erat lorem, at lorem amet diam et
        sed. Consetetur accusam eos diam ea dolores aliquyam consetetur. Magna
        nonumy nonumy voluptua labore amet. At eirmod diam justo amet. Invidunt
        aliquyam justo dolor est sit. Erat magna et gubergren justo dolore, eos
        consetetur lorem elitr sit tempor rebum gubergren, justo.
      </p>
      <p id="tourStep3" style="width: 200px;">Duo amet elitr elitr.</p>
    </div>
    <TourSteps
      v-if="showTour"
      :steps="steps"
      :step="step"
      @setStep="
        s => {
          step = s
        }
      "
      @close="showTour = false"
      wrapperClass="tour-wrapper-animation"
    >
      <template v-slot:wrapper="slotProps">
        <div style="position: fixed;top: 0;left:0; width: 100%;height: 100%;">
          <div
            style="color: #fff; position: absolute; bottom: 23px; left: 50%;transform: translate(-50%,0);"
          >
            -click to go next step-
          </div>
        </div>
      </template>

      <template v-slot:popper="slotProps">
        <div
          :style="{
            width: '300px',
            height: '100px',
            display: 'flex',
            'flex-direction': 'column',
            'align-items': 'center'
          }"
          @click="slotProps.setStep(step + 1)"
        >
          <IconArrow />
          <p>some infomation</p>
          <div @click.stop>
            <button @click="slotProps.setStep(step - 1)">prev</button>
            <button @click="slotProps.setStep(step + 1)">next</button>
            <button @click="slotProps.close()">skip</button>
          </div>
        </div>
      </template>
    </TourSteps>
  </div>
</template>

<script>
import TourSteps from '@/components/TourSteps.vue'
import IconArrow from '@/components/IconArrow.vue'

export default {
  name: 'app',
  components: {
    TourSteps,
    IconArrow
  },
  data: () => ({
    showTour: false,
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
  })
}
</script>

<style lang="scss">
body {
  background: #000;
}
h1,
p {
  color: #fff;
  text-align: center;
}
</style>

<style lang="scss" scoped>
>>> .tour-wrapper-animation:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 5px 2px rgba(255, 230, 190, 0.66);
  border-radius: 4px;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0%,
    100% {
      box-shadow: inset 0 0 5px 2px rgba(255, 230, 190, 0.66);
    }
    50% {
      box-shadow: inset 0 0 20px 2px rgba(255, 230, 190, 0.66);
    }
  }
}
</style>
