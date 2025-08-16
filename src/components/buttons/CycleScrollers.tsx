import type { CycleScroller } from "../../vite-env"
import '../../App.css'

export default function CycleScrollers({ setIndex, scrollers, index }: CycleScroller) {

    const handleClick = (): void => {

        setIndex((prev: number) => {
            return ((prev + 1) % scrollers.length);
        });
    };

    return (
        <button
            className="cycle"
            onClick={handleClick}
            aria-label="cycle-scroller button"
            type="button">
            Show {`${scrollers[((index + 1) % scrollers.length)]}`} scroller
        </button>
    );
};