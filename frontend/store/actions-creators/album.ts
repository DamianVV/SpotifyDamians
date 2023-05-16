import axios from "axios"
import { Dispatch } from "react"
import { AlbumAction, AlbumActionTypes } from "../../types/album"

export const fetchAlbums = async () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/albums`)
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS,
                payload: response.data
            })
        }
        catch (e) {
            dispatch({
                type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
                payload: 'Произошла ошибка при скачке треков!'
            })
        }
    }
}

// export const searchTracks = async (query: string) => {
//     return async (dispatch: Dispatch<TrackAction>) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/tracks/search?query=${query}`)
//             dispatch({
//                 type: TrackActionTypes.FETCH_TRACKS,
//                 payload: response.data
//             })
//         }
//         catch (e) {
//             dispatch({
//                 type: TrackActionTypes.FETCH_TRACKS_ERROR,
//                 payload: 'Произошла ошибка при скачке треков!'
//             })
//         }
//     }
// }