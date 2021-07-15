<template>
  <div>
    <!-- Alert -->
    <div class="font-mulish fixed max-w-md left-0 right-0 m-auto z-50" v-show="alert">
      <div class="flex justify-between px-6 py-4 items-center bg-blue-300">
        <div :class="`flex items-center justify-center flex-none rounded-full w-5 h-5 font-bold cursor-pointer`">
          <img src="~/static/img/svg/exclamation.svg" alt="toast icon error"/>
        </div>
        <div class="flex-grow relative ml-5">
          <h4 class="text-sm font-bold text-white">Sudah mencapai minimum Alterran</h4>
          <p class="text-xs font-light text-white">Kamu sudah memilih Alterrans, kamu bisa masuk dimenu memilih alterrans.</p>
        </div>
        <div @click="alert = false" :class="`flex items-center justify-center flex-none rounded-full w-5 h-5 font-bold cursor-pointer`">
          <img src="~/static/img/svg/cross.svg" alt="toast icon close" />
        </div>
      </div>
    </div>
    <div class="flex flex-col" style="height:70vh;">
      <!-- TODO: Error type package vue2-interact -->
      <!-- TODO: Styling Loading -->
      <div class="w-11/12 flex-grow">
        <div  class="h-full w-full relative">
          <!-- one -->
          <div
            v-if="current"
            style="z-index: 3"
            :class="{ 'transition': isVisible }">
            <Vue2InteractDraggable
              v-if="isVisible"
              :interact-out-of-sight-x-coordinate="500"
              :interact-max-rotation="15"
              :interact-x-threshold="200"
              :interact-y-threshold="200"
              :interact-event-bus-events="interactEventBus"
              interact-block-drag-down
              @draggedRight="emitAndNext('match')"
              @draggedLeft="emitAndNext('reject')"
              class="absolute mt-4 ml-4 w-full h-full rounded-lg border cursor-pointer shadow-lg  bg-white" style="z-index: 3">
              <div class="h-full">
                <img :src="current.employee_image_url" :alt="current.employee_name">
                <div class="p-3">
                  <h2 class="text-sm text-primary font-bold">{{current.employee_name}}</h2>
                  <span class="text-xs block pt-1">Bussines Unit: {{current.employee_business_unit}}</span>
                  <span class="text-xs block pt-1">Organisasi: {{current.employee_organization}}</span>
                </div>
              </div>
            </Vue2InteractDraggable>
          </div>
          <!-- two -->
          <div
            v-if="next"
            style="z-index: 2"
            class="absolute mt-2 ml-2 w-full h-full rounded-lg border cursor-pointer shadow-lg bg-white">
              <div class="h-full">
                <img :src="next.employee_image_url" :alt="next.employee_name">
                <div class="p-3">
                  <h2 class="text-sm text-primary font-bold">{{next.employee_name}}</h2>
                  <span class="text-xs block pt-1">Bussines Unit: {{next.employee_business_unit}}</span>
                  <span class="text-xs block pt-1">Organisasi: {{next.employee_organization}}</span>
                </div>
              </div>
          </div>
          <!-- three -->
          <div
            v-if="index + 2 < cards.length"
            style="z-index: 1;background-color: #f0f0f2;"
            class="absolute w-full h-full rounded-lg border cursor-pointer shadow-lg bg-white">
              <img :src="next.employee_image_url" :alt="next.employee_name">
              <div class="p-3">
                <h2 class="text-sm text-primary font-bold">{{next.employee_name}}</h2>
                <span class="text-xs block pt-1">Bussines Unit: {{next.employee_business_unit}}</span>
                <span class="text-xs block pt-1">Organisasi: {{next.employee_organization}}</span>
              </div>
          </div>
        </div>
      </div>
      <div class="flex-none h-10">
        <div class="flex justify-around mt-10">
          <div :class="`bg-danger flex items-center justify-center flex-none rounded-full w-10 h-10 font-bold cursor-pointer`"
            @click="reject">
            <img class="w-9 h-9" src="~/static/img/svg/cross.svg" alt="toast icon close" />
          </div>
          <button 
            @click="save()" 
            class="ml-2 rounded-full py-2 px-6 border border-solid text-white focus:outline-none inline-block"
            :class="disableWhitelist ? 'border-gray-200 bg-gray-200' : 'border-secondary bg-secondary hover:bg-yellow-700'"
            :disabled="disableWhitelist"
          >
            <span class="font-bold text-sm">Selesai</span>
          </button>
          <div :class="`bg-success flex items-center justify-center flex-none rounded-full w-10 h-10 font-bold cursor-pointer`"
            @click="match">
            <img class="w-9 h-9" src="~/static/img/svg/check.svg" alt="toast icon success "/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Emit } from 'vue-property-decorator';
import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'
const _ = require('lodash');
export interface EmployeeResponseData {
  /* eslint-disable camelcase */
  id: string;
  employee_name: string;
  employee_email: string;
  employee_image_url: string;
  employee_alt_id: string;
  employee_organization: string;
  employee_organization_full_text: string;
  employee_business_unit: string;
  created_at: string;
  updated_at: string;
  /* eslint-enable camelcase */
}

const EVENTS = {
  MATCH: 'match',
  REJECT: 'reject'
}

@Component({
  components: {
    Vue2InteractDraggable,
  },
})
export default class SwipeableCard extends Vue {

  // Data: {}
  isVisible:boolean = true
  index:number = 0
  selected: EmployeeResponseData[] = []
  interactEventBus = {
    draggedRight: EVENTS.MATCH,
    draggedLeft: EVENTS.REJECT,
  }
  disableWhitelist:boolean = true
  alert: boolean = false;
  @Prop({ required: true, type: Array }) 
  cards!: EmployeeResponseData[];

  // Computed: {}
  current = this.cards[0]
  @Watch('index')
  currentComputed() { this.current = this.cards[this.index] }
  
  next = this.cards[1]
  @Watch('index')
  nextComputed() { this.next = this.cards[this.index + 1] }

  // Method: {}
  match() {
    InteractEventBus.$emit(EVENTS.MATCH)
  }
  reject() {
    InteractEventBus.$emit(EVENTS.REJECT)
  }

  checkWhitelist() {
    if(this.selected.length >= 9) {
      if(this.selected.length == 9) {
        this.alert = true
      } else {
        this.alert = false
      }
      this.disableWhitelist = false
    }
  }

  emitAndNext(event: 'match' | 'reject') {
    this.$emit(event, this.index)
    if ( event === 'match') {
      this.selected.push(this.cards[this.index])
    }
    this.checkWhitelist()
    setTimeout(() => this.isVisible = false, 200)
    setTimeout(() => {
      this.index++
      this.isVisible = true
    }, 200)
  }

  save(): void {
    const payload = {
      selected: _.map(this.selected, 'employee_email'),
    };
    localStorage.setItem('rrs_whitelist', JSON.stringify(payload));
    this.$router.push(`/qna/${this.$route.query.callback}`);
  }
}
</script>

<style scoped>
.btn {
  position: relative;
  width: 50px;
  height: 50px;
  padding: .2rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 6px 6px -3px rgba(0,0,0,0.02), 0 10px 14px 1px rgba(0,0,0,0.02), 0 4px 18px 3px rgba(0,0,0,0.02);
  cursor: pointer;
  transition: all .3s ease;
  user-select: none;
  -webkit-tap-highlight-color:transparent;
}
.btn:active {
  transform: translateY(4px);
}
.btn i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.btn i:before {
  content: '';
}
.transition {
  animation: appear 200ms ease-in;
}
@keyframes appear {
  from {
    transform: translate(-48%, -48%);
  }
  to {
    transform: translate(-50%, -50%);
  }
}
</style>