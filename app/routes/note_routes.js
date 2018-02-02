var objectId = require('mongodb').ObjectId;
var cors = require('cors');

module.exports = function(app, db) {
    
    //C=Create/Post
    app.post('/notes',  (req,res) => {
        const myDB = db.db('notesdb');
        //myDB.collection('notes');

        const note = {text: req.body.body, title: req.body.title};
        myDB.collection('notes').insert(note, (err, result) => {
            if (err){
                res.send({'error': 'An error has occured'});
            }
            else {
                res.send(result.ops[0]);
            }
        })
        console.log('added a note');
        //res.send('Hello from post ');
    });

    //R=Read
    app.get('/notes/:id', cors(), (req,res) => {
        const myDB = db.db('notesdb');

        const id = req.params.id;
        const details = {'_id': new objectId(id)};
        myDB.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            }
            else {
                res.send(item);
            }
        });
        console.log('asking for a note');
        //res.send('this should be a returned note');
    })

    app.get('/notes', cors(), (req,res)=>{
        const myDB = db.db('notesdb');
        myDB.collection('notes').find((err, item) => {
            if(err) {
                res.send({'error': 'An error has occured'});
            }
            else {
                res.send(item);
            }
        });
        console.log('asking for all notes');
    })

    //U=Update
    app.put('/notes/:id', (req, res) => {
        const myDB = db.db('notesdb');
        //myDB.collection('notes');

        const id = req.params.id;
        const details = {'_id': new objectId(id)};
        const note = {text: req.body.body, title: req.body.title};
        
        myDB.collection('notes').update(details, note, (err, result) => {
            if (err){
                res.send({'error': 'An error has occured'});
            }
            else {
                res.send(note);
            }
        })
        console.log('updated note');
        //res.send('Hello from post ');
    });

    //D=Delete
    app.delete('/notes/:id', (req, res) => {
        const myDB = db.db('notesdb');

        const id = req.params.id;
        const details = {'_id': new objectId(id)};
        
        myDB.collection('notes').remove(details, (err, result) => {
            if (err){
                res.send({'error': 'An error has occured'});
            }
            else{
                res.send('Note "' + req.body.title + '" has been deleted');
            }
        });
        console.log('deleted a note');
    });
};