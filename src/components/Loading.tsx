import '../App.css';
interface Loader {
    context: boolean
}

export default function Loader({ context }: Loader) {
    const spinner = (<div className='loader'></div>);

    return !context ? spinner : null
};