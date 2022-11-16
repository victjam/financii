import { combineReducers } from '@reduxjs/toolkit';
import * as actions from './actions';

const preferences = (state = { darkThemeEnabled: false }, action: any) => {
  switch (action.type) {
    case actions.TOGGLE_DARKTHEME:
      return { ...state, darkThemeEnabled: !state.darkThemeEnabled };

    default:
      return state;
  }
};

export default combineReducers({ preferences });
