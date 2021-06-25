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
    validate: (value) => {
      return /[^a-zа-яё\-\s]/giu.test(value);
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
export const isValidNameErrMessage = 'Имя может содержит латинские и русские буквы, пробел или дефис';
export const isSearchWordNeededErrMessage = 'Нужно ввести ключевое слово';
export const NOTHING_IS_FINDED = 'Ничего не найдено';

export const routesConfig = {
  mainPageUrl: '/',
  moviesUrl: '/movies',
  savedMoviesUrl: '/saved-movies',
  profileUrl: '/profile',
  signUpUrl: '/signup',
  singInUrl: '/signin'
};
