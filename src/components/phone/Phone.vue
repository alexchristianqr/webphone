<template>
    <div>
        <!-- Nav -->
        <nav class="bg-light navbar-expand p-3">
            <div class="row">
                <div class="col-8 my-auto"><h6>Webphone Securitec</h6></div>
                <div class="col-4 text-right">
                    <template v-if="true">
                        <button type="button" class="btn btn-secondary" data-toggle="modal"
                                data-target="#modalConfiguration">
                            <i class="fa fa-cog"></i>
                        </button>
                    </template>
                </div>
            </div>
        </nav>
        <div class="col-4 mx-auto">
            <div class="mt-3">
                <!-- App Webphone -->
                <div class="card" v-show="screen.start">
                    <template v-if="screen.inTransfer">
                        <div class="card-body">
                            <div class="form-group">
                                <div class="input-group input-group-lg">
                                    <input title="" ref="inputDestination" v-model="input.transfer" type="text" class="form-control" maxlength="9">
                                    <template v-if="input.transfer !== ''">
                                        <div class="input-group-append">
                                            <button type="button" class="btn btn-primary" @click="doClear"><i class="fa fa-times"></i></button>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class="row">
                                <template v-for="(v,k) in dataTeclado">
                                    <template v-if="k%3 === 0">
                                        <div class="col-4 pr-0">
                                            <button class="btn btn-lg btn-outline-secondary btn-block mb-1" @click="doDTMF(v.chart)">
                                                <template v-if="v.icon !== undefined">
                                                    <i :class="v.icon"></i>
                                                </template>
                                                <template v-else>
                                                    <span class="h4">{{v.chart}}</span>
                                                </template>
                                            </button>
                                        </div>
                                    </template>
                                    <template v-if="k%3 === 1">
                                        <div class="col-4 pl-1 pr-1">
                                            <button class="btn btn-lg btn-outline-secondary btn-block mb-1" @click="doDTMF(v.chart)">
                                                <span class="h4">{{v.chart}}</span>
                                            </button>
                                        </div>
                                    </template>
                                    <template v-if="k%3 === 2">
                                        <div class="col-4 pl-0">
                                            <button class="btn btn-lg btn-outline-secondary btn-block mb-1" @click="doDTMF(v.chart)">
                                                <template v-if="v.icon !== undefined">
                                                    <i :class="v.icon"></i>
                                                </template>
                                                <template v-else>
                                                    <span class="h4">{{v.chart}}</span>
                                                </template>
                                            </button>
                                        </div>
                                    </template>
                                </template>
                            </div>
                            <button type="button" :disabled="input.transfer === '' ? true : false" class="btn btn-success btn-block btn-lg" @click="doTranferCall">Transferir Llamada</button>
                        </div>
                    </template>
                    <div class="card-footer pl-2 pr-2 pb-2">
                        <div class="row">
                            <template v-if="button.call.status">
                                <div class="col-8 pr-1"><!-- Llamar -->
                                    <button @click="doCall" :disabled="button.call.disabled"
                                            class="btn btn-success btn-block">Call
                                    </button>
                                </div>
                                <div class="col-4 pl-0"><!-- Eliminar Caracter -->
                                    <button type="button" class="btn btn-secondary btn-block"><i
                                            class="fa fa-reply"></i></button>
                                </div>
                            </template>
                            <template v-if="!button.call.status">
                                <div class="col-4">
                                    <span class="btn btn-block">
                                        <i class="fa fa-user-circle mr-3"></i>
                                        <small>{{timer}}</small>
                                    </span>
                                </div>
                                <div class="col-2"><!-- Pausar Llamada -->
                                    <button type="button" :disabled="button.hold.disabled" @click="doHold"
                                            class="btn btn-secondary btn-block">
                                        <i v-show="button.hold.status" class="fa fa-play"></i>
                                        <i v-show="!button.hold.status" class="fa fa-pause"></i>
                                    </button>
                                </div>
                                <div class="col-2"><!-- Transferir Llamada -->
                                    <button title="Tranferir Llamada" :disabled="button.transfer.disabled"
                                            @click="doTransfer" class="btn btn-secondary btn-block">
                                        <i v-show="!button.transfer.status" class="fa fa-retweet"></i>
                                        <i v-show="button.transfer.status" class="fa fa-exchange"></i>
                                    </button>
                                </div>
                                <div class="col-2"><!-- Mute Llamada -->
                                    <button :disabled="button.mute.disabled" @click="doMute"
                                            class="btn btn-secondary btn-block">
                                        <i v-show="!button.mute.status" class="fa fa-microphone"></i>
                                        <i v-show="button.mute.status" class="fa fa-microphone-slash"></i>
                                    </button>
                                </div>
                                <div class="col-2"><!-- Colgar Llamada -->
                                    <button :disabled="button.hangup.disabled" @click="doHangup"
                                            class="btn btn-danger btn-block"><i class="fa fa-times"></i></button>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Lista de Llamadas -->
        <div class="col-6 mx-auto">
            <div class="table-responsive mt-3">
                <table class="table table-sm table-bordered">
                    <thead class="bg-secondary text-white">
                    <tr>
                        <th>#</th>
                        <th>Telefonos/Cel.</th>
                        <th>Accion</th>
                        <th>Historial</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(v,k) in dataList" class="my-auto">
                        <td>{{v.id}}</td>
                        <td class="my-auto">{{v.phone}}</td>
                        <td class="text-left">
                            <button type="button" class="btn btn-success btn-sm mr-1 btn-block" @click="doCall(v.phone)"><i class="fa fa-phone"></i></button>
                        </td>
                        <td>
                            <button class="btn btn-secondary btn-sm btn-block"><i class="fa fa-history"></i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Activar para depurar data -->
        <template v-if="true">
            <div class="container w-100">
                <pre class="bg-light" style="max-height: 200px;min-height: 200px">
                    <code class="ml-2 mr-2" v-html="print_console"></code>
                </pre>
            </div>
        </template>

        <!-- Footer -->
        <footer class="bg-light p-3 mt-3 text-center w-100">
            <span class="text-dark">developed by dev@securitec.pe {{(new Date).getFullYear()}}</span>
        </footer>

        <!-- Modal -->
        <div class="modal fade" id="modalConfiguration" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Configuración SIP</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <span class="text-uppercase font-weight-normal">Management</span>
                            </div>
                            <div class="w-100">
                                <hr>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <span>Username</span>
                                    <input v-model="params.username" type="text" class="form-control form-control-sm">
                                </div>
                                <div class="form-group">
                                    <span>Password</span>
                                    <input v-model="params.password" type="password" class="form-control form-control-sm">
                                </div>
                                <div class="form-group">
                                    <span>Domain</span>
                                    <input v-model="params.domain" type="text" class="form-control form-control-sm">
                                </div>
                            </div>
                            <div class="w-100">
                                <hr>
                            </div>
                            <div class="col-12">
                                <span class="text-uppercase font-weight-normal">Settings</span>
                            </div>
                            <div class="w-100">
                                <hr>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <label>Volumen Microfono <span class="text-secondary">({{button.volume.microphone}})</span></label>
                                    <input title="Microfono" @change="doSetVolume(0,button.volume.microphone)" v-model="button.volume.microphone" type="range" class="form-control form-control-sm" min="0" max="100" step="5" value="100"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button @click.prevent="doStart" type="button" class="btn btn-primary" data-dismiss="modal">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import '../../../public/webphone_api.js'
	import PhoneService from '../../services/PhoneService'

	export default {
		name:'Phone',
		data:()=>({
			timer:'00:00:00',
			totalSeconds:0,
			timerUpdate:null,
			print_console:'',
			status:{connected:false},
			screen:{
				inCall:true,
				inTransfer:false,
				inPause:false,
				inVideoCall:false,
				start:false,
			},
			time:{
				start:'00:00:00',
				end:'00:00:00',
			},
			numbers:[],
			number:'',
			dataTeclado:[
				{chart:'1', value:'abc'},
				{chart:'2', value:'abc'},
				{chart:'3', value:'def'},
				{chart:'4', value:'ghi'},
				{chart:'5', value:'jkl'},
				{chart:'6', value:'mno'},
				{chart:'7', value:'pqrs'},
				{chart:'8', value:'tuv'},
				{chart:'9', value:'wxyz'},
				{chart:'*', value:'', icon:'fa fa-asterisk'},
				{chart:'0', value:''},
				{chart:'#', value:'', icon:'fa fa-hashtag'},
			],
			button:{
				call:{status:false, disabled:true},
				hold:{status:false, disabled:true},
				mute:{status:false, disabled:true},
				hangup:{status:false, disabled:false},
				transfer:{status:false, disabled:true},
				volume:{
					microphone:75,
					ringback:75,
					playback:75,
				},
			},
			dataList:[
				{id:1, phone:'955588297'},
				{id:2, phone:'994719466'},
			],
			params:{
				display_name:'204',
				username:'204',
				password:'7015102',
				domain:'192.168.80.3',
				authorization:'204',
				destination:'955588297',
			},
			modal:[
				{
					title:'Teclado Virtual',
					status:false,
					size:'sm',
					footerclass:['justify-content-center']
				},
				{
					title:'Transferencia de Llamada',
					status:false,
					size:'sm',
					footerclass:['justify-content-center']
				},
			],
			input:{
				marker:'',
				keyboard:'',
				transfer:'',
			},
			buttons:{
				call:{status:true},
				hangup:{status:false},
				play:{status:true,disabled:true},
				pause:{status:false,disabled:true},
				microphone:{status:true,disabled:true},
				transfer:{status:true,disabled:true},
				keyboard:{status:true,disabled:true},
			},
			dataKeyboard:[
				{chart:'1', value:'abc'},
				{chart:'2', value:'abc'},
				{chart:'3', value:'def'},
				{chart:'4', value:'ghi'},
				{chart:'5', value:'jkl'},
				{chart:'6', value:'mno'},
				{chart:'7', value:'pqrs'},
				{chart:'8', value:'tuv'},
				{chart:'9', value:'wxyz'},
				{chart:'*', value:'', icon:'fas fa-asterisk'},
				{chart:'0', value:''},
				{chart:'#', value:'', icon:'fas fa-hashtag'},
			],
		}),
		created(){
			// this.doStart()
		},
		methods:{
			getData(){
				PhoneService.dispatch('getData', {self:this})
			},
			doClear(){
				this.input.transfer=''
				this.$refs.inputDestination.focus()
			},
			doStart(){
				webphone_api.setparameter('serveraddress', this.params.domain)
				webphone_api.setparameter('username', this.params.username)
				webphone_api.setparameter('password', this.params.password)
				webphone_api.start()
				this.listenPrintEvents()
				this.listenChanges()
			},
			doAccept(){
				webphone_api.accept()
			},
			doReject(){
				webphone_api.reject()
			},
			returnLetter(position){
				let chart=this.dataTeclado[position].chart.toString()
				if(this.input.transfer.length <= 8){
					this.input.transfer=this.input.transfer.concat(chart)
				}else{
					return false
				}
			},
			doCall(number){
				this.screen.start=true
				this.screen.inCall=true
				this.button.call.status=false
				webphone_api.call(number)
			},
			doHangup(){
				this.screen.start=false
				this.screen.inCall=false
				this.button.call.status=true
				this.button.transfer.status=false
				//
				this.button.mute.disabled=true
				this.button.hold.disabled=true
				this.button.transfer.disabled=true
				webphone_api.hangup()
				this.stopInterval()
			},
			doSetVolume(type_event, vol){
				webphone_api.setvolume(type_event, vol)
			},
			doHold(){
				this.button.hold.status= !this.button.hold.status
				webphone_api.hold(this.button.hold.status)
			},
			doMute(){
				this.button.mute.status= !this.button.mute.status
				webphone_api.mute(this.button.mute.status)
			},
			doTransfer(){
				this.button.transfer.status= !this.button.transfer.status
				if(!this.button.hold.status){
					this.doHold()
				}
				this.screen.inTransfer= !this.screen.inTransfer
			},
			doDTMF(value){
				webphone_api.dtmf(value)
			},
			doTranferCall(){
				this.doHold()
				this.screen.inTransfer= !this.screen.inTransfer
				this.button.transfer.status= !this.button.transfer.status
				webphone_api.transfer(this.input.transfer)
			},
			listenChanges(){
				webphone_api.onCallStateChange((event, direction)=>{
					switch(event){
						case 'callSetup':
							if(direction == 1){
								// means it's outgoing call
							}else if(direction == 2){
								// means it's icoming call
							}
							break
						case 'callDisconnected':
							this.doHangup()
							break
						case 'callRinging':
							console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Ring Ring...')
							break
						case 'callConnected':
							this.button.mute.disabled=false
							this.button.hold.disabled=false
							this.button.transfer.disabled=false
							this.startInterval()
							break
					}
				})
			},
			listenPrintEvents(){
				webphone_api.onEvents((evt)=>{
					this.print_console+='<span class="ml-3 mr-3">' + evt + '</span><br>'
				})
			},
			startInterval(){
				this.totalSeconds=0
				this.timerUpdate=setInterval(()=>{
					++this.totalSeconds//incrementar
					let hour=('0' + Math.floor(this.totalSeconds / 3600 % 24)).slice(-2),//Obtener hora
						minute=('0' + Math.floor(this.totalSeconds / 60 % 60)).slice(-2),//Obtener minuto
						seconds=('0' + Math.floor(this.totalSeconds % 60)).slice(-2)//Obtener segundo
					this.timer=hour + ':' + minute + ':' + seconds//00:00:00
				}, 1000)
			},
			stopInterval(){
				clearInterval(this.timerUpdate)
				this.timerUpdate=null
				this.timer='00:00:00'
			},
		},
	}
</script>

<style scoped>
    .btn-circle{
        width: 3rem;
        height: 3rem;
        border-radius: 100%;
        padding: 0;
    }
</style>