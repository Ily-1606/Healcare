import {createRouter, createWebHistory} from 'vue-router';
import Home from '../src/pages/home.vue'
import Login from '../src/pages/login.vue'
import Dashbroad from '../src/pages/dashbroad.vue'
import NewCovac from '../src/pages/dashbroad/new.vue'
import EditCovac from '../src/pages/dashbroad/edit.vue'
import InfoCovac from '../src/pages/dashbroad/info.vue'
import Search from '../src/pages/search.vue'
const routes = [
    { path: '/', component: Home, name: 'index' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/dashbroad', component: Dashbroad, name: 'dashbroad' },
    { path: '/dashbroad/covac/new', component: NewCovac, name: 'new_covac' },
    { path: '/dashbroad/covac/:id/edit', component: EditCovac, name: 'edit_covac' },
    { path: '/dashbroad/covac/:id', component: InfoCovac, name: 'info_covac' },
    { path: '/covac/search', component: Search, name: 'search_covac' },
    { path: '/infoCovac/:id?', component: InfoCovac, name: 'info_covac_user' },
  ]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
  })
export default router