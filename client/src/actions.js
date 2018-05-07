export const LOGGED_IN = 'LOGGED_IN';

export function login(data) {
  return dispatch => {
    return fetch('/users/login', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(user => dispatch(loggedIn(user)));
  }
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function loggedIn(user) {
  return {
    type: LOGGED_IN,
    user
  }
}

