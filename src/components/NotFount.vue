<template>
  <div class="not-fount">
    <div class="img-box">
      <img src="@/assets/404.png" alt="fit" />
    </div>
    <h2>{{text}}</h2>
  </div>
</template>
<script>
export default {
  props: ["text"],
};
</script>
<style lang="scss" scoped>
.not-fount {
  .img-box {
    text-align: center;
    img {
      max-width: 250px;
      width: 100%;
      height: auto;
    }
  }
  h2 {
    text-align: center;
  }
}
</style>