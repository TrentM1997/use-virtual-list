import { useState, useCallback, useRef, useEffect } from "react";

type LoadMore = () => void;

export interface VirtualListHook<T> {
    // True if all elements in the 'items' array have been rendered
    fullyLoaded: boolean,
    // The slice of the 'items' array that should render 
    visible: T[],
    // function that schedules the next batch of elements to render
    loadMore: LoadMore
};

/* 
    useVirtuoso incrementally renders list items in fixed length batches
    - prevents duplicate render scheduling during ongoing calls to render the next batch
    - safegaurds against calls to render more list items, when another call would exhuast the length
    of the provided array 
*/

export function useVirtualList<T>(items: T[], batchLength?: number): VirtualListHook<T> {
    const [rendered, setRendered] = useState<number>(8);
    const [fullyLoaded, setFullyLoaded] = useState<boolean>(false);

    //we'll use these to prevent multiple calls of setTimeout before the previous call has finished running
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pendingTimeoutRef = useRef<boolean>(false);

    const visible = items.slice(0, rendered);
    const nextBatchLength: number = batchLength ?? 6;

    const loadMore: LoadMore = useCallback(() => {
        if (pendingTimeoutRef.current) return;
        if (fullyLoaded) return;
        if (rendered >= items.length) return;

        pendingTimeoutRef.current = true;

        /* calculating the next batch to be rendered (will be either our nextBatchLength value or the remaining elements in 'items) */
        const remainingItems: number = items.length - rendered;
        const next: number = Math.min(nextBatchLength, remainingItems);


        /* safeguard against additional calls to 'loadMore()'
         when the 'items' array has been fully rendered */
        timeRef.current = setTimeout((): void => {
            setRendered((rendered) => {
                const nextRender = rendered + next;
                if (nextRender >= items.length) setFullyLoaded(true);
                return nextRender
            })

            pendingTimeoutRef.current = false;
            timeRef.current = null;

        }, 400);
    }, [items.length, nextBatchLength, rendered, fullyLoaded]);

    useEffect(() => {
        //clearing the timeout when the component this hook is utilized in unmounts
        return () => {
            if (timeRef.current) clearTimeout(timeRef.current);
            pendingTimeoutRef.current = false;
        };
    }, []);
    /*
     ***********useEffect Hook when array(the 'items' parameter) may change ***********
         useEffect(() => {
           if (timerRef.current) clearTimeout(timerRef.current);
           pendingRef.current = false;
         }, [items]);
     *********************************************************************************
    */
    return { fullyLoaded, visible, loadMore };
};