Ext.define('CloudApp.controller.cloud.Servers', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.Servers',
        'cloud.ServersList',
    ],

    stores: [
        'cloud.Servers'
    ],

    refs: [
        {
            ref: 'serversList',
            selector: 'serverslist'
        },
    ],

    init: function(application) {
        this.control({
            "servers #serverslist": {
                render: this.onRender,
            },
            "servers button#add": {
                click: this.onButtonClickAdd
            },
            "servers button#edit": {
                click: this.onButtonClickEdit
            },
            "servers button#delete": {
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
