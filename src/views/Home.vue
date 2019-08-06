<template lang="pug">
  div
    h1 Vue Tour Steps
    p Guide your users through a tour of your app.
    div(style='width: 100%; display: flex; flex-direction: column;align-items:center;')
      button open tour-steps
      p(style='width: 200px;' v-for='i in 2' :key='i')
        | Duo amet elitr elitr.
      p#tourStep1(style='width: 200px; height: 100px; background: gray; display: flex; justify-content: center; align-items: center;')
        | Duo amet elitr elitr.
      p#tourStep2(style='width: 200px;') Duo amet elitr elitr.
      p(style='width: 400px;')
        | Sed ut gubergren gubergren rebum tempor sed. Dolor stet justo dolore
        | dolores rebum et elitr amet dolores. Clita dolore invidunt ipsum et kasd
        | lorem takimata, sadipscing eos et et rebum consetetur ea, sit et ipsum
        | vero nonumy, at sed sed aliquyam invidunt duo dolores consetetur kasd
        | ipsum, et justo at invidunt dolores erat lorem, at lorem amet diam et
        | sed. Consetetur accusam eos diam ea dolores aliquyam consetetur. Magna
        | nonumy nonumy voluptua labore amet. At eirmod diam justo amet. Invidunt
        | aliquyam justo dolor est sit. Erat magna et gubergren justo dolore, eos
        | consetetur lorem elitr sit tempor rebum gubergren, justo.
      p#tourStep3(style='width: 200px;') Duo amet elitr elitr.

</template>

<style lang="scss">
body {
  background: #000;
}
h1,
p {
  color: #fff;
  text-align: center;
}

.tour-wrapper-animation:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 5px 2px rgba(255, 230, 190, 0.66);
  border-radius: 4px;
  animation: tour-wrapper-animation 1.5s infinite;

  @keyframes tour-wrapper-animation {
    0%,
    100% {
      box-shadow: inset 0 0 5px 2px rgba(255, 230, 190, 0.66);
    }
    50% {
      box-shadow: inset 0 0 20px 2px rgba(255, 230, 190, 0.66);
    }
  }
}
.wrapper-inner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.any-key {
  position: absolute;
  bottom: 23px;
  left: 50%;
  transform: translate(-50%, 0);
  opacity: 1;
  color: #fff;
  animation: any-key 1.5s infinite;
  @keyframes any-key {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.75;
    }
  }
}
.popper-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  span {
    color: #cbbd8e;
    text-shadow: 0 0 4px rgba(255, 230, 190, 0.66);
    text-align: center;
  }
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
