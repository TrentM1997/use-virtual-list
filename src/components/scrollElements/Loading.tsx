import '../../App.css';
import type { Loader } from '../../vite-env';

export default function Loader({ context }: Loader) {
    const spinner = (
        <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className='loader'></div>
        </div>

    );

    return !context ? spinner : null
};