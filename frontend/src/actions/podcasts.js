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

export function deleteEpisode(id, pod) {
    return dispatch => {
        fetch(`/api/p/episodes?id=eq.${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        ).then(res => {
            if (res.status != 204) {
                // Broke
                return
            }
            dispatch(loadFullPodcasts(pod));
        })
    }
}

export function fetchUploadURL() {
    return (dispatch, getState) => {
        const file = document.getElementById("podcast_file").files[0];
        fetch(
            '/api/upload',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        )
            .then(res => res.json())
            .then(upload_params => {
                return fetch(upload_params.endpoint,
                    {
                        method: "PUT",
                        body: file
                    }
                ).then(res => {
                    // TODO: move to configure w/ name and stuff?
                    return fetch(
                        '/api/configure',
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                id: upload_params.id,
                                pod: 1,
                            })
                        }
                    )
                })
            })
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: "APPEND_EPISODES",
                    pod: 1,
                    body: res.updates
                })
            })
    }
}