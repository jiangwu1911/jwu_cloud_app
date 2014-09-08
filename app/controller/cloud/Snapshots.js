Ext.define('CloudApp.controller.cloud.Snapshots', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.Snapshots',
        'cloud.SnapshotsList',
        'cloud.SnapshotEdit',
    ],

    stores: [
        'cloud.Snapshots'
    ],

    refs: [
        {
            ref: 'snapshotsList',
            selector: 'snapshotslist'
        },
    ],

    init: function(application) {
        this.control({
            "snapshots": {
                activate: this.onActivate,
            },
            "snapshots #snapshotslist": {
                render: this.onRender,
                itemdblclick: this.onButtonClickEdit
            },
            "snapshots button#edit": {
                click: this.onButtonClickEdit
            },
            "snapshots button#delete": {
                click: this.onButtonClickDelete
            },
            "snapshotedit button#save": {
                click: this.onButtonClickSave
            },
            "snapshotedit button#cancel": {
                click: this.onButtonClickCancel
            },
        });
    },

    refresh: function() {
        var grid = Ext.ComponentQuery.query('snapshots #snapshotslist')[0];
        grid.getStore().load();
    },

    onRender: function(component, options) {
        this.refresh();
        var task = {
            run: function() {
                component.getStore().each(function(r) {
                    if (r.raw.status!='active' && r.raw.status!='error') {
                        url = API_URL + '/snapshots' + '/' + r.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'GET',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                ret = CloudApp.util.Util.decodeJSON(conn.responseText);
                                r.data.status = ret.snapshot.status;
                                r.raw.status = ret.snapshot.status;
                                r.dirty = true;
                            },
                            failure: function(conn, response, options, eOpts) {
                                if (conn.status == 404) {
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
        this.refresh();
    },

    onButtonClickEdit: function (button, e, options) {
        var grid = this.getSnapshotsList();
        var record = grid.getSelectionModel().getSelection();

        if(record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            var editWindow = Ext.create('CloudApp.view.cloud.SnapshotEdit');
            editWindow.down('form').loadRecord(data);

            var fault = editWindow.down('#fault');
            var button = editWindow.down('#save');
            var name_field = editWindow.down('#name');
            var owner_field = editWindow.down('#owner');

            if (data.get('fault')) {
                fault.show();
                button.disable();
                name_field.disable();
                owner_field.disable();
            } else {
                fault.hide();
                button.enable();
                name_field.enable();
                if (data.get('status') == 'in-use') {
                    owner_field.disable();
                } else {
                    owner_field.enable();
                }
            }

            if (owner_field.getValue() == 0)
                owner_field.setValue('');

            editWindow.setTitle(data.get('name'));
            editWindow.show();
        } 
    },

    onButtonClickDelete: function (button, e, options) {
        var grid = this.getSnapshotsList();
        var record = grid.getSelectionModel().getSelection();
        store = grid.getStore();

        if (record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            Ext.Msg.show({
                 title:'删除',
                 msg: '是否确定删除快照"' + data.get('name') +'"?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        url = API_URL + '/snapshots' + '/' + data.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'DELETE',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                CloudApp.util.Alert.msg('信息', '正在执行删除快照操作。');
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
        store = this.getSnapshotsList().getStore();

        if (formPanel.getForm().isValid()) {
            var values = formPanel.getValues();
            url = API_URL + '/snapshots/' + values.id;

            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                method: 'POST',
                params: {
                    name: values.name,
                    owner: values.owner,
                },
                success:  function(conn, response, options, eOpts) {
                    CloudApp.util.Alert.msg('信息', '正在保存快照信息。');
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
