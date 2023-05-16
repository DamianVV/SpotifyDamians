import { ITrack, TrackActionTypes } from "@/types/track"
import { Card, Grid, IconButton } from "@mui/material"
import { useRouter } from "next/router"
import styles from '../styles/TrackItem.module.scss'
import Pause from "@mui/icons-material/Pause"
import Add from "@mui/icons-material/Add"
import PlayArrow from "@mui/icons-material/PlayArrow"
import Delete from "@mui/icons-material/Delete"
import { useActions } from "@/hooks/useAction"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import axios from "axios"
interface ITrackItemProps {
    track: ITrack
    active?: boolean
    deleteTrackFromList: (id: number) => void,
    type?: number,
    addTrackToAlbum?: (trackId: number) => void
}
const TrackItem: React.FC<ITrackItemProps> = ({ track, deleteTrackFromList, type, addTrackToAlbum }) => {
    const router = useRouter()
    const { playTrack, pauseTrack, setActiveTrack } = useActions()
    const { pause, active, currentTime, duration } = useTypedSelector(state => state.player)

    const currentlyIsPlaying = active?.id === track.id && !pause
    const deleteTrack = async () => {
        try {
            const resp = await axios.delete(`http://localhost:5000/api/tracks/${track.id}`)
            deleteTrackFromList(track.id)
        } catch (e) {
            console.log(e)
        }
    }
    const handleMusic = (e: any) => {
        if (active?.id === track.id && !pause) pauseTrack()
        else if (active?.id === track.id && pause) playTrack()
        else if (active?.id !== track.id) {
            setActiveTrack(track)
        }
    }

    return (
        <Card className={styles.track}>
            {type !== 3 && <IconButton onClick={handleMusic}>
                {currentlyIsPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>}


            <img width={70} height={70} src={`http://localhost:5000/${track.picture}`} />
            <Grid container direction="column" style={{ width: 200, margin: '0 20px', cursor: 'pointer' }} onClick={() => router.push('/tracks/' + track.id)} >
                <div>{track.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
            </Grid>
            {active?.id === track.id && <div>{currentTime} / {duration}</div>}

            {type !== 3 && <IconButton onClick={deleteTrack} style={{ marginLeft: 'auto' }}>
                <Delete />
            </IconButton>}
            {/* @ts-ignore */}
            {type === 3 && <IconButton onClick={() => addTrackToAlbum(track.id)} style={{ marginLeft: 'auto' }}>
                <Add />
            </IconButton>}

        </Card >
    )
}
export default TrackItem