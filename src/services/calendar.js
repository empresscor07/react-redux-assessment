const base_url = 'http://localhost:3000/api/'

export function requestCalendar(token) {
    return fetch(base_url + 'calendar/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            window_start: '2021-10-01T00:00:00.000Z',
            window_end: '2021-12-31T09:00:00.000Z'
        })
    })
}

// export function createMemo(token, memo) {
//     console.log(token)
//     console.log(memo)
//     return fetch(base_url + 'memo', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//         body: JSON.stringify(memo)
//     })
// }
//
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