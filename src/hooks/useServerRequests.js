const useServerRequests = () => {

    const get = uri => fetch(uri).then(response => response.json())

    const post = (uri, data) => fetch(uri, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json())

    return {
        get,
        post,
    }
}

export default useServerRequests
