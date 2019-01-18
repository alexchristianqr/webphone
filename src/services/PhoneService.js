import Vue from 'vue'
import * as Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	actions:{
		getData({commit},{self}){
			// Axios.get('http://192.168.80.4:82/listado-telefonos?cliente_id=6-1-5983-15233',{}).then((r)=>{
			// 	if(r.status === 200){
					self.dataList=[]
					self.dataList.push([12345,'955588297'])
					self.dataList.push([12346,'922902044'])
					self.doStart()
			// 	}
			// }).catch((e)=>{
			// 	console.error(e)
			// 	alert('Ha ocurrido un error al extraer data!')
			// })
		}
	}
})
