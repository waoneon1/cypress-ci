<template>
  <section  style="height:70vh;width:90%;">
    <div  class="h-4/5 w-full relative">
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
          class="absolute mt-8 ml-8 w-full h-full rounded-lg border cursor-pointer shadow-lg bg-primary" style="z-index: 3">
          <div class="h-full p-4">
            <img :src="current.employee_image_url" :alt="current.employee_name">
            <div class="text">
              <h2>{{current.employee_name}}, <span>{{current.employee_business_unit}}</span></h2>
            </div>
          </div>
        </Vue2InteractDraggable>
      </div>
      <!-- two -->
      <div
        v-if="next"
        style="z-index: 2"
        class="absolute mt-4 ml-4 w-full h-full rounded-lg border cursor-pointer shadow-lg bg-green-500">
          <div class="h-full p-4">
            <img :src="next.employee_image_url" :alt="next.employee_name">
            <div class="text">
              <h2>{{next.employee_name}}, <span>{{next.employee_business_unit}}</span></h2>
            </div>
          </div>
      </div>
      <!-- three -->
      <div
        v-if="index + 2 < cards.length"
        style="z-index: 1"
        class="absolute w-full h-full rounded-lg border cursor-pointer shadow-lg  bg-secondary">
          <div class="h-full p-4"></div>
      </div>

    </div>

  </section>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'
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
export default class SwipeableCardDemo extends Vue {

  // Data: {}
  isVisible:boolean = true
  index:number = 0
  interactEventBus = {
    draggedRight: EVENTS.MATCH,
    draggedLeft: EVENTS.REJECT,
  }
  @Prop({ required: true, type: Array }) cards!: EmployeeResponseData[];

  // Computed: {}
  current = this.cards[0]
  @Watch('index')
  currentFunc() { this.current = this.cards[this.index] }
  
  next = this.cards[1]
  @Watch('index')
  nextFunc() { this.next = this.cards[this.index + 1] }

  // Method: {}
  match() {
    InteractEventBus.$emit(EVENTS.MATCH)
  }
  reject() {
    InteractEventBus.$emit(EVENTS.REJECT)
  }

  emitAndNext(event: 'match' | 'reject') {
    this.$emit(event, this.index)
    setTimeout(() => this.isVisible = false, 200)
    setTimeout(() => {
      this.index++
      this.isVisible = true
    }, 200)
  }

  mounted() {}
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