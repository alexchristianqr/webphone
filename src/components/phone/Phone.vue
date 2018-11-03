<template>
    <div>
        <!-- Nav -->
        <nav class="bg-light navbar-expand p-3">
            <div class="row">
                <div class="col-8 my-auto"><h6>Webphone Securitec</h6></div>
                <div class="col-4 text-right">
                    <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modalConfiguration">
                        <i class="fa fa-cog"></i>
                    </button>
                </div>
            </div>
        </nav>
        <div class="col-sm-12 col-md-12 col-lg-4 offset-lg-4 offset-md-4 ">
            <div class="mt-3">
                <div class="card" v-show="screen.start">
                    <div hidden class="card-body m-0 p-2">
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
                            <template v-if="button.call.status">
                                <div class="col-8 pr-1"><!-- Llamar -->
                                    <button @click="doCall" :disabled="button.call.disabled" class="btn btn-success btn-block">Call</button>
                                </div>
                                <div class="col-4 pl-0"><!-- Eliminar Caracter -->
                                    <button type="button" class="btn btn-secondary btn-block"><i class="fa fa-reply"></i></button>
                                </div>
                            </template>
                            <template v-if="!button.call.status">
                                <div class="col-4">
                                    <span class="btn btn-block">
                                        <i class="fa fa-user-circle mr-3"></i>
                                        <small>{{timer}}</small>
                                    </span>
                                </div>
                                <div class="col-2">
                                    <template v-if="button.hold.status"><!-- Pausar Llamada -->
                                        <button type="button" :disabled="button.hold.disabled" @click="doHold" class="btn btn-outline-secondary btn-block"><i class="fa fa-play"></i></button>
                                    </template>
                                    <template v-else><!-- Retomar Llamada -->
                                        <button type="button" :disabled="button.hold.disabled" @click="doHold" class="btn btn-outline-secondary btn-block"><i class="fa fa-pause"></i></button>
                                    </template>
                                </div>
                                <div class="col-2"><!-- Transferir Llamada -->
                                    <button title="Tranferir Llamada" :disabled="button.transfer.disabled" @click="doTranfer" :class="button.transfer.status ? 'btn btn-outline-secondary btn-block active' : 'btn btn-outline-secondary btn-block'"><i class="fa fa-retweet"></i></button>
                                </div>
                                <div class="col-2"><!-- Mute Llamada -->
                                    <button :disabled="button.mute.disabled" :title="button.mute.status ? 'Poner en silencio' : 'Quitar silencio'" @click="doMute" :class="button.mute.status ? 'btn btn-outline-secondary btn-block active' : 'btn btn-outline-secondary btn-block'"><i class="fa fa-volume-off"></i></button>
                                </div>
                                <div class="col-2"><!-- Colgar Llamada -->
                                    <button :disabled="button.hangup.disabled" @click="doHangup" class="btn btn-danger btn-block"><i class="fa fa-times"></i></button>
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
                            <button type="button" class="btn btn-success btn-block" @click="doTranferCall">Tranferir Llamada</button>
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
                                <span class="my-auto">{{v[1]}}</span>
                            </td>
                            <td class="text-center">
                                <button class="btn btn-success btn-sm btn-block" @click="doCall(v[1])">Llamar</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="container w-100">
            <pre class="bg-light" style="max-height: 200px;min-height: 200px">
                <code class="ml-2 mr-2" v-html="print_console"></code>
            </pre>
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
	import '../../../public/webphone_api.js'
    import PhoneService from '../../services/PhoneService'

	export default {
		name:'Phone',
		data:()=>({
            timer:'',
            print_console:'',
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
				call:{status:false,disabled:true},
				hold:{status:false,disabled:true},
				mute:{status:false,disabled:true},
				hangup:{status:false,disabled:true},
				transfer:{status:false,disabled:true},
				volume:{
					microphone:75,
					ringback:50,
					playback:50,
				},
			},
            dataList:[],
            validate:{
				call:false
            }
		}),
        created(){
	        this.getData()
            this.listenChanges()
	        this.printConsoleEvents()
        },
		methods:{
			getData(){
			    PhoneService.dispatch('getData',{self:this})
            },
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

				this.button.mute.disabled=true
				this.button.hold.disabled=true
				this.button.transfer.disabled=true
				this.button.hangup.disabled=true

				webphone_api.hangup()
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
			doTranfer(){
				this.doHold()
	            this.screen.inTransfer= !this.screen.inTransfer
            },
			doTranferCall(){
				this.doHold()
				this.screen.inTransfer= !this.screen.inTransfer
				this.button.transfer.status= !this.button.transfer.status
				webphone_api.transfer(this.input.transfer);
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
                        	console.log('Ring Ring')
                            break
                        case 'callConnected':
	                        this.button.mute.disabled=false
	                        this.button.hold.disabled=false
	                        this.button.hangup.disabled=false
	                        this.button.transfer.disabled=false
                            break
					}
				})
			},
            printConsoleEvents(){
	            webphone_api.onEvents((evt)=>{
		            //ProcessEvents(evt);
		            let evtarray = evt.split(',');
		            if (evtarray[0] === 'STATUS' && evtarray[2] !== 'Ringing...'){
                        this.timer=evtarray[2].replace('Speaking (','').replace('sec)' != undefined ? 'sec)' : '','')
		            }
		            this.print_console+='<span class="ml-3 mr-3">'+evt+'</span><br>';
	            });
            },
            listenCdr(){
                webphone_api.onCdr(function (caller, called, connecttime, direction, peerdisplayname, reason, line){
	                this.print_console='<p>CDR: caller: ' + caller + ', called: ' + called + ', connecttime: ' + connecttime + ', direction: ' + direction + ', peerdisplayname: ' + peerdisplayname + ', reason: ' + reason + ', line: ' + line+'</p>';
                })
			}
		},
	}
</script>

<style scoped>

</style>