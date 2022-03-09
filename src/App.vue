<template>
  <div>
    <div  class="bg-app bg-bottom bg-no-repeat fixed inset-0 -z-10 bg-slate-50"></div>
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
