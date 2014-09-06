Ext.define('CloudApp.controller.cloud.Flavors', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.Flavors',
        'cloud.FlavorsList',
        'cloud.FlavorEdit',
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
                itemdblclick: this.onButtonClickEdit
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
            "flavoredit button#save": {
                click: this.onButtonClickSave
            },
            "flavoredit button#cancel": {
                click: this.onButtonClickCancel
            },
        });
    },

    onRender: function(component, options) {
        CloudApp.util.Util.addToken(component.getStore());
        component.getStore().load();
    },

    onButtonClickAdd: function (button, e, options) {
        var win = Ext.create('CloudApp.view.cloud.FlavorEdit');
        win.setTitle('增加云主机类型');
        win.show();
    },

    onButtonClickEdit: function (button, e, options) {
        var grid = this.getFlavorsList();
        var record = grid.getSelectionModel().getSelection();

        if(record[0]) {
            // record[0]里的数据是未更新的数据，可能是extjs的bug
            // 只好从store里重新读取一遍
            data = grid.getStore().getById(record[0].get('id'));

            var editWindow = Ext.create('CloudApp.view.cloud.FlavorEdit');
            editWindow.down('form').loadRecord(data);

            editWindow.setTitle(data.get('name'));
            editWindow.show();
        }

    },

    onButtonClickDelete: function (button, e, options) {
        var grid = this.getFlavorsList();
        var record = grid.getSelectionModel().getSelection();
        store = grid.getStore();

        if (record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            Ext.Msg.show({
                 title:'删除',
                 msg: '是否确定删除云主机类型"' + data.get('name') +'"?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        url = API_URL + '/flavors' + '/' + data.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'DELETE',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                CloudApp.util.Alert.msg('成功', '成功删除云主机类型。');
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
        store = this.getFlavorsList().getStore();

        if (formPanel.getForm().isValid()) {
            url = API_URL + '/flavors';
            var values = formPanel.getValues();
            console.log(values);
            if (values.id) {
                url = url + '/' + values.id;
            }

            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                params: {
                    id: values.id,
                    name: values.name,
                    vcpus: values.vcpus,
                    ram: values.ram,
                    disk: values.disk, 
                    ephemeral: values.ephemeral,
                    swap: values.swap,
                },
                success:  function(conn, response, options, eOpts) {
                    CloudApp.util.Alert.msg('成功', '云主机类型已保存。');
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
