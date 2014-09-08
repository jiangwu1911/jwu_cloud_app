Ext.define('CloudApp.controller.cloud.Volumes', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.Volumes',
        'cloud.VolumesList',
    ],

    stores: [
        'cloud.Volumes'
    ],

    refs: [
        {
            ref: 'volumeList',
            selector: 'volumelist'
        },
    ],

    init: function(application) {
        this.control({
            "volumes #volumeslist": {
                render: this.onRender,
            },
            "volumes button#add": {
                click: this.onButtonClickAdd
            },
            "volumes button#edit": {
                click: this.onButtonClickEdit
            },
            "volumes button#delete": {
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
