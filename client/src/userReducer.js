import { LOGGED_IN } from './actions'

export default function users(state = [], action = {}) {
  switch(action.type) {

    case LOGGED_IN:
      return [
        ...state,
        action.user
      ];
    
    default: return state;
  }
}
