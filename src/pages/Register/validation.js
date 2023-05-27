const rules = {
  name: {
    required: {
      value: true,
      message: "Nama perusahaan harus diisi.",
    },
    maxLength: {
      value: 100,
      message: "Panjang Nama perusahaan maksimal 100 karakter.",
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

  passwordConfirmation: {
    required: {
      value: true,
      message: "Konfirmasi kata sandi harus diisi.",
    },
  },

  image: {
    required: {
      value: true,
      message: "Image tidak boleh kosong."
    },
  },

  location: {
    required: {
      value: true,
      message: "Lokasi perusahaan tidak boleh kosong."
    },
  },

  companyDescription: {
    required: {
      value: true,
      message: "Deskripsi perusahaan tidak boleh kosong."
    },
    maxLength: {
      value: 100,
      message: "Panjang Deskripsi perusahaan maksimal 100 karakter.",
    },
  },
};

export { rules };
