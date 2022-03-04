<template>
  <div>
    <Header />
    <div class="container mx-auto">
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from "./components/header.vue";
export default{
  components: {
    Header
  },
  computed: {
    userAccount() {
      return this.$store.getters.get("userAccount");
    },
  },
}
</script>
