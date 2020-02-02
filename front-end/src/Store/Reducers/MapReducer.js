import { LOAD_MAP } from "../Actions/actionTypes";

const initialState = {
    stores: []
};

export const mapReducer = (state = initialState, action) => {

    let stateCopy = { ...state }

    switch (action.type) {
        case LOAD_MAP:
            let newMarker = action.payload

            stateCopy.stores = [...stateCopy.stores, newMarker]
            break
        default:
            break
    }
    return stateCopy
};
