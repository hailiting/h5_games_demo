define([], function() {

    var app = {};
    app.root='page/' 
    return _.extend(app, {}, Backbone.Events);
});


