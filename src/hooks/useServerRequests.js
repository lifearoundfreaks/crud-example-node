const useServerRequests = () => {

    const get = uri => fetch(uri).then(response => response.json())

    const post = (uri, data) => fetch(uri, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())

    const put = (uri, data, id) => fetch(uri + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())

    const deleteById = (uri, id) => fetch(uri + id, {
        method: 'DELETE',
    }).then(response => response.json())

    return {
        get,
        post,
        put,
        deleteById,
    }
}

export default useServerRequests
