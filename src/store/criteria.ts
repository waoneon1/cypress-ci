import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

export interface CriteriaResponseData {
  /* eslint-disable camelcase */
  criteria_name: string;
  id: string;
  /* eslint-enable camelcase */
}
export interface CriteriaResponse {
  /* eslint-disable-next-line camelcase */
  response_code: string;
  message: string;
  data: CriteriaResponseData[];
}

const url: string = process.env.NUXT_ENV_RRS_API_URL!;
@Module({ namespaced: true, name: 'criteria' })
export default class CriteriaModule extends VuexModule {
  public dataCriteria: CriteriaResponse = {
    response_code: '',
    message: '',
    data: [],
  }

  public dataCriteriaProgress = [
    {
      criteria_name: 'Design', description: 'Software Design Digunakan untuk mengembangkan dan menggambarkan arsitektur perangkat lunak suatu sistem berdasarkan persyaratan perangkat lunaknya: ini terdiri dari deskripsi tentang bagaimana perangkat lunak didekomposisi menjadi komponen dan antarmuka antara komponen tersebut. Itu komponen ditentukan pada tingkat detail yang memungkinkan konstruksinya. Bidang keterampilan ini juga mencakup keterampilan yang berkaitan dengan proses dan teknik untuk kualitas desain perangkat lunak, analisis, dan evaluasi.', id: '6062d4c9dd3acd0959261f51', progress: 70, rebbon: false,
    },
    {
      criteria_name: 'Requirements', description: 'Software requirements engineering terdiri dari aktivitas yang dilakukan untuk menemukan atribut dan antarmuka fungsional dan nonfungsional yang harus dimiliki sistem perangkat lunak untuk memenuhi kebutuhan pelanggan. Ini juga mencakup analisis dan kegiatan manajemen yang dilakukan untuk menemukan kekurangan dalam artefak persyaratan dan untuk mengelola proses rekayasa persyaratan.', id: '606d1d5cf50eab8cb59f434c', progress: 30, rebbon: false,
    },
    {
      criteria_name: 'Construction', description: 'Software Construction adalah kumpulan aktivitas dan proses untuk mengubah spesifikasi desain menjadi solusi perangkat lunak fungsional yang memenuhi kebutuhan pelanggan. Ini termasuk perencanaan, perancangan, pemrograman, debugging, pengujian, dan pengintegrasian komponen perangkat lunak. Sebagian besar konstruksi perangkat lunak dilakukan oleh tim profesional menggunakan alat (editor, kompiler, perangkat lunak kontrol versi, debugger, dan sebagainya) dan proses untuk menyelesaikan dan mengoordinasikan pekerjaan mereka.', id: '606d1d68f50eab8cb59f434d', progress: 30, rebbon: false,
    },
    {
      criteria_name: 'Testing', description: 'Software testing mencakup semua aktivitas yang dilakukan untuk mengevaluasi kualitas produk secara keseluruhan, yang memerlukan eksekusi kode. Bidang keterampilan pengujian perangkat lunak ini mencakup "verifikasi dinamis" dan berkaitan dengan pemilihan serangkaian kasus uji yang sesuai yang menunjukkan perilaku produk yang diharapkan dengan menjalankan perangkat lunak menggunakan kasus uji yang disiapkan dan hasilnya untuk menganalisis dan meningkatkan kualitas produk. ', id: '606d1d6df50eab8cb59f434e', progress: 45, rebbon: false,
    },
    {
      criteria_name: 'Sustainment', description: 'Software sustainment menangani masalah pemeliharaan plus dokumentasi, penerapan, operasi, keamanan, manajemen konfigurasi, pelatihan (pengguna dan personel pemeliharaan), meja bantuan, manajemen produk COTS, pembaruan teknologi, dan penghentian perangkat lunak. ', id: '606d1d73f50eab8cb59f434f', progress: 15, rebbon: false,
    },
    {
      criteria_name: 'Process', description: 'Elemen kunci dari Process Software adalah pengukuran dan penilaian efektivitas aktivitas individu dan kombinasinya untuk proyek perangkat lunak. Tujuan utama dari penilaian proses adalah untuk mengidentifikasi aktivitas proses dan kombinasi yang perlu dimodifikasi untuk mencapai tujuan proyek dengan lebih baik. ', id: '606d1d78f50eab8cb59f4350', progress: 100, rebbon: false,
    },
    {
      criteria_name: 'Systems Engineering', description: 'Systems Engineering adalah kumpulan komponen yang saling berhubungan yang berinteraksi dengan sistem lain dan lingkungan tempat mereka tertanam. Itu termasuk sistem alam, seperti tata surya kita, dan sistem buatan manusia, seperti komputer digital. ', id: '606d1d7ff50eab8cb59f4351', progress: 30, rebbon: false,
    },
    {
      criteria_name: 'Quality', description: 'Software quality skill area terdiri dari keterampilan dasar yang perlu dimiliki oleh seorang insinyur perangkat lunak untuk menghasilkan produk berkualitas tinggi, yang didefinisikan sebagai produk yang sesuai dengan persyaratannya dan memenuhi kebutuhan pengguna. ', id: '606d1d89f50eab8cb59f4352', progress: 0, rebbon: true,
    },
    {
      criteria_name: 'Security', description: 'Software security adalah bidang keterampilan lintas sektor yang memengaruhi seluruh pengembangan perangkat lunak dan siklus hidup operasi ', id: '606d1d8ef50eab8cb59f4353', progress: 100, rebbon: false,
    },
    {
      criteria_name: 'Config Management', description: 'Config Management adalah disiplin penerapan arahan dan pengawasan teknis dan administratif untuk mengidentifikasi dan mendokumentasikan karakteristik fungsional dan fisik dari item konfigurasi, untuk mengontrol perubahan pada karakteristik tersebut, untuk mencatat dan melaporkan pemrosesan dan implementasi perubahan status, dan untuk memverifikasi kepatuhan dengan persyaratan yang ditentukan [IEEE 828-2012] ', id: '606d1d95f50eab8cb59f4354', progress: 30, rebbon: false,
    },
    {
      criteria_name: 'Measurement', description: 'Measurement adalah dasar dari disiplin ilmu teknik, termasuk rekayasa perangkat lunak. Pengukuran digunakan untuk mengukur atribut proses dan produk untuk tujuan menilai kemajuan dan memberikan indikasi masalah nyata atau yang akan datang ', id: '606d1d9ff50eab8cb59f4355', progress: 10, rebbon: false,
    },
    {
      criteria_name: 'HCI', description: 'Design of human-computer interaction (HCI) dan antarmuka pengguna secara tradisional dianggap sebagai bagian dari ilmu komputer dan sebagian faktor manusia. ', id: '606d1da5f50eab8cb59f4356', progress: 30, rebbon: false,
    },
  ];

  @Mutation
  setCriteria(value: CriteriaResponse): void {
    this.dataCriteria = value;
  }

  @Action({ rawError: true })
  async getCriteria(): Promise<void> {
    const token: string | null = localStorage.getItem('token');
    try {
      const response = await axios.get(`${url}criteria_user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.data) {
        this.setCriteria(response.data);
      } else {
        this.setCriteria({
          response_code: '404',
          message: 'notfound',
          data: [],
        });
      }
    } catch {
      this.setCriteria({
        response_code: '401',
        message: 'unautorized',
        data: [],
      });
    }
  }
}

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    criteria: CriteriaModule,
  },
});
export const criteriaModule = getModule(CriteriaModule, store);
