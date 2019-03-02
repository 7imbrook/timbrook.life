import fetchActionCreator from 'fetch-action-creator';


export function loadFullPodcasts(id) {
    return dispatch => {
        dispatch(fetchActionCreator(
            'PODCAST',
            `/api/p/podcasts?select=*,episodes(*)&id=eq.${id}`,
            {
                headers: {
                    Accept: "application/vnd.pgrst.object+json",
                },
            },
        ))
    }
}