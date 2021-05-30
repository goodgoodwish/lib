var Genre = require('../models/genre');
const { body, validationResult } = require("express-validator");
const genre = require('../models/genre');

// Display list of all Genre.
exports.genre_list = async function(req, res, next) {
    console.log('Genre list');
    try {
        list_genres = await Genre.getAll()
        res.render('genre_list', { title: 'Genre List', genre_list: list_genres });

    } catch (e) {
        return next(e);

    }
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res, next) {
    // res.send('NOT IMPLEMENTED: Genre create GET');
    res.render('genre_form', {title: 'Create Genre'})
};

// Handle Genre create on POST.
exports.genre_create_post = [
    body('name', 'Genre name required').trim().isLength({ min: 1}).escape(),

    async (req, res, next) => {
        const errors = validationResult(req);
        try {
            let genre = await Genre.add(req.body.name);
            console.log(genre);

            if (!errors.isEmpty()) {
                res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()})
                return;
            } else {
                // one_genre = await Genre.getById(req.body.name);
                res.redirect(genre.url)
            }

        } catch (err) {
            return next(err)
        }
    }
]

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
