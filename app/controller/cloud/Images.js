Ext.define('CloudApp.controller.cloud.Images', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.Images',
        'cloud.ImagesList',
    ],

    stores: [
        'cloud.Images'
    ],

    refs: [
        {
            ref: 'imageList',
            selector: 'imageslist'
        },
    ],

    init: function(application) {
        this.control({
            "images #imageslist": {
                render: this.onRender,
            },
            "images button#add": {
                click: this.onButtonClickAdd
            },
            "images button#edit": {
                click: this.onButtonClickEdit
            },
            "images button#delete": {
                click: this.onButtonClickDelete
            },
        });
    },

    onRender: function(component, options) {
        CloudApp.util.Util.addToken(component.getStore());
        component.getStore().load();
    },

    onButtonClickAdd: function (button, e, options) {
    },

    onButtonClickEdit: function (button, e, options) {
    },

    onButtonClickDelete: function (button, e, options) {
    },

    onButtonClickSave: function(button, e, options) {
    },

    onButtonClickCancel: function(button, e, options) {
    },
});
