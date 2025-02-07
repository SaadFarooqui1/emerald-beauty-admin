import { SpinnerProps } from '@/types/types'

const Spinner: React.FC<SpinnerProps> = (props) => (
    <div
        className={`spinner-border ${props.class}`}
        style={{ verticalAlign: 'middle' }}
    />
)
export default Spinner
