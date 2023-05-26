const rules = {
  firstName: {
    required: {
      value: true,
      message: "Nama depan tidak boleh kosong.",
    },
  },
  lastName: {
    required: {
      value: true,
      message: "Nama belakang tidak boleh kosong.",
    },
  },
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
  phoneNumber: {
    required: {
      value: true,
      message: "Nomor Telfon tidak boleh kosong.",
    },
    minLenght: {
      value: 10,
      message: "Panjang Nomor Telfon maksimal 10 karakter.",
    },
    maxLength: {
      value: 14,
      message: "Panjang Nomor Telfon maksimal 14 karakter.",
    },
  },
  resume: {
    required: { value: true, message: 'cv tidak boleh kosong.' }
  }
};

export { rules };
