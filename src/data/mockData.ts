export interface MockData {
    id: number,
    title: string,
    description: string
}


export const mockItems = Array.from({ length: 80 }, (_, i): MockData => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}.`,
}));
