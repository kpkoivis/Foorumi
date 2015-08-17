var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /messages

// GET /messages/:id
router.get('/:id', function (req, res, next) {
    Models.Message.findOne({
        where: {id: req.params.id},
        include: [{model: Models.User},
            {model: Models.Reply,
                include: {
                    model: Models.User
                }}]}).then(function (message) {
        res.json(message);
    });
});

// POST /messages/:id/reply
router.post('/:id/reply', authentication, function (req, res, next) {
    // Lisää tällä id:llä varustettuun viestiin...
    var messageId = req.params.id;
    // ...tämä vastaus (Vinkki: lisää ensin replyToAdd-objektiin kenttä MessageId, jonka arvo on messageId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
    var replyToAdd = req.body;
    replyToAdd.MessageId = messageId;
    replyToAdd.UserId = req.session.userId;
    Models.Reply.create(replyToAdd).then(function (addedReply) {
        Models.Reply.findOne({
            where: {id: addedReply.id},
            include: {model: Models.User
            }
        }).then(function (replyWithUser) {
            res.json(replyWithUser);
        });
    });
});

module.exports = router;
