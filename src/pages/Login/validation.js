const rules = {
  email: {
    pattern: {
      value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/, message:
        'Email tidak valid'
    },
    required: {
      value: true,
      message: "Email tidak boleh kosong.",
    },
    maxLength: {
      value: 30,
      message: "Panjang email maksimal 30 karakter",
    },
  },
  password: {
    required: {
      value: true,
      message: "Kata sandi tidak boleh kosong.",
    },
    maxLength: {
      value: 16,
      message: "Panjang Kata sandi maksimal 16 karakter.",
    },
  },
};

export { rules };
