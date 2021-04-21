<template>
  <div
    class="font-mulish fixed max-w-md left-0 right-0 m-auto z-50"
    v-show="show"
  >
    <div
      class="flex justify-between px-6 py-4 items-center"
      :class="theme == 'success' ? 'bg-success' : 'bg-danger'"
    >
      <div
        :class="
          `flex items-center justify-center flex-none rounded-full w-5 h-5 font-bold cursor-pointer`
        "
      >
        <img
          v-if="theme == 'success'"
          src="~/static/img/svg/check.svg"
          alt="toast icon success"
        />
        <img
          v-else
          src="~/static/img/svg/exclamation.svg"
          alt="toast icon error"
        />
      </div>
      <div class="flex-grow relative ml-5">
        <h4 class="text-sm font-bold text-white">{{ title }}</h4>
        <p class="text-xs font-light text-white">{{ description }}</p>
      </div>
      <div
        @click="setAlertFalse()"
        :class="
          `flex items-center justify-center flex-none rounded-full w-5 h-5 font-bold cursor-pointer`
        "
      >
        <img src="~/static/img/svg/cross.svg" alt="toast icon close" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Emit } from 'vue-property-decorator';
import { alertModule } from '@/store/alert';

@Component
export default class Alert extends Vue {

  @Prop({ required: true, type: String }) title!: string;

  @Prop({ required: true, type: String }) description!: string;

  @Prop({ required: true, type: String }) theme!: string;
  
  @Prop({ required: false, type: Boolean }) show!: boolean;

  @Emit('close')
  setAlertFalse(): void {
    alertModule.setAlertFalse()
  }
  
}
</script>
