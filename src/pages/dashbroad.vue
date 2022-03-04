<template>
  <div>
    <ListCovac />
  </div>
</template>
<script>
import ListCovac from '../components/ListCovac.vue'
export default {
  components: {
    ListCovac
  },
  computed: {
    userAccount() {
      return this.$store.getters.get("userAccount");
    },
  },
};
</script>
