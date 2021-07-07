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

export const routesConfig = {
  mainPageUrl: '/',
  moviesUrl: '/movies',
  savedMoviesUrl: '/saved-movies',
  profileUrl: '/profile',
  signUpUrl: '/signup',
  singInUrl: '/signin'
};
 
export const SCREEN_RESOLUTION_BREAKPOINT_769 = 769;
export const SCREEN_RESOLUTION_BREAKPOINT_400 = 400;

export const REQUIRED_ERR_MESSAGE = 'Поле не заполнено';
export const MIN_LENGTH_ERR_MESSAGE = 'Минимальное количество символов: 2';
export const MAX_LENGTH_ERR_MESSAGE = 'Максимальное количество символов: 30';
export const EMAIL_UNVALID_ERR_MESSAGE = 'Введите, пожалуйста, email';
export const NAME_UNVALID_ERR_MESSAGE = 'Имя может содержать латинские и русские буквы, пробел или дефис';
export const KEYWORD_REQUIRED_ERR_MESSAGE = 'Нужно ввести ключевое слово';
export const NOTHING_IS_FINDED = 'Ничего не найдено';
export const BAD_REQUEST_ERR_MESSAGE= 'Некорректно заполнено одно из полей';
export const EMAIL_CONFLICT_ERR_MESSAGE= 'Пользователь с таким емейлом уже зарегистрирован';
export const UNAUTHORIZED_ERR_MESSAGE= 'Вы ввели неправильный логин или пароль';
export const CONNECTION_ERR_MESSAGE= 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

export const USER_INFO_UPDATE_SUCCEED = 'Профиль обновлен!';
export const REGISTER_SUCCEED_MESSAGE = 'Вы успешно зарегистрировались!';
export const LOGIN_SUCCEED_MESSAGE = 'Успешно!';
