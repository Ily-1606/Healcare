<template>
  <div>
    <div class="max-w-4xl mx-auto p-4 md:mt-20 space-y-5">
      <div class="mmx-auto p-4 border rounded-md">
        <div class="text-xl">Kết quả cho từ khóa: {{$route.query.q}}</div>
        <div class="mt-10 space-y-4" v-if="res">
          <div class="mt-10 space-y-4">
          <div v-for="(covac, index) in res" :key="index">
            <CovacItem :covac="covac" v-if="covac.name" />
          </div>
        </div>
        </div>
        <div v-else>
          <div class="text-red-500">Không có kết quả</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CovacItem from "./covacItem.vue";
export default {
  components: {
    CovacItem
  },
  data() {
    return {
      res: null,
    };
  },
  computed: {
    covacConnection() {
      return this.$store.getters.get("storeCovac");
    },
    q() {
      return this.$route.query.q;
    },
  },
  watch: {
    "$route.query.q": {
      handler: function () {
        if (this.covacConnection) {
          this.fetchData();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async fetchData() {
      console.log(this.idConstract);
      const res = await this.covacConnection.methods
        .search(this.q)
        .call();
      this.res = res;
    },
  },
  async mounted() {
    await this.$store.dispatch("initWeb3");
    this.fetchData();
  },
};
</script>
