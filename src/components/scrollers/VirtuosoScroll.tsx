import { useVirtualList } from "../../hooks/useVirtualList";
import { Virtuoso } from "react-virtuoso";
import { mockItems } from "../../data/mockData";
import Loader from "../scrollElements/Loading";
import Card from '../scrollElements/Card';
import type { Ctx, MockData } from "../../vite-env";
import '../../App.css';


export default function VirtuosoScroll() {
    const { loadMore, visible, fullyLoaded } = useVirtualList(mockItems);

    const virutosoStyles: React.CSSProperties = {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 'auto'
    };
    //stored these in a variable to maintain focus on the Virtuoso component's properties


    return (
        <Virtuoso<MockData, Ctx>
            style={virutosoStyles}
            data={visible}
            endReached={loadMore}
            increaseViewportBy={50}
            computeItemKey={(_, item) => item.id}
            context={fullyLoaded}
            components={{ Footer: Loader }}
            itemContent={(index, item) => (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '8px' }}>
                    <Card item={item} index={index} />
                </div>
            )}
        />
    )
}