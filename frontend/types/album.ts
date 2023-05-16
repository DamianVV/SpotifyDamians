import { ITrack } from "./track"

export interface IAlbum {
    id: number
    name: string
    picture: string
    tracks: Array<ITrack>
}

export interface IAlbumState {
    albums: Array<IAlbum>
    error: string
}
export enum AlbumActionTypes {
    FETCH_ALBUMS = 'FETCH_ALBUMS',
    FETCH_ALBUMS_ERROR = 'FETCH_ALBUMS_ERROR',
}
interface FetchAlbumsAction {
    type: AlbumActionTypes.FETCH_ALBUMS,
    payload: Array<IAlbum>
}
interface FetchAlbumsErrorAction {
    type: AlbumActionTypes.FETCH_ALBUMS_ERROR,
    payload: string
}

export type AlbumAction = FetchAlbumsAction | FetchAlbumsErrorAction