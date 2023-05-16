import { ITrack } from "@/types/track"
import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, ListItem, Typography } from "@mui/material"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { IAlbum } from "../types/album"
import { useRouter } from "next/router"

interface IAlbumListProps {
    albums: IAlbum[],
    deleteAlbumFromList: (id: number) => void
}
interface IAlbumCardProps {
    album: IAlbum,
    deleteAlbumFromList: (id: number) => void
}
const AlbumCard: React.FC<IAlbumCardProps> = ({ album, deleteAlbumFromList }) => {
    const router = useRouter()
    return (
        <Card sx={{ maxWidth: 345 }} onClick={() => { router.push(`/albums/${album.id}`) }} style={{ cursor: 'pointer' }}>
            <CardMedia
                component="img"
                height="194"
                image={'http://localhost:5000/' + album.picture}
                alt={'1'}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {album.name}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    {/* <FavoriteIcon /> */}
                </IconButton>
                <IconButton aria-label="share">
                    {/* <ShareIcon /> */}
                </IconButton>
            </CardActions>
        </Card>
    )

}
const AlbumList: React.FC<IAlbumListProps> = ({ albums, deleteAlbumFromList }) => {
    if (albums.length === 0) return (
        <div>No albums...</div>
    )
    return (
        <Grid container spacing={4} p={3}>
            {albums.map(album =>
                <Grid item xs={3}>
                    <AlbumCard key={album.id} album={album} deleteAlbumFromList={deleteAlbumFromList} />
                </Grid>)
            }



        </Grid>
    )
}
export default AlbumList