import validator from 'validator';

export const validators = {
  name: {
    required: (value) => {
      return value === '';
    },
    minlength: (value) => {
      return value.length < 2;
    },
    maxlength: (value) => {
      return value.length > 30;
    },
  },
  email: {
    required: (value) => {
      return value === '';
    },
    isEmail: (value) => {
      return !validator.isEmail(value);
    },
  },
  password: {
    required: (value) => {
      return value === '';
    },
    minlength: (value) => {
      return value.length < 2;
    },
  },
};

export const requiredErrMessage = 'Поле не заполнено';
export const minLengthErrMessage = 'Минимальное количество символов: 2';
export const maxLengthErrMessage = 'Максимальное количество символов: 30';
export const isEmailErrMessage = 'Введите, пожалуйста, email';
