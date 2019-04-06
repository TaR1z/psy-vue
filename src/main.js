import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'iview/dist/styles/iview.css'
import iView from 'iview'
Vue.use(iView)

Vue.config.productionTip = false


if (process.env.NODE_ENV !== 'production') {
	require('./mock')
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
