<template>
  <div
    class="absolute top-0 left-0 w-full flex bg-primary py-4 bg-opacity-90"
    style="margin-top:60px; height: calc(100vh - 60px);"
    v-show="show"
  >
    <div class="flex flex-col text-left px-5 w-full overflow-auto">
      <div class="text-white font-base text-sm">
          <h2 class="text-white mb-5 font-bold">Aturan</h2>
          <ol v-for="(item, i) in swipeRules" :key="i">
            <li class="mb-4">
              {{ item.desc }}
              <img
                :src="'/img/' + item.image"
                alt="exp"
                class="rounded-lg mt-4"
              />
            </li>
          </ol>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class HelpSwipe extends Vue {
  @Prop({ required: false, type: Boolean }) show!: boolean;

  swipeRules: object[] = [
    {
      id: 1,
      desc:
        'Swipe kanan untuk menambahkan Alterrans yang dipilih atau yang akan dinilai berdasarkan Domain',
      image: 'exp-swipe-right.png',
    },
    {
      id: 2,
      desc:
        'Selain swipe kanan juga bisa menggunakan button check berwarna hijau',
      image: 'exp-btn-check.png',
    },
    {
      id: 3,
      desc:
        'Jika kamu tidak tahu atau tidak akan menilai Alterrans yang ada bisa menggunakan swipe kiri untuk tidak',
      image: 'exp-swipe-left.png',
    },
    {
      id: 4,
      desc:
        'selain menggunakan swipe bisa menggunakan button cross untuk kebutuhan tidak',
      image: 'exp-btn-cross.png',
    },
    {
      id: 5,
      desc:
        'Jika sudah mencapai minimal 9 Alterrans yang dipilih akan ada notif dan button "Simpan" akan aktif, jika masih ingingin ada Alterrans yang mau di pilih bisa di lanjutkan terlebih dahulu sebelum menekan button "Simpan"',
      image: 'exp-notif.png',
    },
    {
      id: 6,
      desc:
        'Button "Simpan" bakal aktif ketika mencapai minimum dan bisa di tekan dan akan diarahkan ke menu menilai Alterrans',
      image: 'exp-btn-done-active.png',
    },
  ];
}
</script>
