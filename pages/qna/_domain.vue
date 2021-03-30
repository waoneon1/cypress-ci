<template>
  <div class="bg-gray-100 h-screen overflow-x-hidden">
    <div
      class="relative bg-white mx-auto max-w-md min-h-screen px-7 font-secondary pb-28"
    >
      <!-- TODO: Delete this setelah integrasi ke BE -->
      <!-- {{ allSelectedAnswer }}
      {{ selectedAnswer }} -->
      <!-- Heading -->
      <div class="flex justify-center relative py-5">
        <svg class="fill-current text-red-500 absolute left-0 w-5 h-5" viewBox="0 0 8 12" fill="none">
          <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z"/>
        </svg>
        <h1 class="text-primary text-sm">
          {{ domain }}
        </h1>
      </div>

      <!-- Content: Question -->
      <div class="relative">
        <div class="flex justify-between text-xs text-gray-300 mb-3">
          <span>Question</span>
          <span>{{ currentPages }} of {{ pages }}</span>
        </div>
        <div class="bg-primary text-white font-bold rounded-xl p-6 mb-10">
          {{ questions() }}
        </div>
      </div>

      <!-- Content: Answer -->
      <div class="relative">
        <p class="text-xs text-gray-300 mb-5">Select 3 recommended Alterrans</p>
        <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6">
          <div
            v-for="(item, i) in answers()" :key="i"
            @click="answerAdd(item.id)"
          >
            <div :class="`${selectedAnswerClass(item.id)} rounded-xl overflow-hidden cursor-pointer hover:opacity-50`">
              <div class="bg-gray-50 flex justify-center pt-4">
                <img class="" src="~/static/img/img-01.png" />
              </div>
              <div class="flex justify-center bg-white text-sm px-2 py-2">
                <small class="text-primary">{{ item.name }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Footer -->
      <div class="fixed bottom-0 left-0 right-0">
        <div class="mx-auto max-w-md bg-white pb-2 px-7 py-4 bg-white rounded-t-xl shadow-lg">
          <div class="flex justify-between items-center">
            <div class="relative">
              <p class="text-xs text-gray-300 mb-2">Select {{ selectedAnswer.length }} of {{ maxSelectedAnswer }}</p>
              <div class="flex h-10">
                <div
                  v-for="(item, i) in selectedAnswer" :key="i"
                  @click="answerAdd(item)"
                >
                  <img :class="`w-9 h-9 border border-gray-300 border-dashed rounded-full relative ${indenClass[i]}`" src="~/static/img/img-01.png" />
                </div>
              </div>
            </div>
            <div class="inline-block">
              <div class="rounded-full py-3 px-10 border border-solid border-secondary bg-secondary text-white focus:outline-none cursor-pointer flex items-center mx-auto justify-center inline-block">
                <span @click="nextPage()" class="font-bold text-sm">
                  {{ buttonLabel() }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class ClassDashboard extends Vue {
  domain: string = ''

  selectedAnswer: number[] = []

  allSelectedAnswer: number[][] = []

  maxSelectedAnswer = 3

  indenClass: string[] = ['', '-left-2', '-left-3.5']

  // pagination
  pages: number = 10

  currentPages: number = 1

  answers = () => [
    { id: 1, img: 'img', name: 'Ekky' },
    { id: 2, img: 'img', name: 'Wawan' },
    { id: 3, img: 'img', name: 'Rizky' },
    { id: 4, img: 'img', name: 'Alan' },
    { id: 5, img: 'img', name: 'Agus' },
    { id: 6, img: 'img', name: 'Linggar' },
    { id: 7, img: 'img', name: 'Herman' },
    { id: 8, img: 'img', name: 'Kevin' },
    { id: 9, img: 'img', name: 'Doni' },
  ]

  nextPage(): void {
    this.allSelectedAnswer.push(this.selectedAnswer);
    this.selectedAnswer = [];
    if (this.currentPages !== this.pages) {
      this.currentPages += 1;
    }
  }

  buttonLabel(): string {
    if (this.selectedAnswer.length > 0) {
      return this.currentPages === this.pages ? 'Finish' : 'Next';
    }
    return this.currentPages === this.pages ? 'Finish' : 'Skip';
  }

  questions(): string {
    const q = [
      'If you need help with Design, would you rather ask?',
      'If you need help with Design, 1',
      'If you need help with Design, 2',
      'If you need help with Design, 3',
      'If you need help with Design, 4',
    ];
    return q[this.currentPages - 1] ? q[this.currentPages - 1] : '- no content -';
  }

  selectedAnswerClass(id: number): string {
    return this.selectedAnswer.includes(id) ? 'opacity-30 shadow-md' : 'shadow-lg';
  }

  answerAdd(id: number): void {
    const index = this.selectedAnswer.indexOf(id);
    if (index === -1) {
      if (this.selectedAnswer.length < this.maxSelectedAnswer) {
        this.selectedAnswer.push(id);
      }
    } else {
      this.selectedAnswer.splice(index, 1);
    }
  }

  init() {
    this.domain = this.$route.params.domain ? this.$route.params.domain : 'No Title';
  }

  mounted() {
    this.init();
  }
}
</script>

<style></style>
