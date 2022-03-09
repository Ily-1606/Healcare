<template>
  <div>
    <div class="max-w-4xl mx-auto p-4 border rounded-md md:mt-20 space-y-5 bg-white/60 backdrop-blur-md">
      <div
        class="py-2 bg-blue-500 text-white uppercase font-bold rounded-md p-2 text-center"
      >
        Thêm chứng chỉ covid
      </div>
      <div>
        <form v-on:submit="handleSubmit" class="space-y-3">
          <div class="space-y-3">
            <label for="name">Họ và tên</label>
            <input
              type="text"
              id="name"
              class="w-full rounded-md outline-green-500 border p-2"
              v-model="data.name"
            />
          </div>
          <div class="space-y-3">
            <label for="nameVacin">Tên vacin</label>
            <input
              type="text"
              id="nameVacin"
              class="w-full rounded-md outline-green-500 border p-2"
              v-model="data.nameVacin"
            />
          </div>
          <div class="space-y-3">
            <label for="dateInjections">Thời gian tiêm</label>
            <input
              type="datetime-local"
              id="dateInjections"
              class="w-full rounded-md outline-green-500 border p-2"
              v-model="data.dateInjections"
            />
          </div>
          <div class="space-y-3">
            <label for="cardID">CMND</label>
            <input
              type="text"
              id="cardID"
              class="w-full rounded-md outline-green-500 border p-2"
              v-model="data.cardID"
            />
          </div>
          <div class="space-y-3">
            <label for="gender">Giới tính</label>
            <div class="flex space-x-10">
              <div class="flex items-center space-x-2">
                <input
                  type="radio"
                  id="gender_male"
                  v-model="data.gender"
                  value="1"
                />
                <label for="gender_male">Nam</label>
              </div>
              <div class="flex items-center space-x-2">
                <input
                  type="radio"
                  id="gender_female"
                  v-model="data.gender"
                  value="2"
                />
                <label for="gender_female">Nữ</label>
              </div>
            </div>
          </div>
          <div class="space-y-3">
            <label for="healID">Mã BHYT</label>
            <input
              type="text"
              id="healID"
              class="w-full rounded-md outline-green-500 border p-2"
              v-model="data.healID"
            />
          </div>
          <div class="space-y-3">
            <label for="birthDate">Ngày sinh</label>
            <input
              type="date"
              id="birthDate"
              class="w-full rounded-md outline-green-500 border p-2"
              v-model="data.birthDate"
            />
          </div>
          <div class="space-y-3">
            <label for="userAddress">Quê quán</label>
            <input
              type="text"
              id="userAddress"
              class="w-full rounded-md outline-green-500 border p-2"
              v-model="data.userAddress"
            />
          </div>
          <p class="text-sm text-red-400">
            Bằng cách nhấn nút bên dưới, rằng cam đoan là thông tin kê khai này
            là đúng sự thật.
          </p>
          <div class="space-y-3 text-right">
            <button
              class="bg-green-300 text-white p-2 rounded-md"
              disabled
              v-if="loading"
            >
              Đang thực hiện
            </button>
            <template v-else>
              <button class="bg-green-500 text-white p-2 rounded-md">
                {{ idCovac ? "Cập nhật chứng chỉ" : "Thêm chứng chỉ" }}
              </button>
            </template>
          </div>
        </form>
      </div>
    </div>
    <Modal :canClose="false" v-if="loading">
      <template v-slot:header>
        <div class="text-center text-3xl p-2 border-b">
          Đang chờ chấp thuận từ metamask hoặc brave
        </div>
      </template>
      <template v-slot:body>
        <div class="w-fit mx-auto">
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="https://assets9.lottiefiles.com/packages/lf20_cvr1aepy.json"
            style="max-width: 300px"
          >
          </lottie-player>
        </div>
        <div class="text-lg text-center">
          <p>
            Vui lòng chấp thuận transaction của bạn trên metamask hoặc trên
            trình duyệt brave
          </p>
        </div>
      </template>
    </Modal>
    <Modal v-if="showModalErr" @handleClose="handleClose">
      <template v-slot:header>
        <div class="text-center text-3xl p-2 border-b">
          Lỗi bất ngờ từ hệ thống
        </div>
      </template>
      <template v-slot:body>
        <div class="w-fit mx-auto">
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="https://assets2.lottiefiles.com/packages/lf20_LlRvIg.json"
            style="max-width: 300px"
          >
          </lottie-player>
        </div>
        <div class="text-lg text-center">
          <p>
            {{ messageErr }}
          </p>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import { parse } from "vue/compiler-sfc";
import Modal from "../components/modal.vue";
export default {
  components: {
    Modal,
  },
  data() {
    return {
      data: {
        name: null,
        nameVacin: "",
        dateInjections: "",
        insertDate: "",
        cardID: "",
        gender: null,
        healID: "",
        birthDate: "",
        userAddress: "",
      },
      loading: false,
      showModalErr: false,
      messageErr: null,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.data.insertDate = new Date().getTime().toString();
      let check = true;
      for (let key in this.data) {
        if (this.data[key] == null || this.data[key] == "") {
          check = false;
          break;
        }
      }
      if (!check) {
        this.$toast.open({
          message: "Vui lòng điền đầy đủ thông tin!",
          type: "error",
          duration: 5000,
        });

        return;
      }
      this.data.gender = parseInt(this.data.gender);
      this.loading = true;
      this.$toast.open({
        message:
          "Vui lòng chấp nhận Transaction trên metamask hoặc trên brave!",
        type: "info",
        duration: 5000,
      });
      let res = null;
      if (this.idCovac != undefined) {
        res = this.covacConnection.methods.editCovac(this.data, parseInt(this.idCovac));
      } else {
        res = this.covacConnection.methods.createCovac(this.data);
      }
      res.send({ from: this.userAccount }).once("receipt", (receipt) => {
        console.log(receipt);
        this.loading = false;
        this.$toast.open({
          message: "Hoàn tất thủ túc!",
          type: "success",
          duration: 5000,
        });
      });
      res
        .then((data) => {})
        .catch((e) => {
          this.loading = false;
          this.showModalErr = true;
          this.messageErr = e.message;
        });
    },
    handleClose() {
      this.showModalErr = false;
    },
  },
  computed: {
    idCovac() {
      return this.$route.params.id;
    },
    userAccount() {
      return this.$store.getters.get("userAccount");
    },
    covacConnection() {
      return this.$store.getters.get("storeCovac");
    },
  },
  async mounted() {
    await this.$store.dispatch("initWeb3");
    if (this.idCovac) {
      this.data = await this.covacConnection.methods.covac(this.idCovac).call();
    }
  },
};
</script>
