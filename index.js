const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.APP_ACCESS;

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.
// * Code for Route 1 goes here
app.get('/', async (req, res) => {
    const customObjectsUrl = 'https://api.hubspot.com/crm/v3/objects/2-123036810?properties=name,publisher,year_released';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    try {
        const resp = await axios.get(customObjectsUrl, { headers });
        const data = resp.data.results;
        console.log(data);
        res.render('homepage', { title: 'Games Objects', data });      
    } catch (error) {
        console.error(error);
    }
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.
// * Code for Route 2 goes here
app.get('/update-cobj', async (req, res) => {    
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };
    
    const isUpdate = req.query.id ? true : false;

    try {
        if (isUpdate) {
            const getGame = `https://api.hubspot.com/crm/v3/objects/2-123036810/${req.query.id}?properties=name,publisher,year_released`;
            const response = await axios.get(getGame, { headers });
            const data = response.data;
            const title = "Update Custom Object Form | Integrating With HubSpot I Practicum";

            console.log(data);
            res.render('updates', { title: title, id: req.query.id, name: data.properties.name, publisher: data.properties.publisher, year_released: data.properties.year_released });
        } else {
            const title = "Create Custom Object Form | Integrating With HubSpot I Practicum";
            res.render('updates', { title: title, name: '', publisher: '', year_released: '' });
        }
            
    } catch(err) {
        console.error(err);
    }
});

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.
// * Code for Route 3 goes here
app.post('/update-cobj', async (req, res) => {
    
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));