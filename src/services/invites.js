const base_url = 'http://localhost:3000/api/'

// CALENDAR INVITES
export function requestInvites(token) {
    // console.log('running request invites fetching with get')
    return fetch(base_url + 'calendar/invite', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
}