import { useVirtuoso } from "../../hooks/useVirtuoso";
import { mockItems } from "../../data/mockData";
import { useEffect, useRef } from "react";
import Card from '../scrollElements/Card';
import Loading from '../scrollElements/Loading';

export default function SimpleScroll() {
  const { visible, loadMore, fullyLoaded } = useVirtuoso(mockItems, 10);
  const boundaryRef = useRef<boolean | null>(null);

  useEffect(() => {

    boundaryRef.current = false;

  }, [visible.length]);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e: React.UIEvent<HTMLDivElement>): void => {
    if (boundaryRef.current) return;
    const el = e.currentTarget;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 40;
    if (nearBottom) {
      boundaryRef.current = true;
      loadMore();
    };
  };


  return (
    <div
      style={{ height: '100%', width: '100%', overflowY: 'scroll', scrollbarGutter: 'stable', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: 'auto', overflowX: 'hidden' }}
      onScroll={(e) => handleScroll(e)}
    >
      {Array.isArray(visible) && visible.map((item, index) => (
        <Card key={item.id} item={item} index={index} />
      ))}
      {!fullyLoaded && <div style={{ width: '100%', height: 'auto', margin: 'auto' }}>
        <Loading />
      </div>}
    </div>
  );
}