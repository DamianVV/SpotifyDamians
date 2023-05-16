interface ITrackProgress {
    left: number
    right: number
    onChange: (e: any) => void
}
const {log} = console
log(123)

const TrackProgress: React.FC<ITrackProgress> = ({ left, right, onChange }) => {
    return (
        <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
                step={1}

            />
            <div>{`${left} / ${right}`}</div>
        </div>
    )
}
export default TrackProgress