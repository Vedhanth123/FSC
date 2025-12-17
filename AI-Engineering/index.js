import { FunctionCallingConfigMode, GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import readline from "readline"
import { rl } from "./input.js"

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

function getLocation() {
    return JSON.stringify({
        "city": "Hyderabad",
        "state": "Telangana"
    })
}

async function getWeather(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    try {
        const response = await fetch(url)
        const data = await response.json()

        return JSON.stringify({
            temp: data.main.temp,
        })
    }
    catch (error) {
        return error
    }
}

const tools = {
    "location": getLocation,
    "weather": getWeather
}

const toolDeclarations = [
    {
        functionDeclarations: [
            {
                name: "location",
                description: "Get's the user's current city and state"
            },
            {
                name: "weather",
                description: "Get's the current weather at the city provided",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        city: {
                            type: "STRING",
                            description: "The city name, e.g. Hyderabad, London",
                        }
                    },
                    required: ["city"],
                }
            }
        ]
    }
]

let messages = []
readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout,
    }
)

async function chat() {

    console.log("Hi Vedhanth!, How can I help you today?")

    while (true) {

        const userText = await rl.question("You: ")
        if (userText.toLowerCase === "exit") {
            break
        }

        messages.push({
            role: "user",
            parts: [{
                text: userText
            }]
        })

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: messages,
            config: {
                tools: toolDeclarations
            }
        })

        const choice = response.candidates[0].content.parts[0]

        if (choice.functionCall) {
            const call = choice.functionCall
            console.log(`Executing tool: ${call.name}`)
            let toolOutput;

            if (call.name === "weather") {
                toolOutput = await tools[call.name](call.args.city)
            }
            else {
                toolOutput = await tools[call.name]();
            }

            console.log(`tool output: ${toolOutput}`)
    
            // Add history
            messages.push({ role: "model", parts: [{ functionCall: call }] });
            messages.push({ role: "function", parts: [{ functionResponse: { name: call.name, response: { name: call.name, content: toolOutput } } }] });
    
            const finalResponse = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: messages,
                config: { tools: toolDeclarations }
            });
            const finalText = finalResponse.candidates[0].content.parts[0].text;
    
            console.log(`Gemini: ${finalText}`);
                messages.push({ role: "model", parts: [{ text: finalText }] });
        }
        else {
            console.log(`Gemini: ${choice.text}`);
            messages.push({ role: "model", parts: [{ text: choice.text }] });
        }
    }
}

chat()