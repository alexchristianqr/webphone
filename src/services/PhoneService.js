import Vue from 'vue'
import * as Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	actions:{
		getData({commit},{self}){
			Axios.get('http://192.168.80.4:82/listado-telefonos?cliente_id=6-1-5983-15233',{}).then((r)=>{
				if(r.status === 200){
					self.dataList=r.data
					self.doStart()
					// self.dataList.push([12345,'955588297'])
				}
			}).catch((e)=>{
				console.error(e)
				alert('Ha ocurrido un error al extraer data!')
			})
		}
	}
})
