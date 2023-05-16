import { useRouter } from "next/router"

const HomePage = () => {
    const router = useRouter()

    return (
        <div className="container">
            <section className="info1">
                <div className="section">
                    <h1>Get Daminan-Fy free for 1 month</h1>
                    <h2>Just ₹119/month after. Friendship with Damian. Cancel anytime.</h2>
                    <div className="btn-1" onClick={() => { router.push('/tracks') }}>GET STARTED</div>
                    <p><u>Terms and conditions apply</u>. 1 month free not available for users who have already friendship with Damian.</p>
                </div>
            </section>
            <section className="info2">
                <h1>The power of Premium</h1>
                <div className="pluses">
                    <div className="plus1">
                        <img src="https://i.scdn.co/image/ab671c3d0000f4300e79e20edd40577fabe5e126" alt="" />
                        <h3>Ad-free music listening</h3>
                        <span>Enjoy uninterrupted music.</span>
                    </div>
                    <div className="plus1">
                        <img src="https://i.scdn.co/image/ab671c3d0000f430dc1baa0957b0520c556c86b7" alt="" />
                        <h3>Offline playback</h3>
                        <span>Save your data by listening offline.</span>
                    </div>
                    <div className="plus1">
                        <img src="https://i.scdn.co/image/ab671c3d0000f430d6fee826d3ece1216e4f5772" alt="" />
                        <h3>Play everywhere</h3>
                        <span>Listen on your speakers, TV, and other favorite devices.</span>
                    </div>
                    <div className="plus1">
                        <img src="https://i.scdn.co/image/ab671c3d0000f4309977c2dc20e8cd1aaf755ba2" alt="" />
                        <h3>Pay your way</h3>
                        <span>Prepay with Paytm, UPI, and more.</span>
                    </div>

                </div>
            </section>


        </div>
    )
}
export default HomePage