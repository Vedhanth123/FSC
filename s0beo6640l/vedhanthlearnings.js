/**
 * CS 101: The Fetch API
 * 
 * Think of fetch() as a messenger you send from your browser 
 * to a server to get or send information.
 */

// --- EXAMPLE 1: GET Request (Getting data) ---
async function getLearningExample() {
    try {
        // 1. The messenger starts the journey to a fake "Test API"
        // We use "await" because traveling over the internet takes time!
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

        // 2. The messenger is back! 
        // response.ok is a shortcut to see if the status is in the 200 range (Success).
        if (response.ok) {

            // 3. The data is still "locked" in the response package.
            // We use await AGAIN to wait for the package to be unpacked into JSON.
            const data = await response.json();

            console.log('1. GET Success - We got this back:', data.title);
        } else {
            console.error('The server answered, but it said: Error', response.status);
        }
    } catch (err) {
        // This runs if the messenger couldn't even find the address (No internet).
        console.error('Network Error:', err);
    }
}

// --- EXAMPLE 2: POST Request (Sending data - like Login/Signup) ---
async function postLearningExample() {
    // This is the data we want to send
    const myData = {
        username: 'vedhanth',
        hobby: 'coding'
    };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST', // We specify we are SENDING data
            headers: {
                'Content-Type': 'application/json' // We tell the server: "I am sending a JSON object"
            },
            // Important: Servers can't read JS Objects. 
            // We must turn the object into a String (JSON.stringify) before sending.
            body: JSON.stringify(myData)
        });

        const result = await response.json();
        console.log('2. POST Success - The server received our data:', result);

    } catch (err) {
        console.error('POST Error:', err);
    }
}

// Run the examples
console.log("--- Starting Fetch Experiments ---");
getLearningExample();
postLearningExample();

/**
 * WHY TWO AWAITS?
 * 1st await (fetch): Waits for the "Headers" (The server says: "I'm here, I have the data, and it's a JSON file").
 * 2nd await (json): Waits for the "Body" (The actual heavy data to finish downloading).
 */
