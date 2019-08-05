<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    :class="direction"
  >
    <defs>
      <path
        id="ic_arrow-b"
        d="M10.0517241,1.362 L12.7538978,-1.5 L25.5,12 L12.7538978,25.5 L10.0517241,22.638 L20.0956527,12 L10.0517241,1.362 Z M1.5,5.28875 L3.18885854,3.5 L11.1551724,11.9375 L3.18885854,20.375 L1.5,18.58625 L7.77745533,11.9375 L1.5,5.28875 Z"
      />
      <filter
        id="ic_arrow-a"
        width="150%"
        height="144.4%"
        x="-25%"
        y="-22.2%"
        filterUnits="objectBoundingBox"
      >
        <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation="2"
        />
        <feColorMatrix
          in="shadowBlurOuter1"
          values="0 0 0 0 1   0 0 0 0 0.901960784   0 0 0 0 0.745098039  0 0 0 1 0"
        />
      </filter>
    </defs>
    <g fill="none" fill-rule="evenodd" transform="matrix(0 -1 -1 0 30.5 31.5)">
      <use fill="#000" filter="url(#ic_arrow-a)" xlink:href="#ic_arrow-b" />
      <use fill="#CBBD8E" xlink:href="#ic_arrow-b" />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'top'
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  transform: rotate(0);
}
.right {
  transform: rotate(90deg);
}
.bottom {
  transform: rotate(180deg);
}
.left {
  transform: rotate(270deg);
}
</style>
