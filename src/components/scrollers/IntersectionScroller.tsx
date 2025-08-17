import { useRef, useEffect } from "react";
import { useVirtualList } from "../../hooks/useVirtualList";
import { mockItems } from "../../data/mockData";
import Card from '../scrollElements/Card';
import Loader from "../scrollElements/Loading";

export default function IntersectionScroller() {
    const { visible, loadMore, fullyLoaded } = useVirtualList(mockItems, 10);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const boundaryRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        console.log(visible)
        if (fullyLoaded) return;

        const boundary = boundaryRef.current;
        const root = containerRef.current;

        if (!root || !boundary) return;
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && loadMore(),
            { root, rootMargin: "100px" }
        );
        observer.observe(boundary);
        return () => observer.disconnect();
    }, [loadMore, fullyLoaded]);

    return (
        <div ref={containerRef}
            style={{ height: '100%', gap: '8px', width: '100%', overflowY: 'scroll', scrollbarGutter: 'stable', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: 'auto', overflowX: 'hidden' }}
        >
            {visible.map((item, index) => (
                <Card item={item} index={index} />
            ))}
            {!fullyLoaded && <div ref={boundaryRef} style={{ height: 1, marginBottom: '10px' }} />}
            {!fullyLoaded && <Loader />}
        </div>
    );
}