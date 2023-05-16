import { ITrack } from "@/types/track"
import { Box, Grid } from "@mui/material"
import TrackItem from "./TrackItem"
import { useTypedSelector } from "@/hooks/useTypedSelector"

interface ITrackListProps {
    tracks: ITrack[],
    deleteTrackFromList: (id: number) => void,
    type?: number,
    addTrackToAlbum?: (trackId: number) => void
}

const TrackList: React.FC<ITrackListProps> = ({ tracks, deleteTrackFromList, type, addTrackToAlbum }) => {
    return (
        <Grid container direction="column">
            <Box p={2}>
                {tracks.length > 0 ? (tracks.map(track => <TrackItem key={track.id} track={track} type={type} deleteTrackFromList={deleteTrackFromList} addTrackToAlbum={addTrackToAlbum} />)) : (
                    <p style={{ textAlign: 'center' }}>No songs...</p>
                )}

            </Box>
        </Grid>
    )
}
export default TrackList