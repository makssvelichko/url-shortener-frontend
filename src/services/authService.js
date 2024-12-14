import api from '../api.js';

const predefinedUsers = [
  { username: 'user_1', password: '12345678', fullName: 'User One' },
  { username: 'user_2', password: '12345678', fullName: 'User Two' },
  { username: 'user_3', password: '12345678', fullName: 'User Three' },
];

export const initializeUsers = async () => {
  for (const user of predefinedUsers) {
    try {
      await api.post('/register', user);
    } catch (err) {
      console.error(`Користувач ${user.username} вже існує`);
    }
  }
};

export const handleRegister = async (username, password, fullName, setError, navigate) => {
  try {
    const response = await api.post('/register', {
      username,
      password,
      full_name: fullName,
    });
    console.log('Реєстрація пройшла успішно', response.data);
    navigate('/');
  } catch (err) {
    setError('Цей логін вже зайнятий');
  }
};

export const loginUser = async (username, password, setError, navigate) => {
  try {
    const response = await api.post('/login', new URLSearchParams({
      username,
      password,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    localStorage.setItem('token', response.data.access_token);
    console.log('Авторизація пройшла успішно');
    navigate('/');
    return response.data;
  } catch (err) {
    setError('Невірний логін або пароль');
  }
};
