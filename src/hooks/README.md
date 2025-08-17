# The useVirtualList hook

>[!NOTE] 
> The useVirtualList hook is library agnostic, and doesn't require a third-party library like react-virtuoso to work
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


## When to use without a virtualizer

- Your items are uniform in height and don't need strict viewport management

- You want infinite scroll/endless scroll behavior without pulling in a heavy virtualizer


## When to use with a virtualizer

- If you need true virtualization (unmount off-screen items, rendering list items of variable heights etc.). For those cases,
pair this with a virtualizer library like react-virtuoso.


## Gotchas

- Why doesn’t the CSS property 'gap' work on the react-virtuoso component <Virtuoso/>? 
   - Virtualizers often absolutely-position items; add spacing(margin/padding) on the item wrapper instead.


>[!NOTE] 
> #### React 18 Strict mode (dev-only)
> When developing with <StrictMode> enabled, React mounts, unmounts, and then mounts your components again to 
> detect unsafe side-effects. That means initial renders (thus any timers you set) can run twice. This behavior is dev-only
>
> What you may notice in dev: 
> The trigger (loadMore()) fires twice, or one of your logs is duplicated in the console
> A timer schedules, immediately is cleaned up, and then schedules again
> The visible window does nothing on first scroll attempt (due to first mount being discarded)
>
> Why this is no cause for alarm:
> useVirtualList uses a flag (pendingTimeoutRef to be exact) and cleanup to ignore overlapping scheduling of triggers
> and cleans up timers on unmount. Thus duplicate batches will not occur. 



