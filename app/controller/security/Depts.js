Ext.define('CloudApp.controller.security.Depts', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'security.Depts',
        'security.DeptsList',
        'security.DeptsEdit'
    ],

    stores: [
        'security.Depts'
    ],

    refs: [
        {
            ref: 'deptsEdit',
            selector: 'deptsedit'
        },
        {
            ref: 'deptsList',
            selector: 'deptslist'
        }
    ],

    init: function(application) {
        this.control({
            "deptslist": {
                viewready: this.onViewReady,
                selectionchange: this.onSelectionChange
            },
            "deptslist button#add": {
                click: this.onButtonClickAdd
            },
            "deptslist button#delete": {
                click: this.onButtonClickDelete
            },
            "deptsedit button#save": {
                click: this.onButtonClickSave
            },
            "deptsedit button#cancel": {
                click: this.onButtonClickCancel
            }
        });
    },

    onViewReady: function(component, options) {
        component.getStore().load(function(records, operation, success) {
            if (records.length > 0){
                component.getSelectionModel().select(0);
            }
        });
    },

    onSelectionChange: function (sm, records, options) {
        if (records[0]) {
            this.getDeptsEdit().getForm().loadRecord(records[0]);
            this.getDeptsEdit().setDisabled(false);
        }
    },

    onButtonClickAdd: function (button, e, options) {
        var model = Ext.create('CloudApp.model.security.Dept', {
            id: 0,
            name: null
        });
        this.getDeptsEdit().getForm().loadRecord(model);
        this.getDeptsEdit().down('userslist').getStore().removeAll();
        this.getDeptsEdit().setDisabled(false);
    },

    onButtonClickDelete: function (button, e, options) {
        alert("delete");
    },

    onTreeLoad: function (component, node, records, successful, options) {
        node.cascadeBy(function(n){
            n.set('text', translations[n.get('text')]);
        });
    },

    onButtonClickSave: function (button, e, options) {
        var store = this.getDeptsList().getStore(),
        formPanel = button.up('form');

        if (formPanel.getForm().isValid()) {
            var values = formPanel.getValues();
            Ext.get(formPanel.getEl()).mask("正在保存部门信息...", "保存");

            Ext.Ajax.request({
                url: API_URL + '/depts/' + values.id,
                headers: { 'X-Auth-Token': sessionStorage.getItem('user_token') },
                params: {
                    name: values.name,
                    desc: values.desc
                },
                success: function(conn, response, options, eOpts) {
                    Ext.get(formPanel.getEl()).unmask();
                    CloudApp.util.Alert.msg('成功', '部门信息已保存。');
                    store.load();
                },
                failure: function(conn, response, options, eOpts) {
                    Ext.get(formPanel.getEl()).unmask();
                    CloudApp.util.Util.showErrorMsg(conn.responseText);
                }
            });
        }
    },

    onButtonClickCancel: function(button, e, options) {
        alert("cancel");
    },
});
