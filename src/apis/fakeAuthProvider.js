export function isUserActive() {
  const token = localStorage.getItem('token');
  return token ? true : false;
}

export function fakeSignin(username, password) {
  if (username === 'test@test.com' && password === '123456789') {
    localStorage.setItem(
      'token',
      '1qupGvL7YgOt56kRPC7fOWegP87edjpS2idBr65Ve7lzKFsDYeHeqpC6gCh4s6mR'
    );

    return true;
  }

  return false;
}

export function fakeSignout() {
  localStorage.removeItem('token');
}
