<template>
  <div>
    <div class="max-w-4xl mx-auto p-4 border rounded-md md:mt-20 space-y-5 bg-white/60 backdrop-blur-md">
      <div
        class="py-2 bg-blue-500 text-white uppercase font-bold rounded-md p-2 text-center"
      >
        Quản lý covac
      </div>
      <div class="mt-10 space-y-4">
          <div v-for="(covac, index) in listCovac" :key="index">
            <CovacItem :covac="covac"/>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import CovacItem from './covacItem.vue'
export default {
  components: {
    CovacItem
  },
  data() {
    return {
      countCovac: null,
      listCovac: [],
    };
  },
  computed: {
    covacConnection() {
      return this.$store.getters.get("storeCovac");
    },
  },
  methods: {
      async fetchData(){
          for(let i = 0; i < this.countCovac; i++){
            const covac = await this.covacConnection.methods.covac(i).call();
            this.listCovac.push(covac)
        }
      }
  },
  async mounted() {
    await this.$store.dispatch("initWeb3");
    this.countCovac = await this.covacConnection.methods.covacCount().call();
    this.countCovac = parseInt(this.countCovac)
    if (this.countCovac) {
        await this.fetchData()
    } else {
      this.$toast.open({
        message: "Không có chứng nhận covac nào cả!",
        type: "warning",
        duration: 5000,
      });
    }
  },
};
</script>
