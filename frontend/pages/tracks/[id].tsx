import { useInput } from "@/hooks/useInput"
import MainLayout from "@/layouts/MainLayout"
import { ITrack } from "@/types/track"
import { Button, Grid, TextField } from "@mui/material"
import axios from "axios"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useState } from "react"

const trackPage = ({ serverTrack }: any) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')
    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/tracks/comment', {
                userName: username.value,
                text: text.value,
                trackId: track.id
            })
            setTrack({ ...track, comments: [...track.comments, response.data] })
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <MainLayout>
                <>
                    <Button variant="outlined" style={{ fontSize: 32 }} onClick={() => router.push('/tracks')}>
                            To the list
                    </Button>
                    <Grid container style={{ margin: '20px 0' }}>
                        <img src={`http://localhost:5000/${track.picture}`} width={200} height={200} />
                        <div style={{ marginLeft: 30 }}>
                            <h1>{track.name}</h1>
                            <h1>{track.artist}</h1>
                        
                        </div>
                    </Grid>
                    <h1>Track words</h1>
                    <p>{track.text}</p>

                    <Grid container>
                        <TextField label="Ваше имя" fullWidth {...username} />
                        <TextField label="Комментарий" fullWidth multiline rows={4} {...text} />
                        <Button onClick={addComment} variant="outlined">Send</Button>
                    </Grid>
                    <div>
                        {/* @ts-ignore */}
                        {track.comments.map(comment =>
                            <div>
                                <div>{comment.userName}</div>
                                <div>{comment.text}</div>
                            </div>
                        )}
                    </div>
                </>
            </MainLayout>
        </>
    )
}
export default trackPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get(`http://localhost:5000/api/tracks/${params!.id}`)
    return {
        props: {
            serverTrack: response.data
        }
    }
}