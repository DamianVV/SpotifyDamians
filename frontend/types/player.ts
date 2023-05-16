import { ITrack } from "./track";

export interface IPlayerState {
    active: null | ITrack
    volume: number
    duration: number
    currentTime: number
    pause: boolean
}
export enum PlayerActionTypes {
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
    SET_ACTIVE = 'SET_ACTIVE',
    SET_DURATION = 'SET_DURATION',
    SET_CURRENT_TIME = 'SET_CURRENT_TIME',
    SET_VOLUME = 'SET_VOLUME'
}
interface IPlayAction {
    type: PlayerActionTypes.PLAY
}
interface IPauseAction {
    type: PlayerActionTypes.PAUSE
}
interface ISetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE
    payload: ITrack
}
interface ISetDurationAction {
    type: PlayerActionTypes.SET_DURATION
    payload: number
}
interface ISetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME
    payload: number
}
interface ISetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME
    payload: number
}

export type IPlayerAction = IPlayAction | IPauseAction | ISetActiveAction | ISetDurationAction | ISetCurrentTimeAction | ISetVolumeAction
