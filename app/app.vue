<script lang="ts" setup></script>

<template>
  <div>
    <h1>測試<span>scss</span></h1>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: $primary;
  span {
    @include Head1-medium;
  }
}
</style>
