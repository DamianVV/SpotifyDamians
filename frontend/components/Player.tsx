import Pause from "@mui/icons-material/Pause"
import PlayArrow from "@mui/icons-material/PlayArrow"
import IconButton from "@mui/material/IconButton"
import styles from '../styles/Player.module.scss'
import Grid from "@mui/material/Grid"
import TrackProgress from "./TrackProgress"
import VolumeUp from "@mui/icons-material/VolumeUp"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useActions } from "@/hooks/useAction"
import { useEffect } from "react"
let audio: HTMLAudioElement;
const Player = () => {

    const { playTrack, pauseTrack, setVolume, setCurrentTime, setDuration } = useActions()
    const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)

    useEffect(() => {
        if (!audio) { audio = new Audio() }
        if (active) {
            setAudio()
        }
    }, [active])

    useEffect(() => {
        if (pause) audio.pause()
        else audio.play()
    }, [pause])

    const setAudio = () => {
        audio.src = `http://localhost:5000/${active?.audio}`
        audio.volume = volume / 100
        audio.onloadedmetadata = () => {
            setDuration(Math.ceil(audio.duration))
        }
        audio.ontimeupdate = () => {
            setCurrentTime(Math.ceil(audio.currentTime))
        }
        playTrack()
        audio.play()
    }
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    const handleMusic = () => {
        if (pause) playTrack()
        else pauseTrack()
    }


    if (!active) {
        return null
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={handleMusic}>
                {!pause ? <Pause /> : <PlayArrow />}
            </IconButton>

            <Grid container direction="column" style={{ width: 200, margin: '0 20px', cursor: 'pointer' }}>
                <div>{active?.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
            <VolumeUp style={{ marginLeft: 'auto' }} />
            <TrackProgress left={volume} right={100} onChange={changeVolume} />
        </div>
    )
}
export default Player