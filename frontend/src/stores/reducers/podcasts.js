export default function podcasts(state = {}, action) {
    switch (action.type) {
        case "RESOLVE_PODCAST":
            return {
                [action.body.id]: action.body,
                ...state,
            };
        case "APPEND_EPISODES":
            return {
                ...state,
                [action.pod]: {
                    ...state[action.pod],
                    episodes: [
                        ...state[action.pod].episodes,
                        ...action.body,
                    ],
                },
            }
    }
    return state;
}