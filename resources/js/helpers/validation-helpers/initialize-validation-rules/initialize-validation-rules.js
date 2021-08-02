import { extend } from 'vee-validate';
import {
  required,
  email,
  numeric,
  max,
  confirmed,
} from 'vee-validate/dist/rules';

const rules = {
  required: {
    ...required,
    message: 'Bagian ini wajib diisi.',
  },

  numeric: {
    ...numeric,
    message: 'Bagian ini hanya bisa diisi angka.',
  },

  email: {
    ...email,
    message: 'Pastikan format email sudah benar.',
  },

  max: {
    ...max,
    message: 'Hanya bisa diisi maksimal {length} karakter.',
  },

  confirmed: {
    ...confirmed,
    message: 'Konfirmasi tidak sesuai.',
  },
};

export default function initializeValidationRules() {
  Object.keys(rules).forEach(ruleName => {
    extend(ruleName, rules[ruleName]);
  });
}
