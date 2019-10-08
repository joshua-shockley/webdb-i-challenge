const express = require('express');

const db = require('./data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.select('*')
        .from('accounts')
        .then(accounts => {
            console.log('here is the info');
            res.status(200).json(accounts);
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

router.post('/', validPost, (req, res) => {
    const Data = req.body;
    db('accounts')
        .insert(Data, 'id')
        .then(iddy => {
            res.status(200).json(iddy);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/:id', (req, res) => {
    db.select('*')
        .from('accounts')
        .where('id', '=', req.params.id)
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/:id', (req, res) => {
    db('accounts')
})

router.put('/:id', (req, res) => {
    db.select('*')
        .from('accounts')
        .where('id', '=', req.params.id)
        .update(req.body)
        .then(change => {
            res.status(201).json(change);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.delete('/:id', validId, (req, res) => {
    db.select('*')
        .from('accounts')
        .where({ id: req.params.id })
        .del()
        .then(remove => {
            res.status(200).json(remove);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// middleware

function validPost(req, res, next) {
    const PostData = req.body;
    if (!PostData.name && !PostData.budget) {
        res.status(400).json({ Message: 'need to enter info to create account' });
    } else {
        if (!PostData.name) {
            res.status(400).json({ Message: 'missing text in name field' });
        } else {
            if (!PostData.budget) {
                res.status(400).json({ Message: 'missing value in budget field' });
            } else {
                next();
            };
        };
    };
};


// pay attention to whether the id comes back as a string... if integer acccounts === o if as string accounts == 0
function validId(req, res, next) {
    const id = req.params.id;
    db.select('*')
        .from('accounts')
        .where('id', '=', req.params.id)
        .then(accounts => {
            if (accounts === null || accounts == 0) {
                res.status(500).json({ Message: 'nothing with that id' });
            } else {
                console.log(id);
                req.accounts = accounts;
                next();
            };
        });
};

module.exports = router;