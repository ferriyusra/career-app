const rules = {
  first_name: {
    required: {
      value: true,
      message: "Nama depan harus diisi.",
    },
    maxLength: {
      value: 100,
      message: "Panjang nama depan maksimal 100 karakter.",
    },
  },
  last_name: {
    required: {
      value: true,
      message: "Nama belakang harus diisi.",
    },
    maxLength: {
      value: 100,
      message: "Panjang nama belakang maksimal 100 karakter.",
    },
  },

  email: {
    required: {
      value: true,
      message: "Email harus diisi.",
    },
    maxLength: {
      value: 255,
      message: "Panjang email maksimal 255 karakter.",
    },
    // cek pola / pattern email
    pattern: {
      value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/,
      message: "Email tidak valid",
    },
  },

  password: {
    required: {
      value: true,
      message: "Kata sandi harus diisi.",
    },
    maxLength: {
      value: 16,
      message: "Panjang kata sandi maksimal 16 karakter.",
    },
  },

  password_confirmation: {
    required: {
      value: true,
      message: "Konfirmasi kata sandi harus diisi.",
    },
  },

  // user_image_url: {
  //   required: { value: true, message: "image tidak boleh kosong." },
  // },
};

export { rules };
