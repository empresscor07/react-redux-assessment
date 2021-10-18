const base_url = 'http://localhost:3000/api/'

// CALENDAR INVITES
export function requestTasks(token) {
    // console.log('running request invites fetching with get')
    return fetch(base_url + 'calendar/task', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}

export function postTask(token, task) {
    // console.log(token)
    console.log(JSON.stringify(task))
    return fetch(base_url + 'calendar/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(task)
    })
}