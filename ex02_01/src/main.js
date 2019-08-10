import Vue from 'vue'
import App from './App.vue'

// 부트스트랩 사용
// CSS 파일을 이곳에서 import하면 SPA 내 어디에서든 사용 가능
import 'bootstrap/dist/css/bootstrap.min.css'

// Vue-Router 사용
import VueRouter from 'vue-router'
Vue.use(VueRouter);

// Vue-Axios 사용
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false


// 추가한 컴포넌트들 import
import HomeComponent from './components/HomeComponent.vue'
import CreateComponent from './components/CreateComponent'
import EditComponent from './components/EditComponent'
import ListComponent from './components/ListComponent'

// 라우팅 경로에 따른 컴포넌트 정보 설정
const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeComponent
  },
  {
    name: 'create',
    path: '/create',
    component: CreateComponent
  },
  {
    name: 'edit',
    path: '/edit/:id',
    component: EditComponent
  },
  {
    name: 'list',
    path: '/list',
    component: ListComponent
  }
]

// VueRouter 객체 생성
const router = new VueRouter({
  mode: 'history',
  routes: routes
})

// VueRouter 객체를 사용하도록 수정
new Vue(
  Vue.util.extend({ router }, App)
).$mount('#app')
