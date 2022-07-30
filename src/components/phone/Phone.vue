<template>
  <div class="py-2">
    <b-row>
      <b-col cols="6" class="my-auto">
        <span class="h5">Webphone Example</span>
      </b-col>
      <b-col cols="6" class="text-right">
        <b-button v-b-modal.modalConfiguration>
          <b-icon-gear-fill></b-icon-gear-fill>
          <span> Settings</span>
        </b-button>
      </b-col>
    </b-row>

    <!-- Teclado -->
    <b-row>
      <b-col lg="6" cols="12" class="mx-auto py-3">
        <!-- App Webphone -->
        <b-card no-body class="p-2">
          <template v-if="!screen.inTransfer">
            <div class="form-group">
              <div class="input-group input-group-lg">
                <input title="" ref="inputDestination" v-model="input.transfer" type="text" class="form-control" maxlength="9" />
                <template v-if="input.transfer !== ''">
                  <div class="input-group-append">
                    <button type="button" class="btn btn-primary" @click="doClear"><i class="fa fa-times"></i></button>
                  </div>
                </template>
              </div>
            </div>
            <div class="row">
              <template v-for="(v, k) in dataTeclado">
                <template v-if="k % 3 === 0">
                  <div class="col-4 pr-0">
                    <button class="btn btn-lg btn-outline-secondary btn-block mb-1" @click="doDTMF(v.chart)">
                      <template v-if="v.icon !== undefined">
                        <i :class="v.icon"></i>
                      </template>
                      <template v-else>
                        <span class="h4">{{ v.chart }}</span>
                      </template>
                    </button>
                  </div>
                </template>
                <template v-if="k % 3 === 1">
                  <div class="col-4 pl-1 pr-1">
                    <button class="btn btn-lg btn-outline-secondary btn-block mb-1" @click="doDTMF(v.chart)">
                      <span class="h4">{{ v.chart }}</span>
                    </button>
                  </div>
                </template>
                <template v-if="k % 3 === 2">
                  <div class="col-4 pl-0">
                    <button class="btn btn-lg btn-outline-secondary btn-block mb-1" @click="doDTMF(v.chart)">
                      <template v-if="v.icon !== undefined">
                        <i :class="v.icon"></i>
                      </template>
                      <template v-else>
                        <span class="h4">{{ v.chart }}</span>
                      </template>
                    </button>
                  </div>
                </template>
              </template>
            </div>
            <b-row>
              <b-col cols="12" class="pb-1">
                <b-button block variant="success" :disabled="input.transfer === ''" @click="doTranferCall">Transferir llamada</b-button>
              </b-col>
            </b-row>
          </template>
          <b-row>
            <template v-if="button.call.status">
              <b-col cols="8">
                <!-- Llamar -->
                <b-button variant="success" @click="doCall" :disabled="button.call.disabled">
                  <b-icon-telephone-fill></b-icon-telephone-fill>
                  <span> Call</span>
                </b-button>
              </b-col>
              <b-col cols="4" class="text-right">
                <!-- Eliminar caractér -->
                <b-button variant="secondary">
                  <b-icon-backspace-fill></b-icon-backspace-fill>
                </b-button>
              </b-col>
            </template>
            <template v-else>
              <b-col cols="4">
                <span class="btn btn-block">
                  <i class="fa fa-user-circle mr-3"></i>
                  <small>{{ timer }}</small>
                </span>
              </b-col>
              <b-col cols="2">
                <!-- Pausar Llamada -->
                <b-button variant="secondary" :disabled="button.hold.disabled" @click="doHold">
                  <b-icon-play v-show="button.hold.status"></b-icon-play>
                  <b-icon-pause v-show="!button.hold.status"></b-icon-pause>
                </b-button>
              </b-col>
              <b-col cols="2">
                <!-- Transferir Llamada -->
                <b-button title="Tranferir Llamada" variant="secondary" :disabled="button.transfer.disabled" @click="doTransfer">
                  <b-icon-telephone-forward-fill v-show="!button.transfer.status"></b-icon-telephone-forward-fill>
                  <b-icon-pause v-show="button.transfer.status"></b-icon-pause>
                </b-button>
              </b-col>
              <b-col cols="2">
                <!-- Mute Llamada -->
                <b-button title="Silenciar Llamada" variant="secondary" :disabled="button.mute.disabled" @click="doMute">
                  <b-icon-mic-fill v-show="!button.mute.status"></b-icon-mic-fill>
                  <b-icon-mic-mute v-show="button.mute.status"></b-icon-mic-mute>
                </b-button>
              </b-col>
              <b-col cols="2">
                <!-- Colgar Llamada -->
                <b-button title="Terminar Llamada" variant="danger" :disabled="button.hangup.disabled" @click="doHangup">
                  <b-icon-telephone-x-fill></b-icon-telephone-x-fill>
                </b-button>
              </b-col>
            </template>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- Lista de Llamadas -->
    <b-table-simple responsive striped class="pt-2">
      <b-thead>
        <b-tr>
          <b-td>#</b-td>
          <b-td>Telefono</b-td>
          <b-td>Acción</b-td>
          <b-td>Historial</b-td>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(v, k) in dataList" class="my-auto">
          <b-td class="align-middle">{{ v.id }}</b-td>
          <b-td class="align-middle">{{ v.phone }}</b-td>
          <b-td class="text-left">
            <b-button variant="success" @click="doCall(v.phone)">
              <b-icon-telephone-fill></b-icon-telephone-fill>
            </b-button>
          </b-td>
          <b-td>
            <b-button variant="danger">
              <b-icon-telephone-x-fill></b-icon-telephone-x-fill>
            </b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <!-- Activar para depurar data -->
    <template v-if="false">
      <div class="w-100">
        <pre class="bg-light" style="max-height: 200px; min-height: 200px"><code class="ml-2 mr-2" v-html="print_console"></code></pre>
      </div>
    </template>

    <!-- Footer -->
    <MyFooter></MyFooter>

    <!-- Modal -->
    <b-modal ref="modal" id="modalConfiguration" title="Configuración SIP">
      <div class="row">
        <div class="col-12">
          <span class="text-uppercase font-weight-normal">Management</span>
        </div>
        <div class="w-100">
          <hr />
        </div>
        <div class="col-12">
          <div class="form-group">
            <span>Username</span>
            <input v-model="params.username" type="text" class="form-control form-control-sm" />
          </div>
          <div class="form-group">
            <span>Password</span>
            <input v-model="params.password" type="password" class="form-control form-control-sm" />
          </div>
          <div class="form-group">
            <span>Domain</span>
            <input v-model="params.domain" type="text" class="form-control form-control-sm" />
          </div>
        </div>
        <div class="w-100">
          <hr />
        </div>
        <div class="col-12">
          <span class="text-uppercase font-weight-normal">Settings</span>
        </div>
        <div class="w-100">
          <hr />
        </div>
        <div class="col-12">
          <div class="form-group">
            <label
              >Volumen Microfono <span class="text-secondary">({{ button.volume.microphone }})</span></label
            >
            <input
              title="Microfono"
              @change="doSetVolume(0, button.volume.microphone)"
              v-model="button.volume.microphone"
              type="range"
              class="form-control form-control-sm"
              min="0"
              max="100"
              step="5"
              value="100"
            />
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import '../../../public/webphone_api.js'
import PhoneService from '../../services/PhoneService'
import MyFooter from '@/components/common/MyFooter'

export default {
  name: 'Phone',
  components: { MyFooter },
  data: () => ({
    timer: '00:00:00',
    totalSeconds: 0,
    timerUpdate: null,
    print_console: '',
    status: { connected: false },
    screen: {
      inCall: true,
      inTransfer: false,
      inPause: false,
      inVideoCall: false,
      start: false,
    },
    time: {
      start: '00:00:00',
      end: '00:00:00',
    },
    numbers: [],
    number: '',
    dataTeclado: [
      { chart: '1', value: 'abc' },
      { chart: '2', value: 'abc' },
      { chart: '3', value: 'def' },
      { chart: '4', value: 'ghi' },
      { chart: '5', value: 'jkl' },
      { chart: '6', value: 'mno' },
      { chart: '7', value: 'pqrs' },
      { chart: '8', value: 'tuv' },
      { chart: '9', value: 'wxyz' },
      { chart: '*', value: '', icon: 'fa fa-asterisk' },
      { chart: '0', value: '' },
      { chart: '#', value: '', icon: 'fa fa-hashtag' },
    ],
    button: {
      call: { status: false, disabled: true },
      hold: { status: false, disabled: true },
      mute: { status: false, disabled: true },
      hangup: { status: false, disabled: false },
      transfer: { status: false, disabled: true },
      volume: {
        microphone: 75,
        ringback: 75,
        playback: 75,
      },
    },
    dataList: [
      { id: 1, phone: '955588297' },
      { id: 2, phone: '994719466' },
    ],
    params: {
      display_name: '204',
      username: '204',
      password: '7015102',
      domain: '192.168.80.3',
      authorization: '204',
      destination: '955588297',
    },
    modal: [
      {
        title: 'Teclado Virtual',
        status: false,
        size: 'sm',
        footerclass: ['justify-content-center'],
      },
      {
        title: 'Transferencia de Llamada',
        status: false,
        size: 'sm',
        footerclass: ['justify-content-center'],
      },
    ],
    input: {
      marker: '',
      keyboard: '',
      transfer: '',
    },
    buttons: {
      call: { status: true },
      hangup: { status: false },
      play: { status: true, disabled: true },
      pause: { status: false, disabled: true },
      microphone: { status: true, disabled: true },
      transfer: { status: true, disabled: true },
      keyboard: { status: true, disabled: true },
    },
    dataKeyboard: [
      { chart: '1', value: 'abc' },
      { chart: '2', value: 'abc' },
      { chart: '3', value: 'def' },
      { chart: '4', value: 'ghi' },
      { chart: '5', value: 'jkl' },
      { chart: '6', value: 'mno' },
      { chart: '7', value: 'pqrs' },
      { chart: '8', value: 'tuv' },
      { chart: '9', value: 'wxyz' },
      { chart: '*', value: '', icon: 'fas fa-asterisk' },
      { chart: '0', value: '' },
      { chart: '#', value: '', icon: 'fas fa-hashtag' },
    ],
  }),
  created() {
    // this.doStart()
  },
  methods: {
    getData() {
      PhoneService.dispatch('getData', { self: this })
    },
    doClear() {
      this.input.transfer = ''
      this.$refs.inputDestination.focus()
    },
    doStart() {
      webphone_api.setparameter('serveraddress', this.params.domain)
      webphone_api.setparameter('username', this.params.username)
      webphone_api.setparameter('password', this.params.password)
      webphone_api.start()
      this.listenPrintEvents()
      this.listenChanges()
    },
    doAccept() {
      webphone_api.accept()
    },
    doReject() {
      webphone_api.reject()
    },
    returnLetter(position) {
      let chart = this.dataTeclado[position].chart.toString()
      if (this.input.transfer.length <= 8) {
        this.input.transfer = this.input.transfer.concat(chart)
      } else {
        return false
      }
    },
    doCall(number) {
      this.screen.start = true
      this.screen.inCall = true
      this.button.call.status = false
      webphone_api.call(number)
    },
    doHangup() {
      this.screen.start = false
      this.screen.inCall = false
      this.button.call.status = true
      this.button.transfer.status = false
      //
      this.button.mute.disabled = true
      this.button.hold.disabled = true
      this.button.transfer.disabled = true
      webphone_api.hangup()
      this.stopInterval()
    },
    doSetVolume(type_event, vol) {
      webphone_api.setvolume(type_event, vol)
    },
    doHold() {
      this.button.hold.status = !this.button.hold.status
      webphone_api.hold(this.button.hold.status)
    },
    doMute() {
      this.button.mute.status = !this.button.mute.status
      webphone_api.mute(this.button.mute.status)
    },
    doTransfer() {
      this.button.transfer.status = !this.button.transfer.status
      if (!this.button.hold.status) {
        this.doHold()
      }
      this.screen.inTransfer = !this.screen.inTransfer
    },
    doDTMF(value) {
      webphone_api.dtmf(value)
    },
    doTranferCall() {
      this.doHold()
      this.screen.inTransfer = !this.screen.inTransfer
      this.button.transfer.status = !this.button.transfer.status
      webphone_api.transfer(this.input.transfer)
    },
    listenChanges() {
      webphone_api.onCallStateChange((event, direction) => {
        switch (event) {
          case 'callSetup':
            if (direction == 1) {
              // means it's outgoing call
            } else if (direction == 2) {
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
            this.button.mute.disabled = false
            this.button.hold.disabled = false
            this.button.transfer.disabled = false
            this.startInterval()
            break
        }
      })
    },
    listenPrintEvents() {
      webphone_api.onEvents((evt) => {
        this.print_console += '<span class="ml-3 mr-3">' + evt + '</span><br>'
      })
    },
    startInterval() {
      this.totalSeconds = 0
      this.timerUpdate = setInterval(() => {
        ++this.totalSeconds //incrementar
        let hour = ('0' + Math.floor((this.totalSeconds / 3600) % 24)).slice(-2), //Obtener hora
          minute = ('0' + Math.floor((this.totalSeconds / 60) % 60)).slice(-2), //Obtener minuto
          seconds = ('0' + Math.floor(this.totalSeconds % 60)).slice(-2) //Obtener segundo
        this.timer = hour + ':' + minute + ':' + seconds //00:00:00
      }, 1000)
    },
    stopInterval() {
      clearInterval(this.timerUpdate)
      this.timerUpdate = null
      this.timer = '00:00:00'
    },
  },
}
</script>

<style scoped>
.btn-circle {
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  padding: 0;
}
</style>
