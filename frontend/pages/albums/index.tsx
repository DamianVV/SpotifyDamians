import TrackList from "@/components/TrackList";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import MainLayout from "@/layouts/MainLayout";
import { NextThunkDispatch, wrapper } from "@/store";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAlbums } from "../../store/actions-creators/album";
import { IAlbum } from "../../types/album";
import AlbumList from "../../components/AlbumList";


const AlbumPage = () => {
    const router = useRouter()
    const { albums, error } = useTypedSelector(state => state.album)
    const [query, setQuery] = useState<string>()
    const [albumList, setAlbumList] = useState<Array<IAlbum>>(albums)
    const [queryAlbumList, setQueryAlbumList] = useState<Array<IAlbum>>(albumList)

    const dispatch = useDispatch() as NextThunkDispatch
    if (error) {
        return <MainLayout>
            <h1>error</h1>
        </MainLayout>
    }

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase()
        if (query.length === 0) {
            setQueryAlbumList([...albumList])
        }

        setQueryAlbumList((albumList) => albumList.filter((el) => el.name.toLowerCase().includes(query)))
    }

    useEffect(() => {
        setAlbumList([...albums])
    }, [albums])


    return (

        <MainLayout>
            <Grid container justifyContent='center'>
                <Card style={{ width: '900px' }}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Albums</h1>
                            <Button variant="outlined" onClick={() => router.push('/albums/create')}>Create</Button>
                        </Grid>
                    </Box>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={search}
                        style={{ padding: '0 24px' }}
                        placeholder="Поиск альбомов..."

                    />
                    <AlbumList albums={queryAlbumList} deleteAlbumFromList={() => { }} />
                    {/* <TrackList tracks={trackList} deleteTrackFromList={deleteTrackFromList} /> */}
                </Card>
            </Grid>
        </MainLayout>

    )
}
export default AlbumPage;
export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    // @ts-ignore
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchAlbums())
    return {
        props: {

        }
    }
})