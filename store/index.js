/**
 * @author Nguyen Tuong Nguyen (Ily1606)
 */
import Covac from "../artifacts/contracts/CovidCovac.sol/CovidCovac.json";
import Vuex from "vuex";

// Vue.use(Vuex)
export default new Vuex.Store({
  state: {
      userAccount: null,
      storeCovac: null,
      ADDRESS_SMARTCONTRACT: import.meta.env.VITE_ADDRESS_SMARTCONTRACT
  },
  getters: {
    get: state => (stateKey) => {
      return state[stateKey];
    },
    getUserAccount(context) {
      return context['userAccount']
    }
  },
  mutations: {
    set(state, { stateKey, data }) {
      state[stateKey] = data;
    },
  },
  actions: {
    init(context) {
      const userAccount = localStorage.getItem("userAccount");
      if (userAccount) {
        context.commit("set", { stateKey: "userAccount", data: userAccount });
      }
    },
    async initWeb3(context){
      if(!context.getters.get('storeCovac')){
        if(window.ethereum){
          window.web3 = new Web3(ethereum);
          await ethereum.enable();
          const addressConstract = context.getters.get("ADDRESS_SMARTCONTRACT");
          const covac = new web3.eth.Contract(Covac.abi, addressConstract);
          context.commit("set", { stateKey: "storeCovac", data: covac });
        }
        else{
          alert("Thiết bị bạn chưa cài metamask hoặc ethereum")
        }
      }
    },
    setUser(context, data){
      context.commit('set', {stateKey: 'userAccount', data})
    }
  },
  modules: {
  }
});
