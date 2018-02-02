var objectId = require('mongodb').ObjectId;

module.exports = function(app, db) {
    
    //C=Create/Post
    app.post('/notes', (req,res) => {
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
        console.log(req.body);
        //res.send('Hello from post ');
    });

    //R=Read
    app.get('/notes/:id', (req,res) => {
        const myDB = db.db('notesdb');

        const id = req.params.id;
        const details = {'_id': new objectId(id)};
        myDB.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occured'});
            }
            else
            {
                res.send(item);
            }
        });
        console.log('asking for a note');
        
        res.send
        //res.send('this should be a returned note');
    })

    //U=Update

    //D=Delete
};