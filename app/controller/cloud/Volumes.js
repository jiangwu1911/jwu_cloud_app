Ext.define('CloudApp.controller.cloud.Volumes', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.Volumes',
        'cloud.VolumesList',
        'cloud.VolumeEdit',
        'cloud.VolumeCreate',
    ],

    stores: [
        'cloud.Volumes'
    ],

    refs: [
        {
            ref: 'volumesList',
            selector: 'volumeslist'
        },
    ],

    init: function(application) {
        this.control({
            "volumes": {
                activate: this.onActivate,
            },
            "volumes #volumeslist": {
                render: this.onRender,
                select: this.onSelect,
                itemdblclick: this.onButtonClickEdit
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
            "volumeedit button#save": {
                click: this.onButtonClickEditSave
            },
            "volumeedit button#cancel": {
                click: this.onButtonClickEditCancel
            },
            "volumecreate button#save": {
                click: this.onButtonClickSave
            },
            "volumecreate button#cancel": {
                click: this.onButtonClickCancel
            },
            "volumes button#attach": {
                click: this.onButtonClickAttach
            },
            "volumes button#detach": {
                click: this.onButtonClickDetach
            },
        });
    },

    onRender: function(component, options) {
        role = Ext.util.Cookies.get('user_role');
        if (role != '系统管理员' && role != '部门管理员') {
            Ext.ComponentQuery.query('volumes button#add')[0].hide();
            Ext.ComponentQuery.query('volumes button#edit')[0].hide();
            Ext.ComponentQuery.query('volumes button#delete')[0].hide();
            Ext.ComponentQuery.query('volumes button#attach')[0].hide();
            Ext.ComponentQuery.query('volumes button#detach')[0].hide();
        }

        var usersStore = Ext.getStore('security.Users');
        usersStore.load();

        var task = {
            run: function() {
                component.getStore().each(function(r) {
                    //刷新volume的状态信息
                    if (r.raw.status=='creating' || r.raw.status=='deleting' 
                     || r.raw.status=='attaching' || r.raw.status=='detaching') {
                        url = API_URL + '/volumes' + '/' + r.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'GET',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                ret = CloudApp.util.Util.decodeJSON(conn.responseText);
                                r.data.status = ret.volume.status;
                                r.raw.status = ret.volume.status;
                                r.dirty = true;
                            },
                            failure: function(conn, response, options, eOpts) {
                                if (conn.status == 404) {
                                    //volume被删除
                                    component.getStore().load();
                                }
                            }
                        });
                    }
                });
                component.view.refresh();
                component.fireEvent('select', component);
            },
            interval: 1000
        }
        Ext.TaskManager.start(task);
    },

    onActivate: function(component, eOpts) {
        store = component.down('#volumeslist').getStore();
        CloudApp.util.Util.addToken(store);
        store.load();
    },

    onSelect: function(component, record, index, eOpts) {
        if (!record) {
            record = component.getSelectionModel().getSelection()[0];
            if (!record)
                return;
            record = component.getStore().getById(record.get('id'));
        }

        var status = record.get('status');
        var btn1 = Ext.ComponentQuery.query('volumes button#attach')[0];
        var btn2 = Ext.ComponentQuery.query('volumes button#detach')[0];

        switch (status) {
            case 'error':
            case 'building':
                btn1.disable();
                btn2.disable();
                break;
            case 'available':
                btn1.enable();
                btn2.disable();
                break;
            case 'in-use':
                btn1.disable();
                btn2.enable();
        }
    },

    onButtonClickAdd: function (button, e, options) {
        var win = Ext.create('CloudApp.view.cloud.VolumeCreate');
        win.setTitle('创建云硬盘');
        win.show();
    },

    onButtonClickEdit: function (button, e, options) {
        role = Ext.util.Cookies.get('user_role');
        if (role != '系统管理员' && role != '部门管理员')
            return;

        var grid = this.getVolumesList();
        var record = grid.getSelectionModel().getSelection();

        if(record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            var editWindow = Ext.create('CloudApp.view.cloud.VolumeEdit');
            editWindow.down('form').loadRecord(data);

            var fault = editWindow.down('#fault');
            var button = editWindow.down('#save');
            var name_field = editWindow.down('#name');
            var owner_field = editWindow.down('#owner');

            if (!data.raw.fault) {
                fault.hide();
                button.enable();
                name_field.enable();
                owner_field.enable();
            } else {
                fault.show();
                button.disable();
                name_field.disable();
                owner_field.disable();
            }

            if (owner_field.getValue() == 0)
                owner_field.setValue('');

            editWindow.setTitle(data.get('name'));
            editWindow.show();
        }
    },

    onButtonClickDelete: function (button, e, options) {
        var grid = this.getVolumesList();
        var record = grid.getSelectionModel().getSelection();
        store = grid.getStore();

        if (record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            Ext.Msg.show({
                 title:'删除',
                 msg: '是否确定删除云硬盘"' + data.get('name') +'"?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        url = API_URL + '/volumes' + '/' + data.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'DELETE',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                CloudApp.util.Alert.msg('信息', '正在执行删除云硬盘操作。');
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
        store = this.getVolumesList().getStore();

        if (formPanel.getForm().isValid()) {
            url = API_URL + '/volumes';
            var values = formPanel.getValues();

            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                method: 'POST',
                params: {
                    name: values.name,
                    size: values.size,
                },
                success:  function(conn, response, options, eOpts) {
                    CloudApp.util.Alert.msg('信息', '正在创建云硬盘。');
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

    onButtonClickEditSave: function(button, e, options) {
        var win = button.up('window'),
        formPanel = win.down('form'),
        store = this.getVolumesList().getStore();

        if (formPanel.getForm().isValid()) {
            var values = formPanel.getValues();
            url = API_URL + '/volumes/' + values.id;

            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                method: 'POST',
                params: {
                    name: values.name,
                    owner: values.owner,
                },
                success:  function(conn, response, options, eOpts) {
                    CloudApp.util.Alert.msg('信息', '正在保存云硬盘配置。');
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

    onButtonClickEditCancel: function(button, e, options) {
        button.up('window').close();
    },

    onButtonClickAttach: function(button, e, options) {

    },

    onButtonClickDetach: function(button, e, options) {
        var grid = this.getVolumesList();
        var record = grid.getSelectionModel().getSelection();
        store = grid.getStore();

        if (record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            Ext.Msg.show({
                 title: '卸载',
                 msg: '是否确定卸载云硬盘"' + data.get('name') + '"?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        url = API_URL + '/volumes' + '/' + data.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'POST',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            params: {
                                action: 'detach',
                            },
                            success: function(conn, response, options, eOpts) {
                                CloudApp.util.Alert.msg('信息', '正在卸载云硬盘。');
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
});
