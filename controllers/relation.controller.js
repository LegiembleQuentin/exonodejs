const Relation = require('../models/relation.model');
const { validationResult } = require('express-validator');

exports.createRelation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user2 } = req.body;
    const user1 = req.user.id;

    try {
        const relation = new Relation({ user1, user2 });
        await relation.save();
        res.json(relation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getRelations = async (req, res) => {
    try {
        const relations = await Relation.find({ user1: req.user.id }).populate('user2');
        res.json(relations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
