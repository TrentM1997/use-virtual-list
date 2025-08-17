# Custom useVirtualList Hook

## What: tiny react hook to batch render long lists, for smooth endless scroll

## Purpose 
- Reduces DOM node consumption, lowering memory usage and render work for the browser (only a slice is appended to the rendered list at any time)
- Great for learning virtualized rendering concepts(batching, preventing overlap of scheduling, cleanup)
- Smoother UX(particularly on lower-end devices) by avoiding costly paint of entire large lists on every render

## API 

```
function useVirtualList<T>(
    items: T[], 
    initialCount?: number // default 8
    batchLength?: number // default 6
    ) -> { 
        visible: T[], 
        loadMore: () => void, 
        fullyLoaded: boolean 
        }
```
>[!NOTE] 
>With react-virtuoso, increaseViewportBy controls overscan - the extra pixels rendered above/below the viewport. 
>It does not trigger loading itself; endReached triggers loadMore.

### Parameters

- items: your data set to render. This parameter can be an array of any type
- initialCount: how many array elements from 'items' to display on initial render 
- batchLength: optional parameter for how many items to reveal per batch

### Returns
- visible: rendered elements from the data set passed to 'items'
- loadMore: function that when called in the event you've scrolled to the bound set in 'increaseViewPortBy' 
schedules the next batch(won't overlap schedules)
- fullyLoaded: once this value is true, your full data set has been rendered

## Quick Start (with react-virtuoso) - Primary usage

#### In the terminal
- cd useVirtuoso
- install react-virtuoso: npm i react-virtuoso

#### Code for endless scroller
```
// React + TypeScript/TSX

import { Virtuoso, type FooterProps } from "react-virtuoso";
import { useVirtualList } from "../../hooks/useVirtualList";

type Item = { id: number; title: string; description: string };
type Ctx  = { fullyLoaded: boolean };

function Loader({ context }: FooterProps<Ctx>) {
  return context?.fullyLoaded ? null : <div className="loader" />;
}

export default function EndlessScroll({ items }: { items: Item[] }) {
  const { visible, loadMore, fullyLoaded } = useVirtualList(items, 10, 8);

    //******* CSS properties for <Virtuoso/> component ********
   const virutosoStyles: React.CSSProperties = {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    };

    //******* CSS properties for <Virtuoso/> component ********

  return (
    <Virtuoso<Item, Ctx>
      style={virtuosoStyles}
      data={visible}
      endReached={loadMore}
      computeItemKey={(_, item) => item.id}
      increaseViewportBy={ 120 }
      components={{ Footer: Loader }}
      context={{ fullyLoaded }}
      itemContent={(index, item) => (
        <div className="card">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      )}
    />
  );
}

```

## Basic Usage (no third-party library)

### useVirtualList is library-agnostic. It just returns the visible items rendered, a loadMore trigger, and a fullyLoaded flag. You can wire it to any scroll trigger.

#### Example B - Simple scroll trigger
```
// React + TypeScript/TSX

import { useEffect } from 'react';
import { useVirtualList } from "../../hooks/useVirtualList";

const items = Array.from({ length: 80 }, (_, i) => `Item ${i + 1}`);

export default function Demo() {
  const { visible, loadMore, fullyLoaded } = useVirtualList(items, 10);
   const boundaryRef = useRef<boolean | null>(null);


  const handleScroll: React.UIEventHandler<HTMLDivElement> = (
    e: React.UIEvent<HTMLDivElement>
    ): void => {
    if (boundaryRef.current) return;
        const el = e.currentTarget;
        const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 40;
        if (nearBottom) {
          boundaryRef.current = true;
          loadMore();
    };
  };

   useEffect(() => {

    boundaryRef.current = false;
  }, [visible.length]);

  return (
    <div
      style={{ height: 420, overflow: "auto", border: "1px solid #444", padding: 8 }}
      onScroll={(e) => handleScroll(e)}
    >
      {visible.map((t, i) => (
        <div key={i} className="card">{t}</div>
      ))}
      {!fullyLoaded && <div className="loader" />}
    </div>
  );
}

```

#### Example C - IntersectionObserver (scroll math not needed)

```
// React + TypeScript/TSX

import { useRef, useEffect } from "react";
import { useVirtualList } from "../../hooks/useVirtualList";

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
                <div 
                className="card"
                item={item} 
                index={index}>
                 <h1 
                 style={{ fontSize: '28px' }}
                 >{item.title}
                 </h1>
            <p 
            className='card_description'
            >{item.description}
            </p>
            </div>
            ))}
            {!fullyLoaded && <div ref={boundaryRef} style={{ height: 1, marginBottom: '10px' }} />}
            {!fullyLoaded && <div className='loader' />}
        </div>
    );
}

```



