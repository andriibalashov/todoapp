var User = require('./model/user');

function getUsers(res) {
    User.find(function (err, todos) {

        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
};

module.exports = function (app) {

    app.get('/api/users', function (req, res) {
        getUsers(res);
    });

    app.post('/api/users', function (req, res) {
        User.create({
            text: req.body.text,
            done: false
        }, function (err, user) {
            if (err)
                res.send(err);
            getUsers(res);
        });

    });

    app.post('/api/users/:user_id/todo', function (req, res) {

        User.findById(req.params.user_id, function (err, user) {

            user.todo.push( {
                text: req.body.text,
                    done: false
            });

            user.save(function (err) {
                if (err) return handleError(err)
                console.log('Success!');
                getUsers(res);
            });

        });


    });

    app.delete('/api/users/:user_id', function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);
            getUsers(res);
        });
    });

    app.delete('/api/users/:user_id/todo/:todo_id', function (req, res) {

        User.findById(req.params.user_id, function (err, user) {

            var doc = user.todo.id(req.params.todo_id).remove();

            user.save(function (err) {
                if (err) return handleError(err)
                console.log('Success!');
                getUsers(res);
            });

        });
    });


    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
