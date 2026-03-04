export function loadBookData() {
    return callNetlifyFunction('currentlyReading')
}

export async function fetchRemote() {
    // same as below but ftech from https://jsonplaceholder.typicode.com/todos/1
    let error: boolean = false
    let data: any = null
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        if (!response.ok) {
            error = true
            return
        }
        data = await response.json()
    } catch (err) {
        error = true
    } finally {
        return { error, data }
    }
}

export async function callNetlifyFunction(func: string) {
    let error: boolean = false
    let data: any = null

    try {
        const response = await fetch(`/.netlify/functions/${func}`)
        if (!response.ok) {
            error = true
            return
        }
        data = await response.json()
    } catch (err) {
        error = true
    } finally {
        return { error, data }
    }
}