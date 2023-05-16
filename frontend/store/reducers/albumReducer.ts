import { AlbumAction, AlbumActionTypes, IAlbumState } from "../../types/album"

const initialState: IAlbumState = {
    albums: [],
    error: ''
}

export const albumReducer = (state: IAlbumState = initialState, action: AlbumAction): IAlbumState => {
    switch (action.type) {

        case AlbumActionTypes.FETCH_ALBUMS_ERROR:
            return { ...state, error: action.payload }
        case AlbumActionTypes.FETCH_ALBUMS:
            return { error: '', albums: action.payload }

        default:
            return state
    }
}