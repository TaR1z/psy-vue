import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import user from './modules/user'
import read from './modules/read'
import consult from './modules/consult'
import chat from './modules/chat'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV === 'development',
	state,
	getters,
	mutations,
	actions,
	modules: {
		user,
		read,
		consult,
		chat
	},
	plugins: [
		//
	]
})