import type { MockData } from "../vite-env";


export const mockItems = Array.from({ length: 80 }, (_, i): MockData => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}.`,
}));
