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
            "servers": {
                activate: this.onActivate,
            }, 
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
    },

    onActivate: function(component, eOpts) {
        //每次显示时刷新，以便及时得到server的状态
        store = component.down('#serverslist').getStore();
        CloudApp.util.Util.addToken(store);
        store.load();
    },

    onButtonClickAdd: function (button, e, options) {
        var win = Ext.create('CloudApp.view.cloud.ServerCreate');
        win.setTitle('创建云主机');
        win.show();
    },

    onButtonClickEdit: function (button, e, options) {
    },

    onButtonClickDelete: function (button, e, options) {
        var grid = this.getServersList();
        var record = grid.getSelectionModel().getSelection();
        store = grid.getStore();

        if (record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            Ext.Msg.show({
                 title:'删除',
                 msg: '是否确定删除云主机"' + data.get('name') +'"?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        url = API_URL + '/servers' + '/' + data.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'DELETE',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                CloudApp.util.Alert.msg('成功', '正在执行删除云主机操作。');
                                store.load();
                            },
                            failure: function(conn, response, options, eOpts) {
                                CloudApp.util.Util.showErrorMsg(conn.responseText);
                            }
                        });
                    }
                 }
            });
        }
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
                    CloudApp.util.Alert.msg('成功', '正在创建云主机。');
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
