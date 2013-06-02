var session = require('../models/session.js')
    , settings = require('../settings');

exports.index = {
    get: function (req, res) {
        var client = session.get(req).getClient();

        var authorize_url = client.authorize_url();

        res.render('index', {authorize_url: authorize_url});
    }
};

exports.doubanback = {
    get: function (req, res) {
        var code = req.param('code');
        var client = session.get(req).getClient();

        client.auth_with_code(code, function (err, doubanToken) {
            if (!err) {
                session.get(req).setDoubanToken(doubanToken);
                res.redirect('/home/douban');
            }
        });
    }
};

exports.douban = {
    get: function (req, res) {
        res.render('douban',
            {
                testUserId1: settings.testUserId1,
                testUsername1: settings.testUsername1,
                testUserId2: settings.testUserId2,
                testUsername2: settings.testUsername2
            });
    }
};