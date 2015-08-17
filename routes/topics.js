var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /topics

// GET /topics
router.get('/', function (req, res, next) {
    Models.Topic.findAll().then(function (topics) {
        res.json(topics);
        //res.send(200);
    });
});

// GET /topics/:id
router.get('/:id', function (req, res, next) {
    Models.Topic.findOne({where: {id: req.params.id},
        include: {model: Models.Message,
            include: {model: Models.User}}})
            .then(function (topic) {
                res.json(topic);
                //res.send(200);
            });
});

// POST /topics
router.post('/', authentication, function (req, res, next) {
    // Lisää tämä aihealue
    var topicToAdd = req.body;
    //topicToAdd.UserId = req.session.userId;
    //topicToAdd.name = "NAME";
    //topicToAdd.description = "DESCRIPTION";
    Models.Topic.create(topicToAdd).then(function (newTopic) {
        res.json(newTopic);
        //res.send(200);
    });

});

// POST /topics/:id/message
router.post('/:id/message', authentication, function (req, res, next) {
    // Lisää tällä id:llä varustettuun aihealueeseen...
    var topicId = req.params.id;
    // ...tämä viesti (Vinkki: lisää ensin messageToAdd-objektiin kenttä TopicId, jonka arvo on topicId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
    var messageToAdd = req.body;
    messageToAdd.TopicId = topicId;
    messageToAdd.UserId = req.session.userId;
    Models.Message.create(messageToAdd).then(function (newMessage) {
        res.json(newMessage);
        //res.send(200);
    });
});


module.exports = router;
