var Book = require('../models/book');
var Genre = require('../models/genre')
var Author = require('../models/author')
var BookInstance = require('../models/bookinstance')

var async = require('async')


exports.index = function(req, res) {

    async.parallel({
        author_count: async () => {
            const cnt = await Author.authorCount();
            console.log(cnt);
            return cnt
        },
        book_count: async () => {
            const cnt = await Book.bookCount();
            console.log(cnt);
            return cnt
        },
        book_instance_count: async () => {
            const cnt = await BookInstance.bookInstanceCount();
            console.log(cnt);
            return cnt
        },
        genre_count: async () => {
            try {
                const cnt = await Genre.genreCount();
                console.log(cnt);
                return cnt
            } catch(err) {
                console.error(err);
            }
        },
    }, function(err, results) {
        if (err) {
            console.error(err);
        }
        console.log("results: ", results);
        res.render('index', { title: 'Local Library Home', error: err, data: results})
    })
}

// Display list of all books.
exports.book_list = async function(req, res) {
    try {
        const list_books = await Book.getAll()
        // console.log(list_books)
        res.render('book_list', {title: 'Book List', book_list: list_books})
    } catch (e) {
        console.error(e);
    }
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};
