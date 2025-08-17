import type { CycleButton } from "../../vite-env"
import '../../App.css'

export default function TriggerCycle({ setIndex, scrollers, index }: CycleButton) {

    const handleClick = (): void => {

        setIndex((prev: number) => {
            return ((prev + 1) % scrollers.length);
        });
    };

    return (
        <div style={{ width: '100%', height: 'fit', paddingTop: '20px', margin: 'auto' }}>
            <button
                className="cycle"
                onClick={handleClick}
                aria-label="cycle-scroller button"
                type="button">
                Show {`${scrollers[((index + 1) % scrollers.length)]}`} scroller
            </button>

        </div>
    );
};