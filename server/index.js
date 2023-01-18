

const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const configuration = new Configuration({
    organization: "org-xYrfvigkDRDqL5VqiuDkctXk",
    apiKey: "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",
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
app.use(express.json())
app.use(cors())
const port = 3080

app.post('/', async (req,res) => {
    const { message, currentModel } = req.body;
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    res.json({
        message: response.data.choices[0].text,
    })
});

app.get('/models', async (req,res) => {
    const response = await openai.listEngines();
    res.json({
        models: response.data.data
    })
});

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`)
});
