import VirtuosoScroll from "../scrollers/VirtuosoScroll";
import SimpleScroll from "../scrollers/SimpleScroller";
import type { CycleScrollers } from "../../vite-env";
import IntersectionScroller from "../scrollers/IntersectionScroller";

export default function Cycle({ index }: CycleScrollers) {

    return (
        <div
            style={{ height: '500px', width: '400px', border: '1px', borderStyle: 'solid', margin: 'auto' }}
        >
            {index === 0 && <VirtuosoScroll />}

            {index === 1 && <SimpleScroll />}

            {index === 2 && <IntersectionScroller />}
        </div>
    )
}