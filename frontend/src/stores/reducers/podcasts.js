export default function podcasts(state = {}, action) {
    switch (action.type) {
        case "RESOLVE_PODCAST":
            return {
                [action.body.id]: action.body,
                ...state,
            };
    }
    return state;
}