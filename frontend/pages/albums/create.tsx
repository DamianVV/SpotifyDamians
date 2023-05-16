import FileUpload from "@/components/FileUpload";
import StepWrapper from "@/components/StepWrapper";
import { useInput } from "@/hooks/useInput";
import MainLayout from "@/layouts/MainLayout";
import { Button, Card, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const Create = () => {
    const router = useRouter()
    const [picture, setPicture] = useState(null)

    const name = useInput('')

    const send = () => {
        const formData = new FormData()
        formData.append('name', name.value)
        formData.append('picture', picture!)
        axios.post('http://localhost:5000/api/albums', formData)
            .then(resp => router.push('/albums'))
            .catch(e => console.log(e))
    }

    return (
        <MainLayout>
            <>
                <Grid container justifyContent='center'>
                    <Card style={{ width: 600, paddingBottom: '1rem' }}>
                        <Grid container direction={"column"} style={{ padding: 20 }}>
                            <TextField
                                {...name}
                                style={{ margin: '10px 0' }}
                                label={"Название альбома"}
                            />
                            <FileUpload setFile={setPicture} accept="image/*">
                                <Button variant="outlined">Upload avatar</Button>
                            </FileUpload>
                        </Grid>

                        <Grid container justifyContent={'center'}>
                            <Button variant="outlined" onClick={send}>Create</Button>
                        </Grid>
                    </Card>

                </Grid>

            </>
        </MainLayout>
    )
}
export default Create;