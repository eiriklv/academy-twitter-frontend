const API_URL = 'http://localhost:3333';

export async function createSession({ handle, password }) {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return fetch(`${API_URL}/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ handle, password }),
  })
  .then((res) => res.json());
}

export function checkSession() {
  return fetch(`${API_URL}/session`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem('twitter_clone_token')
    }
  })
  .then((res) => res.status === 200);
}
