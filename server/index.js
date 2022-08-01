const express = require('express');
const cors = require('cors');
const app = express();
const WsServer  = require('express-ws')(app);
const aWss = WsServer.getWss();
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());

const conncetionHandler = (ws,msg) => {
    ws.id = msg.id;
    broadcastConnection(ws, msg);
}

broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id === ws.id) {
            client.send(JSON.stringify(msg));
        }
    });
}

app.ws('/', (ws, res) => {
    ws.on("message", (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method) {
            case 'connection':
                conncetionHandler(ws, msg);
                break;
            default:
                broadcastConnection(ws, msg);  
        }
    });
});

app.post('/image', (req, res) => {
    try {
        const data = req.body.img.replace('data:image/png;base64,', '');
        fs.writeFileSync(path.resolve(__dirname, 'images', req.query.id + '.jpg'), data, 'base64');
        res.json({menubar: 'ok'});
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
});

app.get('/image', (req, res) => {
    try {
        const pathToFile = path.resolve(__dirname, 'images', req.query.id + '.jpg');
        if(fs.existsSync(pathToFile)) {
            const file = fs.readFileSync(pathToFile);
            const data = 'data:image/png;base64,' + file.toString('base64');
            res.json({status: true, image:data});
        } else {
            res.json({status: false});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
});


app.listen(5000, () => {
    console.log('listening on http://localhost:5000');
});
