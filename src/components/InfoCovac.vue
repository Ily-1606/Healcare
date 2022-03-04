<template>
  <div ref="bg">
    <div class="max-w-4xl mx-auto p-4 md:mt-10 space-y-5">
      <div
        class="mx-auto p-4 border rounded-md"
        :class="{ 'bg-blue-500': countVacin >= 2 || countVacinQR >=2 }"
      >
        <div class="flex space-x-5 items-center">
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="https://assets5.lottiefiles.com/packages/lf20_6pawzxxs.json"
            style="max-width: 300px"
          >
          </lottie-player>
          <div class="text-xl text-center font-bold flex-auto">
            Bạn đã tiêm {{ countVacin || countVacinQR }} mũi vacin
          </div>
        </div>
      </div>
      <div
        class="md:flex items-center md:space-x-10 border rounded-md p-4 space-y-10"
        v-if="res"
      >
        <div class="">
          <QRCode :data="qrURL" v-if="countVacin || countVacinQR" />
        </div>
        <div class="space-y-4">
          <div class="text-xl flex space-x-6">
            <div class="md:w-40">Họ và tên</div>
            <div class="flex-auto">
              {{ res.name }}
            </div>
          </div>
          <div class="flex space-x-6">
            <div class="md:w-40">Loại vacin</div>
            <div class="flex-auto">
              {{ res.nameVacin }}
            </div>
          </div>
          <div class="flex space-x-6">
            <div class="md:w-40">Ngày tiêm</div>
            <div class="flex-auto">
              {{ res.dateInjections }}
            </div>
          </div>
          <div class="flex space-x-6">
            <div class="md:w-40">Ngày thêm vào hệ thống</div>
            <div class="flex-auto">
              {{ new Date(parseInt(res.insertDate)) }}
            </div>
          </div>
          <div class="flex space-x-6">
            <div class="md:w-40">Người thêm</div>
            <div class="flex-auto text-ellipsis overflow-hidden">
              {{ res.userCreator }}
            </div>
          </div>
          <div class="flex space-x-6">
            <div class="md:w-40">CMND</div>
            <div class="flex-auto">
              {{ res.cardID }}
            </div>
          </div>
          <div class="flex space-x-6">
            <div class="md:w-40">Giới tính</div>
            <div class="flex-auto">
              {{ res.gender == 1 ? "Nam" : "Nữ" }}
            </div>
          </div>
          <div class="flex space-x-6">
            <div class="md:w-40">BHYT số</div>
            <div class="flex-auto">
              {{ res.healID }}
            </div>
          </div>
          <div class="flex space-x-6">
            <div class="md:w-40">Ngày sinh</div>
            <div class="flex-auto">
              {{ res.birthDate }}
            </div>
          </div>
          <div class="flex space-x-6">
            <div class="md:w-40">Quê quán</div>
            <div class="flex-auto">
              {{ res.userAddress }}
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 mx-auto p-4 border rounded-md">
        <div class="text-xl">Các mũi liên quan</div>
        <div class="mt-10 space-y-4">
          <div v-for="(covac, index) in relativeCovac" :key="index">
            <CovacItem
              :covac="covac"
              v-if="covac.id != idConstract && covac.name"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CovacItem from "./covacItem.vue";
import QRCode from "./QRCode.vue";
export default {
  components: {
    QRCode,
    CovacItem,
  },
  data() {
    return {
      res: null,
      relativeCovac: [],
      countVacinQR: 0
    };
  },
  computed: {
    idConstract() {
      return this.$route.params.id;
    },
    qrURL() {
      const data = {
        countVacin: this.countVacin || this.countVacinQR,
        data: this.res
      }
      console.log(data);
      const str_data = btoa(encodeURIComponent(JSON.stringify(data)))
      if (window.location.port) {
        return `${window.location.protocol}//${window.location.hostname}:${window.location.port}/infoCovac/?data=${str_data}&source=shareWithQR`;
      } else {
        return `${window.location.protocol}//${window.location.hostname}/infoCovac/?data=${str_data}&source=shareWithQR`;
      }
    },
    covacConnection() {
      return this.$store.getters.get("storeCovac");
    },
    countVacin() {
      return this.relativeCovac.filter((el) => el.name).length;
    },
  },
  watch: {
    "$route.params.id": {
      handler: function () {
        if (this.covacConnection) {
          this.fetchData();
          this.getRelativeCovac();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async fetchData() {
      const res = await this.covacConnection.methods
        .covac(this.idConstract)
        .call();
      this.res = res;
    },
    async getRelativeCovac() {
      const res = await this.covacConnection.methods
        .getUserCovac(this.idConstract)
        .call();
      this.relativeCovac = res;
    },
    decodeData(){
      const res = JSON.parse(decodeURIComponent(atob(this.$route.query.data)))
      this.res = res.data;
      this.countVacinQR = res.countVacin
      console.log(res);
    }
  },
  async mounted() {
    await this.$store.dispatch("initWeb3");
    if(this.$route.params.id){
      this.fetchData();
      this.getRelativeCovac();
    }
    else{
      this.decodeData()
    }
  },
};
</script>
