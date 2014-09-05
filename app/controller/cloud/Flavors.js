Ext.define('CloudApp.controller.cloud.Flavors', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.Flavors',
        'cloud.FlavorsList',
    ],

    stores: [
        'cloud.Flavors'
    ],

    refs: [
        {
            ref: 'flavorsList',
            selector: 'flavorslist'
        },
    ],

    init: function(application) {
        this.control({
            "flavors #flavorslist": {
                render: this.onRender,
            },
            "flavors button#add": {
                click: this.onButtonClickAdd
            },
            "flavors button#edit": {
                click: this.onButtonClickEdit
            },
            "flavors button#delete": {
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
