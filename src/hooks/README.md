# The useVirtualList hook

>[!NOTE] The useVirtualList hook is library agnostic, and doesn't require a third-party library like react-virtuoso to work
> It's simply a small algorithm + state machine for growing a visible window over time with safe scheduling 
> It is NOT: a full windowing/virtualizer that unmounts off-screen rows or measures row heights

## API 

 - Params
    - items: T[] - your full dataset to be renderd

    - initialCount?: number - how many array elements from 'items' to display on initial render (defaults to 8)

    - batchLength?: number - how many items to add per batch upon each trigger on scroll(defaults to 6)

- Returns
    - visible: T[] - slice of the array to render(defaults to 8 on initial render)

    - loadMore(): void - useCallBack hook that gaurds against duplicate triggers and flags when the full dataset has been rendered

    - fullyLoaded: boolean - flag that is true when visible.length === items.length


## Behavior details

- Initial window starts at a small size (defaults to first 8 elements of the provided array).

- Next batch size defaults to a constant (6 elements) unless provided in parameters. 

- Scheduling delay (you currently use ~400ms) smooths bursty scroll events; it’s not tied to animation frames.

- If items changes, you’ll likely want to reset the internal timer/flags.


## When to use without a virtualizer library?

- Your items are uniform in height and don't need strict viewport management

- You want infinite scroll/endless scroll behavior without pulling in a heavy virtualizer


## When not to use without a virtualizer library?

- If you need true virtualization (unmount off-screen items, rendering list items of variable heights etc.). For those cases,
pair this with a virtualizer library like react-virtuoso.
