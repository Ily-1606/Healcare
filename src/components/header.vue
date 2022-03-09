<template>
  <Popover class="border-b bg-white">
    <div class="container mx-auto">
      <div
        class="py-6 px-2 flex justify-between content-center items-center mx-auto"
      >
        <div class="flex space-x-4 content-center items-center text-gray-700">
          <Logo class="w-10 h-10 text-white inline fill-green-500" />
          <div class="hidden space-x-4 content-center items-end md:flex">
            <router-link :to="{name: 'index'}" class="text-lg font-bold md:text-2xl hidden md:inline">
              Confirm covac
            </router-link>
            <router-link
              :to="{ name: 'dashbroad' }"
              :class="{ 'text-green-500': $route.name === 'dashbroad' }"
              >Quản lý</router-link
            >
            <router-link
              :to="{ name: 'new_covac' }"
              :class="{ 'text-green-500': $route.name === 'new_covac' }"
              >Thêm chứng nhận</router-link
            >
          </div>
        </div>
        <div
          class="flex space-x-4 font-bold content-center items-center text-gray-700"
        >
          <div class="relative hidden md:block">
            <SearchIcon
              class="w-4 h-4 inline absolute top-1/2 left-3 -translate-y-1/2 fill-green-500"
            />
            <form @submit="search">
              <input
                type="text"
                class="rounded-md border p-2 border-green-300 outline-green-500 text-sm indent-6 text-green-600"
                v-model="q"
                style="width: 400px"
                placeholder="Tìm kiếm chứng nhận..."
              />
              <button class="hidden"></button>
            </form>
          </div>
          <div class="hidden md:block">
            <div v-if="userAccount" class="flex space-x-4">
              <div class="text-yellow-600 font-bold">
                {{ shortAddress }}
              </div>
              <button class="text-sm" @click="logout">(Đăng xuất)</button>
            </div>
            <div v-else>
              <router-link
                to="/login"
                :class="{ 'text-green-500': $route.name === 'login' }"
                >Đăng nhập</router-link
              >
            </div>
          </div>
          <div class="-mr-2 -my-2 md:hidden">
            <PopoverButton
              class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Open menu</span>
              <MenuIcon class="h-6 w-6" aria-hidden="true" />
            </PopoverButton>
            <transition
              enter-active-class="duration-200 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="duration-100 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <PopoverPanel
                focus
                class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50"
              >
                <div
                  class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
                >
                  <div class="pt-5 pb-6 px-5">
                    <div class="flex items-center justify-between">
                      <div>
                        <Logo
                          class="w-10 h-10 text-white inline fill-green-500"
                        />
                      </div>
                      <div class="-mr-2">
                        <PopoverButton
                          class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                          <span class="sr-only">Close menu</span>
                          <MenuIcon class="h-6 w-6" aria-hidden="true" />
                        </PopoverButton>
                      </div>
                    </div>
                    <div class="mt-6">
                      <nav class="grid gap-y-8">
                        <router-link
                          :to="{ name: 'dashbroad' }"
                          class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                          :class="{
                            'text-green-500': $route.name === 'dashbroad',
                          }"
                          >Quản lý</router-link
                        >
                        <router-link
                          :to="{ name: 'new_covac' }"
                          class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                          :class="{
                            'text-green-500': $route.name === 'new_covac',
                          }"
                          >Thêm chứng nhận</router-link
                        >
                      </nav>
                    </div>
                  </div>
                  <div class="py-6 px-5 space-y-6">
                    <div v-if="userAccount" class="flex space-x-4">
                      <div class="text-yellow-600 font-bold">
                        {{ shortAddress }}
                      </div>
                      <button class="text-sm" @click="logout">
                        (Đăng xuất)
                      </button>
                    </div>
                    <div v-else>
                      <router-link
                          to="/login"
                        class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Sign in
                      </router-link>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </Popover>
</template>
<script>
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import SearchIcon from "../assets/svg/search.svg";
import Logo from "../assets/svg/virus-covid.svg";
import MenuIcon from "../assets/svg/menu.svg";
export default {
  components: {
    Logo,
    SearchIcon,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    MenuIcon,
  },
  data() {
    return {
      q: "",
    };
  },
  computed: {
    userAccount() {
      return this.$store.state.userAccount;
    },
    shortAddress() {
      let str = this.userAccount.slice(0, 4);
      str += `...${this.userAccount.slice(
        this.userAccount.length - 4,
        this.userAccount.length
      )}`;
      return str;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("userAccount");
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
    search(e) {
      e.preventDefault();
      if (this.q) {
        this.$router.push({
          name: "search_covac",
          query: {
            q: this.q,
          },
        });
      }
    },
  },
  beforeMount() {
    this.$store.dispatch("init");
  },
};
</script>
