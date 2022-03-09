
import { createApp } from 'vue'
import "@lottiefiles/lottie-player";
import 'animate.css/animate.min.css';
import WOW from 'wow.js'
// const wow = new WOW({
//   boxClass: 'wow',
//   animateClass: 'animated',
//   offset: 0,
//   live: true
// });
window.WOW = WOW
import Web3 from 'web3/dist/web3.min.js'
window.Web3 = Web3
import QRCode from 'qrcode'
window.QRCode = QRCode
// import { ethers } from "ethers";
// window.ethers = ethers
// window.provider = new ethers.providers.Web3Provider(window.ethereum)
import store from '../store'
import VueToast from 'vue-toast-notification';
import router from '../router/'
import App from './App.vue'
import './assets/css/index.css'
import 'vue-toast-notification/dist/theme-sugar.css';
const app = createApp(App)
app.use(router)
app.use(VueToast);
app.use(store)
app.config.compilerOptions.isCustomElement = (tag) => {
    return tag == 'lottie-player'
  }
app.mount("#app")