export const steps = [
  {
    id: "1",
    message:
      "Selamat datang di website BengkalaJourney! Aku BengkalaBot🤖 yang siap membantu kamu menjelajahi budaya Bengkala. Apa yang ingin kamu lakukan hari ini?",
    trigger: "options",
  },
  {
    id: "options",
    options: [
      { value: "about", label: "Apa itu BengkalaJourney?", trigger: "tentang" },
      {
        value: "fitur",
        label: "Ada fitur apa saja?",
        trigger: "fitur",
      },
      {
        value: "tidak",
        label: "Tidak ada",
        trigger: "tidak",
      },
    ],
  },
  {
    id: "tidak",
    message:
      "Kalau butuh bantuan hubungi aku lagi yaa... Selamat menjelajahi Bengkala 🙌",
    trigger: "validasi",
  },
  {
    id: "validasi",
    options: [
      {
        value: "konfirmasi-validasi",
        label: "Aku ada pertanyaan lagi!",
        trigger: "konfirmasi-validasi",
      },
    ],
  },
  {
    id: "konfirmasi-validasi",
    message:
      "Tentu saja, aku siap membantu, kamu mau melakukan apa lagi hari ini? 😃",
    trigger: "options",
  },
  {
    id: "tentang",
    message:
      "BengkalaJourney merupakan website yang menyoroti tentang budaya yang ada di Desa Bengkala, salah satunya yaitu Budaya Kolok.",
    trigger: "options",
  },
  {
    id: "fitur",
    message:
      "Wah kamu mau tau ya? Nah di BengkalaJourney ada beragam fitur yang bisa kamu jelajahi, berikut beberapa fiturnya:",
    trigger: "fitur-options",
  },
  {
    id: "fitur-options",
    options: [
      { value: "kontribusi", label: "Kontribusi", trigger: "kontribusi" },
      { value: "forum", label: "Forum Diskusi", trigger: "forum" },
      { value: "berita", label: "Berita", trigger: "berita" },
      { value: "tenun", label: "Kain Tenun", trigger: "tenun" },
      { value: "playlist", label: "Playlist", trigger: "playlist" },
      { value: "kembali", label: "Kembali", trigger: "kembali" },
    ],
  },
  {
    id: "kontribusi",
    message:
      "Di fitur kontribusi ini kamu bisa mengunggah foto-foto kamu, misalnya kamu pernah datang ke Desa Bengkala terus kamu mengambil foto disana nah itu bisa kamu abadikan di fitur ini dengan cara mengunggahnya dan nantinya bisa di lihat oleh orang-orang 😁",
    trigger: "fitur-options",
  },
  {
    id: "forum",
    message:
      "Di Fitur ini kamu bisa bertanya dan menjawab pertanyaan dari orang-orang yang melakukan diskusi, kamu bisa berinteraksi disini dengan menuangkan pertanyaan, ide, ataupun hal menarik lainnya 😃",
    trigger: "fitur-options",
  },
  {
    id: "berita",
    message:
      "Di fitur ini terdapat berita-berita mengenai Desa Bengkala ataupun yang terkait, kamu disini bisa membaca semua berita yang terupdate mengenai desa bengkala 🤓",
    trigger: "fitur-options",
  },
  {
    id: "tenun",
    message:
      "Di fitur ini terdapat kain-kain tenun dari hasil karya komunitas kolok, disini kamu bisa melihat berbagai macam kain tenun dan juga membaca detail dari kain tersebut dan kalau kamu mau beli juga sangat bisa, kamu tinggal klik tombol beli nanti akan di alihkan ke nomor WA yang mengelola kain tenun tersebut 😆",
    trigger: "fitur-options",
  },
  {
    id: "playlist",
    message:
      "Di fitur ini kamu bisa melihat playlist dari video-video YouTube yang berkaitan dengan Desa Bengkala, kalau kamu masih asing dengan Bengkala dan penasaran mengenai Desa Bengkala kamu bisa tonton saja video disini 😁",
    trigger: "fitur-options",
  },
  {
    id: "kembali",
    message: "Apa ada lagi yang ingin kamu tau hari ini?",
    trigger: "options",
  },
];
