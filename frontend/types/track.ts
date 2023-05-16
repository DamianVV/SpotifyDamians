
export interface IComment {
    id: number
    userName: string
    text: string
}
export interface ITrack {
    id: number
    name: string
    artist: string
    text: string
    listen_count: number
    picture: string
    audio: string
    comments: IComment[]
}

export interface ITrackState {
    tracks: Array<ITrack>
    error: string
}
export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRECKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}
interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS,
    payload: Array<ITrack>
}
interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR,
    payload: string

}

export type TrackAction = FetchTracksAction | FetchTracksErrorAction