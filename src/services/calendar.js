const base_url = 'http://localhost:3000/api/'

export function requestCalendar(token) {
    // console.log(JSON.stringify(window));
    return fetch(base_url + 'calendar/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        // body: JSON.stringify(window)
    })
}


export function requestFilteredCalendar(token, window) {
    return fetch(base_url + 'calendar/events/window', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(window)
    })
}

export function createEvent(token, event) {
    console.log(token)
    console.log(event)
    return fetch(base_url + 'calendar/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(event)
    })
}

// export function deleteMemo(token, memo) {
//     console.log(memo)
//     return fetch(base_url + 'memo/' + memo.id, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//         body: JSON.stringify({
//             created_timestamp: memo.created_timestamp
//         })
//     })
// }