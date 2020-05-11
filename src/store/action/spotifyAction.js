import axios from "axios";

export const GET_TRACKS = "GET_TRACKS";
export const GET_PLAYLIST = "GET_PLAYLIST";

export const getTrackList = (data) => (dispatch) => {
  // const user_id = "2nzcqatham7u8yrnpfmc7lpyu";
  // const playlist_id = "6A9tw4I9JeYj0ID9RioxrQ";
  // const url =
  //   " https://api.spotify.com/v1/users/2nzcqatham7u8yrnpfmc7lpyu/playlists/6A9tw4I9JeYj0ID9RioxrQ/tracks ";
  // axios
  //   .get(url, {
  //     headers: { Authorization: "Bearer " + data },
  //   })
  //   .then((res) => {
  //     console.log(res.status);
  //     if (res.status === 200) {
  //       return dispatch({
  //         type: GET_TRACKS,
  //         payload: res.data,
  //       });
  //     }
  //   });
};

export const getPlayListDetails = (data) => (dispatch) => {
  const id = "2nzcqatham7u8yrnpfmc7lpyu";
  /** to fetch playlist details,like playlist id */
  const url = `https://api.spotify.com/v1/users/${id}/playlists`;

  axios
    .get(url, { headers: { Authorization: "Bearer " + data } })
    .then((_res) => {
      if (_res.status === 200) {
        if (_res.data.items) {
          const response = _res.data.items;
          const obj = response.map((x) => ({
            user_id: x.owner.id,
            playlist_id: x.id,
          }));
          const user_id = obj[0].user_id;
          const playlist_id = obj[0].playlist_id;
          /** fetch playlist of the user */
          const url = ` https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks `;

          axios
            .get(url, {
              headers: { Authorization: "Bearer " + data },
            })
            .then((res) => {
              if (res.status === 200) {
                return dispatch({
                  type: GET_TRACKS,
                  payload: res.data,
                });
              }
            });
        }
        return dispatch({
          type: GET_PLAYLIST,
          payload: _res.data.items,
        });
      }
    });
};
