import TrackList from "@/components/TrackList";
import MainLayout from "@/layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "@/store";
import { ITrack } from "@/types/track";
import { Box, Button, Card, Grid } from "@mui/material";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


const AlbumMainPage = ({ serverAlbumTracks }: any) => {
    const router = useRouter()
    const [trackList, setTrackList] = useState<Array<ITrack>>([])
    const [tracksToAddList, setTracksToAddList] = useState<Array<ITrack>>([])
    const [addTrack, setAddTrack] = useState<boolean>(false)
    const dispatch = useDispatch() as NextThunkDispatch


    const handleAdd = async () => {

        const response = await axios.get('http://localhost:5000/api/tracks')
            .then((res) => {
                setTracksToAddList(res.data.filter((el: any) => el.albumId !== serverAlbumTracks.id))
                setAddTrack(true)
            })
    }
    const handleAddBack = async () => {
        const response = await axios.get('http://localhost:5000/api/tracks')
            .then((res) => {
                setTrackList(res.data)
                setAddTrack(false)
            })
    }
    const addTrackToAlbum = async (trackId: number) => {
        return axios.post('http://localhost:5000/api/albums/tracks', {
            trackId: trackId,
            albumId: serverAlbumTracks.id
        }).then(res => {
            setTracksToAddList((prev) => prev.filter((el) => el.id !== trackId))
        })
    }

    useEffect(() => {
        console.log(serverAlbumTracks.tracks)
        setTrackList([...serverAlbumTracks.tracks])
    }, [serverAlbumTracks])


    return (

        <MainLayout>
            <Grid container justifyContent='center'>
                <Card style={{ width: '900px' }}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            {addTrack ? <h1>Add track to album {serverAlbumTracks.name}</h1>
                                : <h1>List of tracks in album {serverAlbumTracks.name}</h1>}
                            {!addTrack ? <Button variant="contained" onClick={handleAdd}>Add song</Button> :
                                <Button variant="text" onClick={handleAddBack}>Back</Button>}

                        </Grid>
                    </Box>
                    {!addTrack ? <TrackList tracks={trackList} deleteTrackFromList={() => { }} /> :
                        // <TrackList tracks={tracksToAddList} deleteTrackFromList={() => { }} />
                        <TrackList tracks={tracksToAddList} deleteTrackFromList={() => { }} type={3} addTrackToAlbum={addTrackToAlbum} />

                    }

                </Card>
            </Grid>
        </MainLayout>

    )
}
export default AlbumMainPage;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get(`http://localhost:5000/api/albums/${params!.id}`)
    return {
        props: {
            serverAlbumTracks: response.data
        }
    }
}