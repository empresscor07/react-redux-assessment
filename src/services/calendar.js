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
    console.log(window.window_start, window.window_end)
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
    // console.log(token)
    console.log(JSON.stringify(event))
    return fetch(base_url + 'calendar/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(event)
    })
}

export function deleteEvent(token, event) {
    return fetch(base_url + 'calendar/events/' + event.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        //don't need body here because already getting the host_id through the token and the event id through URL
    })
}