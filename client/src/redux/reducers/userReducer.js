const initialState = {
  isLogged: false,
  isAdmin: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'NO_ACCESS':
      return {
        loginErrorMessage: 'Incorrect username or password!'
      };
    case 'UNAUTHORIZED':
      return {
        unauthorized: true
      };
    case 'USERNAME_EXISTS':
      return {
        usernameErrorMessage: 'Username already exists. Please try again'
      };
    case 'LOGIN':
      return {
        ...state,
        unauthorized: false,
        isLogged: true,
        username: action.payload.username,
        user_id: action.payload.user_id,
        token: action.payload.accessToken
      };
    case 'ADMIN':
      return {
        ...state,
        unauthorized: false,
        isLogged: true,
        isAdmin: true,
        username: action.payload.username,
        user_id: action.payload.user_id,
        token: action.payload.accessToken
      };

    default:
      return state;
  }
}
