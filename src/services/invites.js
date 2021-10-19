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

//initially lets user select if attending and creates invite table entry with response
export function postInvite(token, invite, accepted) {
    console.log('Now running post invite')
    const acceptedObject = {accepted:accepted}
    console.log(acceptedObject)
    console.log('postInvite function connecting to database')
    // console.log('Running request event by id');
    return fetch(base_url + 'calendar/invite/' + invite.id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(acceptedObject)
    })
}

export function requestFilteredInvites(token, window) {
    console.log('running request filtered invites')
    console.log(window.window_start, window.window_end)
    console.log(base_url + 'calendar/invite/window')
    return fetch(base_url + 'calendar/invite/window', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(window)
    })
}

// //inviteRSVP is the current invites table row we want to update
// export function putInvite(token, inviteRSVP, accepted) {
//     return fetch(base_url + 'calendar/invite/update/' + inviteRSVP.id, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//         body: JSON.stringify(inviteRSVP)
//     })
// }