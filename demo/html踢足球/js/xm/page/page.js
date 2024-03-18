define(['app','iscroll'],

// Map dependencies from above array.
function(app) {

    var BasePage = {};

    // Default View.
    BasePage.View = Backbone.View.extend({

        el : 'body',
        data : null,
        papers : null,
        preloadObjs : null,
        myScroll : null,
        initialize : function(value) {
            this.el = value.el
            this.data = value.data
            this.init();

        },
        getTemplatePath : function() {
            return app.root + this.template + "/"
        },
        preload : function() {

            console.log("preload: " + this.getTemplatePath());

            this.preloadObjs = {};

            var defer = $.Deferred();
            var context = this;

            $.getJSON(this.getTemplatePath() + 'preload.json').done(function(data) {

                for (var i = 0; i < data.files.length; i++) {
                    data.files[i].source = context.getTemplatePath() + data.files[i].source;
                }

                $.html5Loader({
                    filesToLoad : data,
                    onBeforeLoad : function() {
                        if (context.preloader) {
                            context.preloader.start(true);
                        }
                    },
                    onComplete : function() {
                        if (context.preloader) {
                            context.preloader.complete();
                        }
                        context.renderSVG();
                        defer.resolve();
                    },
                    onElementLoaded : function(obj, el) {
                        obj.content = el;

                        if (obj.source.indexOf(".svg") == obj.source.length - 4) {
                            var svg = obj.content;
                            svg = svg.replace(/xlink:href="/g, "xlink:href=\"" + context.getTemplatePath());
                            svg = svg.replace(/xlink:href='/g, "xlink:href='" + context.getTemplatePath());
                            obj.content = svg;
                        }
                        context.preloadObjs[obj.id] = obj;
                    },
                    onUpdate : function(percentage) {
                        if (context.preloader) {
                            context.preloader.update(percentage);
                        }
                    }
                });

            });

            return defer;
        },
        renderSVG : function() {
            this.papers = {}
            var temp = this.el.find(".svg");

            if (temp.length > 0) {
                for (var i = 0; i < temp.length; i++) {
                    var svgId = $(temp[i]).attr("src");
                    var obj = {
                        el : temp[i],
                        id : svgId,
                        content : null
                    }
                    var xml = $.parseXML(this.preloadObjs[svgId].content);
                    var paper = Raphael(temp[i], temp.css("width"), temp.css("height"));
                    var paperSet = paper.importSVG(xml);
                    obj.content = paperSet;
                    this.papers[svgId] = obj;
                }

            }

        },
        changePage : function(src) {
            window.location = src
        },
        initScroll : function(value) {
            this.myScroll = new IScroll(value, {
                mouseWheel : true,
                click : true
            });
			
			
        },
        init : function() {
        }
    });

    // Return the module for AMD compliance.
    return BasePage;

});
