import { useState } from "react";
import VirtuosoScroll from "../scrollers/VirtuosoScroll";
import SimpleScroll from "../scrollers/SimpleScroller";
import CycleScrollers from "../buttons/CycleScrollers";
import '../../App.css';

export default function RenderScrollers() {
    const [index, setIndex] = useState<number>(0);
    const scrollers: string[] = [
        "Virtuoso",
        "Simple",
        "intersectionObserver"
    ];

    return (
        <section
            className="render"
        >
            <div style={{ paddingBottom: '50px', margin: 'auto' }}>

                <h1 style={{ color: '#FFFFFF' }}> Active Example: <span style={{ color: '#646cff' }}>{`${scrollers[index]}`} scroller </span>   </h1>
                <h2>scroll to render more list items</h2>
            </div>
            <div
                style={{ height: '500px', width: '400px', border: '1px', borderStyle: 'solid', margin: 'auto' }}
            >
                {index === 0 && <VirtuosoScroll />}

                {index === 1 && <SimpleScroll />}
            </div>

            <div style={{ width: '100%', height: 'fit', paddingTop: '20px', margin: 'auto' }}>
                <CycleScrollers
                    setIndex={setIndex}
                    scrollers={scrollers}
                    index={index}
                />
            </div>
        </section>

    )
}