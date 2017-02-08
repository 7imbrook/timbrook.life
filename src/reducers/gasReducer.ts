export interface GasFill {
    id: number;
    millage: number;
    gallons: number;
    unit_price: string;
}

export interface GasState {
    [id: number]: GasFill;
}

export const gasReducer = (state: GasState, action: any): GasState => {
    if (state === undefined) return [];
    switch (action.type) {
        case 'save_gas_local':
            const newEntries = action.entries.reduce(
                (acc: any, entry: GasFill) => {
                    acc[entry.id] = entry;
                    return acc;
                }, {});
            return {
                ...state,
                ...newEntries
            };
        case 'add_fill_local':
            let fill = {
                id: 0,
                ...action.fill
            };
            return {
                ...state,
                0: fill
            };
        default:
            return state;
    }
};
