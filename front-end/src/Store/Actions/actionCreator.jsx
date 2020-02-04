import { FETCH_TRENDING } from './actionTypes'

export const loadMap = (payload) => {
    return {
        type: FETCH_TRENDING,
        payload
    }
}