import { IPlayerAction, PlayerActionTypes } from "@/types/player";
import { ITrack } from "@/types/track";

export const playTrack = (): IPlayerAction => {
    return { type: PlayerActionTypes.PLAY }
}
export const pauseTrack = (): IPlayerAction => {
    return { type: PlayerActionTypes.PAUSE }
}
export const setDuration = (payload: number): IPlayerAction => {
    return {
        type: PlayerActionTypes.SET_DURATION,
        payload
    }
}
export const setVolume = (payload: number): IPlayerAction => {
    return {
        type: PlayerActionTypes.SET_VOLUME,
        payload
    }
}
export const setCurrentTime = (payload: number): IPlayerAction => {
    return {
        type: PlayerActionTypes.SET_CURRENT_TIME,
        payload
    }
}
export const setActiveTrack = (payload: ITrack): IPlayerAction => {
    return {
        type: PlayerActionTypes.SET_ACTIVE,
        payload
    }
}