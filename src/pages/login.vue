<template>
  <div class="w-full">
    <div class="mx-auto max-w-2xl md:mt-44 rounded-md p-4">
      <div>
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://assets10.lottiefiles.com/packages/lf20_YuFOn8.json"
        >
        </lottie-player>
      </div>
      <div>
        <button
          @click="login"
          class="border border-slate-400 p-2 rounded-md bg-green-500 text-white w-full"
        >
          <etherium-logo class="w-8 h-8 inline-block fill-white align-middle" />
          <span class="text-lg font-bold align-middle"> Đăng nhập </span>
        </button>
      </div>
    </div>
    <Modal @handleClose="handleClose" v-if="showModal">
      <template v-slot:header>
        <div class="text-center text-3xl p-2 border-b">
          Lỗi không hỗ trợ ethereum
        </div>
      </template>
      <template v-slot:body>
        <div class="text-center">
          <div class="w-fit mx-auto">
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets9.lottiefiles.com/packages/lf20_afwjhfb2.json"
              style="max-width: 300px"
            >
            </lottie-player>
          </div>
          <div class="text-lg">
            <p>
              Ôi không, trình duyệt của bạn không hỗ trợ ethereum, vui lòng cài
              đặt extension metamask hoặc trình duyệt Brave
            </p>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="p-2 border-t flex justify-end space-x-4">
          <button class="border rounded-md p-2">Got it</button>
          <button
            class="border border-green-500 bg-green-600 text-white p-2 rounded-md"
          >
            Get extension
          </button>
        </div>
      </template>
    </Modal>
    <Modal :canClose="false" v-if="status === 'loading'">
      <template v-slot:header>
        <div class="text-center text-3xl p-2 border-b">
          Đang kết nối đến ví của bạn
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
            Vui lòng xác thực ví của bạn trên metamask hoặc trên trình duyệt
            brave
          </p>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import EtheriumLogo from "../assets/svg/ethereum.svg";
import Modal from "../components/modal.vue";
export default {
  components: {
    EtheriumLogo,
    Modal,
  },
  data() {
    return {
      showModal: false,
      userAccount: localStorage.getItem("userAccount"),
      status: false,
    };
  },
  methods: {
    checkEtherium() {
      let result;
      if (window.ethereum) {
        result = true;
        this.$toast.open({
          message: "Hello ethereum",
          type: "success",
          duration: 5000,
        });
        this.status = "loading";
        window.web3 = new Web3(ethereum);
      } else {
        result = false;
        this.$toast.open({
          message: "Ethereum not support!",
          type: "error",
          duration: 5000,
        });
      }
      return result
    },
    async getAccount() {
      await ethereum.enable();
     const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      this.userAccount = account;
      this.$store.commit('set', {stateKey: 'userAccount', data: this.userAccount})
      window.localStorage.setItem("userAccount", account);
      this.$toast.open({
        message: "Authention successfully!",
        type: "success",
        duration: 5000,
      });
      setTimeout(() =>{
        this.checkAccount()
      }, 3000)
    },
    handleClose() {
      this.showModal = false;
    },
    checkAccount() {
      if (this.userAccount) {
        this.$router.push({
          name: "dashbroad",
        });
      }
    },
    login() {
      const hasEtherium = this.checkEtherium()
      if(hasEtherium){
        this.getAccount()
      }
      else{
        this.showModal = true;
      }
    }
  },
  mounted() {
    this.checkAccount()
  },
};
</script>
