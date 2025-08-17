export interface Card {
    item: any,
    index: number
}

export default function Card({ item, index }: Card) {

    return (
        <div
            key={item.id}
            data-id={`array element from index:${index}`}
            className='card'
        >
            <h1 style={{ fontSize: '28px' }}>{item.title}</h1>
            <p className='card_description'>{item.description}</p>
        </div>
    )
}