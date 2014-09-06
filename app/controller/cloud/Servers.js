Ext.define('CloudApp.controller.cloud.Servers', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.Servers',
        'cloud.ServersList',
        'cloud.ServerCreate',
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
                activate: this.onActivate,
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
            "servercreate button#save": {
                click: this.onButtonClickSave
            },
            "servercreate button#cancel": {
                click: this.onButtonClickCancel
            },

        });
    },

    onRender: function(component, options) {
        var imagesStore = Ext.getStore('cloud.Images');
        CloudApp.util.Util.addToken(imagesStore);
        imagesStore.load();

        var flavorsStore = Ext.getStore('cloud.Flavors');
        CloudApp.util.Util.addToken(flavorsStore);
        flavorsStore.load();

        CloudApp.util.Util.addToken(component.getStore());
        component.getStore().load();
    },

    onActivate: function(component, eOpts) {
        component.getStore().load();
    },

    onButtonClickAdd: function (button, e, options) {
        var win = Ext.create('CloudApp.view.cloud.ServerCreate');
        win.setTitle('创建云主机');
        win.show();
    },

    onButtonClickEdit: function (button, e, options) {
    },

    onButtonClickDelete: function (button, e, options) {
    },

    onButtonClickSave: function(button, e, options) {
        var win = button.up('window'),
        formPanel = win.down('form'),
        store = this.getServersList().getStore();

        if (formPanel.getForm().isValid()) {
            url = API_URL + '/servers';
            var values = formPanel.getValues();

            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                method: 'POST',
                params: {
                    server_name: values.name,
                    image_name: values.image,
                    flavor_name: values.flavor,
                },
                success:  function(conn, response, options, eOpts) {
                    CloudApp.util.Alert.msg('成功', '云主机正在创建。');
                    store.load();
                    win.close();
                },
                failure: function(conn, response, options, eOpts) {
                    Ext.get(formPanel.getEl()).unmask();
                    CloudApp.util.Util.showErrorMsg(conn.responseText);
                }
            });
        }
    },

    onButtonClickCancel: function(button, e, options) {
        button.up('window').close();
    },
});
