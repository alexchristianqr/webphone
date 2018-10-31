<template>
    <div>
        <!-- Nav -->
        <nav class="bg-light navbar-expand p-3">
            <div class="row">
                <div class="col-8 my-auto"><h6>Webphone Securitec</h6></div>
                <div class="col-4 text-right">
                    <button type="button" class="btn btn-secondary" data-toggle="modal"
                            data-target="#modalConfiguration">
                        <i class="fa fa-cog"></i>
                    </button>
                </div>
            </div>
        </nav>
        <div class="col-sm-12 col-md-12 col-lg-4 offset-lg-4 offset-md-4 ">
            <div class="mt-3">
                <div class="card" v-show="screen.start">
                    <div class="card-body m-0 p-2">
                        <template v-if="screen.inCall">
                            <div class="text-center">
                                <div class="w-100">
                                    <span class="h4 text-secondary">(+51) {{params.destination}}</span>
                                </div>
                                <div class="mt-2 mb-2">
                                    <i class="fa fa-user-circle fa-5x text-muted"></i>
                                </div>
                                <div class="w-100">
                                    <span class="text-secondary">{{time.start}}</span>
                                </div>
                            </div>
                        </template>
                        <template v-if="!screen.inCall">
                            <div class="form-group-sm">
                                <div class="input-group input-group-lg">
                                    <input ref="inputDestination" v-model="params.destination" type="text" class="form-control" maxlength="9">
                                    <template v-if="params.destination !== ''">
                                        <div class="input-group-append">
                                            <button type="button" class="btn btn-danger" @click="doClear"><i class="fa fa-times"></i></button>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="card-footer pl-2 pr-2 pb-2">
                        <template v-if="!screen.inCall">
                            <div class="row">
                                <template v-for="(v,k) in dataTeclado">
                                    <template v-if="k%3 === 0">
                                        <div class="col-4 pr-0">
                                            <button class="btn btn-lg btn-outline-secondary btn-block mb-1" @click="returnLetter(k)">
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
                                            <button class="btn btn-lg btn-outline-secondary btn-block mb-1" @click="returnLetter(k)">
                                                <span class="h4">{{v.chart}}</span>
                                            </button>
                                        </div>
                                    </template>
                                    <template v-if="k%3 === 2">
                                        <div class="col-4 pl-0">
                                            <button class="btn btn-lg btn-outline-secondary btn-block mb-1" @click="returnLetter(k)">
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
                        </template>
                        <div class="row">
                            <template v-if="button.call">
                                <div class="col-8 pr-1"><!-- Llamar -->
                                    <button @click="doCall" class="btn btn-success btn-lg btn-block">Call</button>
                                </div>
                                <div class="col-4 pl-0"><!-- Eliminar Caracter -->
                                    <button type="button" class="btn btn-secondary btn-lg btn-block"><i class="fa fa-reply"></i></button>
                                </div>
                            </template>
                            <template v-if="!button.call">
                                <div class="col-3">
                                    <template v-if="button.hold"><!-- Pausar Llamada -->
                                        <button type="button" @click="doHold" class="btn btn-outline-secondary btn-lg btn-block"><i class="fa fa-play"></i></button>
                                    </template>
                                    <template v-else><!-- Retomar Llamada -->
                                        <button type="button" @click="doHold" class="btn btn-outline-secondary btn-lg btn-block"><i class="fa fa-pause"></i></button>
                                    </template>
                                </div>
                                <div class="col-3"><!-- Transferir Llamada -->
                                    <button title="Tranferir Llamada" @click="doTranfer" :class="button.transfer ? 'btn btn-outline-secondary btn-lg btn-block active' : 'btn btn-outline-secondary btn-lg btn-block'"><i class="fa fa-retweet"></i></button>
                                </div>
                                <div class="col-3"><!-- Mute Llamada -->
                                    <button :title="button.mute ? 'Poner en silencio' : 'Quitar silencio'" @click="doMute" :class="button.mute ? 'btn btn-outline-secondary btn-lg btn-block active' : 'btn btn-outline-secondary btn-lg btn-block'"><i class="fa fa-volume-off"></i></button>
                                </div>
                                <div class="col-3"><!-- Colgar Llamada -->
                                    <button @click="doHangup" class="btn btn-danger btn-lg btn-block"><i class="fa fa-times"></i></button>
                                </div>
                            </template>
                        </div>
                    </div>
                    <template v-if="screen.inTransfer">
                        <div class="card-body">
                            <div class="form-group">
                                <div class="input-group input-group-lg">
                                    <input ref="inputDestination" v-model="input.transfer" type="text" class="form-control" maxlength="9">
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
                                            <button class="btn btn-lg btn-outline-secondary btn-block mb-1" @click="returnLetter(k)">
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
                                            <button class="btn btn-lg btn-outline-secondary btn-block mb-1" @click="returnLetter(k)">
                                                <span class="h4">{{v.chart}}</span>
                                            </button>
                                        </div>
                                    </template>
                                    <template v-if="k%3 === 2">
                                        <div class="col-4 pl-0">
                                            <button class="btn btn-lg btn-outline-secondary btn-block mb-1" @click="returnLetter(k)">
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
                            <button type="button" class="btn btn-success btn-block btn-lg" @click="doTranferCall">Tranferir Llamada</button>
                        </div>
                    </template>
                </div>

                <!-- Lista de Llamadas -->
                <div class="table-responsive mt-3">
                    <table class="table table-sm table-bordered">
                        <thead class="bg-secondary text-white">
                        <tr>
                            <th>Número</th>
                            <th>Acción</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(v,k) in dataList" class="my-auto">
                            <td class="my-auto">
                                <span class="my-auto">{{v.number}}</span>
                            </td>
                            <td class="text-center">
                                <button class="btn btn-success btn-sm btn-block" @click="doCall(v)">Llamar</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-light p-3 mt-3 text-center w-100">
            <span class="text-dark">Developed by @AlexChristian</span>
        </footer>

        <!-- Modal -->
        <div class="modal fade" id="modalConfiguration" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Configuration SIP</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <span class="text-uppercase font-weight-bold"><i class="fa fa-angle-right mr-1"></i>Management</span>
                            </div>
                            <div class="w-100">
                                <hr>
                            </div>
                            <div class="col-12">
                                <div hidden class="form-group">
                                    <span>Display Name</span>
                                    <input v-model="params.display_name" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <span>Username</span>
                                    <input v-model="params.username" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <span>Password</span>
                                    <input v-model="params.password" type="password" class="form-control">
                                </div>
                                <div hidden class="form-group">
                                    <span>Authorization</span>
                                    <input v-model="params.authorization" type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <span>Domain</span>
                                    <input v-model="params.domain" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="w-100">
                                <hr>
                            </div>
                            <div class="col-12">
                                <span class="text-uppercase font-weight-bold"><i class="fa fa-angle-right mr-1"></i>Settings</span>
                            </div>
                            <div class="w-100">
                                <hr>
                            </div>
                            <div class="col-12">
                                <div class="form-group">
                                    <span>Volume Microphone <span
                                            class="text-secondary">({{button.volume.microphone}})</span></span>
                                    <input @change="doSetVolume(0,button.volume.microphone)"
                                           v-model="button.volume.microphone" type="range" class="form-control" min="0"
                                           max="100" step="5" value="100"/>
                                </div>
                                <div class="form-group">
                                    <span>Volume Ringback <span
                                            class="text-secondary">({{button.volume.ringback}})</span></span>
                                    <input @change="doSetVolume(1,button.volume.ringback)"
                                           v-model="button.volume.ringback" type="range" class="form-control" min="0"
                                           max="100" step="5" value="100"/>
                                </div>
                                <div class="form-group">
                                    <span>Volume Playback <span
                                            class="text-secondary">({{button.volume.playback}})</span></span>
                                    <input @change="doSetVolume(2,button.volume.playback)"
                                           v-model="button.volume.playback" type="range" class="form-control" min="0"
                                           max="100" step="5" value="100"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button @click.prevent="doStart" type="button" class="btn btn-primary" data-dismiss="modal">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import '../../lib/webphone_api.js'

	export default {
		name:'Phone',
		data:()=>({
			status:{connected:false},
			screen:{
				inCall:true,
				inTransfer:false,
				inPause:false,
				inVideoCall:false,
                start:false,
			},
			params:{
				display_name:'202',
				username:'202',
				password:'7015102',
				authorization:'202',
				domain:'192.168.80.3',
				destination:'',
			},
            input:{
			    transfer:''
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
				call:false,
				hold:false,
				mute:false,
				hangup:false,
				transfer:false,
				volume:{
					microphone:75,
					ringback:50,
					playback:50,
				},
			},
            dataList:[
            	{
            		number:'955588297',
                    status:true
                },
            	],
            validate:{
				call:false
            }
		}),
        created(){
			this.doStart()
        },
		methods:{
			validateCall(){
				this.screen.inCall=webphone_api.isincall()
            },
			doClear(){
				this.input.transfer=''
				this.$refs.inputDestination.focus()
			},
			doStart(){
				webphone_api.setparameter('username', this.params.username)
				webphone_api.setparameter('password', this.params.password)
				webphone_api.setparameter('serveraddress', this.params.domain)
				webphone_api.start()
			},
			returnLetterDos(position){
				let chart=this.dataTeclado[position].chart.toString()
				if(this.params.destination.length <= 8){
					this.params.destination=this.params.destination.concat(chart)
				}else{
					return false
				}
			},
			returnLetter(position){
				let chart=this.dataTeclado[position].chart.toString()
				if(this.input.transfer.length <= 8){
					this.input.transfer=this.input.transfer.concat(chart)
				}else{
					return false
				}
			},
			doCall(v){
				this.screen.start=true
				this.screen.inCall=true
				this.button.call=false
				webphone_api.call(v.number)
			},
			doHangup(){
				this.screen.start=false
				this.screen.inCall=false
				this.button.call=true
				webphone_api.hangup()
			},
			doSetVolume(type_event, vol){
				webphone_api.setvolume(type_event, vol)
			},
			doHold(){
				this.button.hold= !this.button.hold
				webphone_api.hold(this.button.hold)
			},
            doMute(){
	            this.button.mute= !this.button.mute
				webphone_api.mute(this.button.mute)
            },
			doTranfer(){
				this.doHold()
	            this.screen.inTransfer= !this.screen.inTransfer
            },
			doTranferCall(){
				this.doHold()
				this.screen.inTransfer= !this.screen.inTransfer
				this.button.transfer= !this.button.transfer
				webphone_api.transfer(this.input.transfer);
				this.validateCall()
			}
		},
	}
</script>

<style scoped>

</style>