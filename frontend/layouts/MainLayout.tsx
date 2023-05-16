import Navbar from "@/components/Navbar"
import Player from "@/components/Player"
import { Container } from "@mui/material"
import Head from "next/head"

const MainLayout: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Music</title>
                <meta name="111" />
            </Head>

            <Navbar />
            <Container style={{ margin: '90px 0', maxWidth: '100%' }}>
                {children}
            </Container>
            <Player />
        </>
    )
}
export default MainLayout