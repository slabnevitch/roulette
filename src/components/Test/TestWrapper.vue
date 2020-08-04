<template>
  <section class="test ">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'TestWrapper',
};
</script>

<style>
.test {
  padding: 1rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: #907EFF;
  box-shadow: 0 0 15px rgba(144, 126, 255, 0.39);
  border-radius: 21px;
}
</style>