import Vue from 'vue'
import PortalVue from 'portal-vue'
import App from './App.vue'
import './ml'

import 'normalize.css'
import './main.css'

Vue.config.productionTip = false

Vue.use(PortalVue)
export const bus = new Vue()

new Vue({
    render: h => h(App),
}).$mount('#app')
