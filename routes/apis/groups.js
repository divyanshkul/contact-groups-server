var express = require('express');
var router = express.Router();

var Group = require('../../models/groups.js');

router.get('/', function(req, res, next) {
    Group.find()
    .then(function(groups) {
        res.send(groups);
    })
    .catch(next)
    .error(console.error);
});

router.post('/', function(req, res, next) {
    var group = new Group({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    group.save()
    .then(function(group) {
        res.send(group);
    })
    .catch(next)
    .error(console.error);
});

router.get('/:id', function(req, res, next) {
    Group.findOne({ _id: req.params.id })
    .then(function(group) {
        res.send(group);
    })
    .catch(next)
    .error(console.error);
});

router.put('/:id', function(req, res, next) {
    Group.update({ _id: req.params.id }, req.body)
    .then(function(group) {
        res.send(group);
    })
    .catch(next)
    .error(console.error);
});

router.delete('/:id', function(req, res, next) {
    Group.findByIdAndRemove(req.params.id)
    .then(function(group) {
        res.send(group);
    })
    .catch(next)
    .error(console.error);
});

module.exports = router;
