import * as Actions from "../action/spotifyAction";
const initialState = {
  trackList: "",
  playList: "",
};
export const SpotifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_TRACKS:
      return {
        ...state,
        trackList: action.payload,
      };
    case Actions.GET_PLAYLIST:
      return {
        ...state,
        playList: action.payload,
      };
    default:
      return state;
  }
};
