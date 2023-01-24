

const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()


const configuration = new Configuration({
    organization: "org-xYrfvigkDRDqL5VqiuDkctXk",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/* async function callapi(){  
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
    });
    console.log(response.data.choices[0].text)
} */



const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = process.env.PORT || 5050

app.post('/', async (req,res) => {
    const { message, currentModel, currentTemperature, currentToken } = req.body;
    const lastMessage = message[message.length - 1];
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${lastMessage}`,
        max_tokens: JSON.parse(currentToken),
        temperature: JSON.parse(currentTemperature),
    });
    res.json({
        message: response.data.choices[0].text,
    })
    
});

app.get('/models', async (req,res) => {
    const response = await openai.listEngines();
    res.json({
        models: response.data.data,
    })
});

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${process.env.PORT}`)
});
