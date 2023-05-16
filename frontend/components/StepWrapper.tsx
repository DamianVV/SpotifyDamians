import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material"

interface StepWrapperProps {
    activeStep: number
    children: JSX.Element
}
const steps = ['Track info', 'Upload avatar', 'Upload track']
const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, idx) =>
                    <Step key={idx} completed={activeStep > idx}>
                        <StepLabel>
                            {step}
                        </StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent={'center'} style={{ margin: '70px 0', height: 270 }}>
                <Card style={{ width: 600 }}>
                    {children}
                </Card>
            </Grid>
        </Container >
    )

}
export default StepWrapper