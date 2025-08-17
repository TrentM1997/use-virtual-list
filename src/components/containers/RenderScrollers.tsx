import { useState } from "react";
import TriggerCycle from "../buttons/TriggerCycle";
import RenderTitle from "../headers/RenderTitle";
import Cycle from "./Cycle";
import '../../App.css';

export default function RenderScrollers() {
    const [index, setIndex] = useState<number>(0);
    const scrollers: string[] = [
        "Virtuoso",
        "Simple",
        "IntersectionObserver"
    ];

    return (
        <section
            className="render"
        >
            <RenderTitle
                index={index}
                scrollers={scrollers}
            />
            <Cycle
                index={index}
            />
            <TriggerCycle
                setIndex={setIndex}
                scrollers={scrollers}
                index={index}
            />
        </section>

    );
};