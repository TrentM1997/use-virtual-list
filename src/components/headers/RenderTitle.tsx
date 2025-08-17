import type { RenderTitles } from "../../vite-env";

export default function RenderTitle({ index, scrollers }: RenderTitles) {

    return (
        <div style={{ paddingBottom: '50px', margin: 'auto' }}>

            <h1 style={{ color: '#FFFFFF' }}>
                Example Type: <span style={{ color: '#646cff' }}>{`${scrollers[index]}`}</span>
            </h1>
            <h2>scroll to render more list items</h2>
        </div>
    )
}