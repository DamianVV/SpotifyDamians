import TrackList from "@/components/TrackList";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayout from "@/layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "@/store";
import { fetchTracks, searchTracks } from "@/store/actions-creators/track";
import { ITrack, TrackActionTypes } from "@/types/track";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


const TrackMainPage = () => {
    const router = useRouter()
    const { tracks, error } = useTypedSelector(state => state.track)
    const [query, setQuery] = useState<string>()
    const [trackList, setTrackList] = useState<Array<ITrack>>(tracks)
    const dispatch = useDispatch() as NextThunkDispatch

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        await dispatch(await searchTracks(e.target.value))
    }
    if (error) {
        return <MainLayout>
            <h1>error</h1>
        </MainLayout>
    }
    const deleteTrackFromList = (id: number) => {
        setTrackList((prev) => prev.filter((track) => track.id !== id))
    }
    useEffect(() => {
        setTrackList([...tracks])
    }, [tracks])


    return (

        <MainLayout>
            <Grid container justifyContent='center'>
                <Card style={{ width: '900px' }}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Track's list</h1>
                            <Button variant="outlined" onClick={() => router.push('/tracks/create')}>Upload</Button>
                        </Grid>
                    </Box>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={search}
                        style={{ padding: '0 24px' }}
                        placeholder="Search music..."

                    />
                    <TrackList tracks={trackList} deleteTrackFromList={deleteTrackFromList} />
                </Card>
            </Grid>
        </MainLayout>

    )
}
export default TrackMainPage;
export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    // @ts-ignore
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks())
    return {
        props: {

        }
    }
})