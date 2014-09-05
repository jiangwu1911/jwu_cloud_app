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
        'security.Depts',
        'security.DeptsForParentList',
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
            'deptslist': {
                viewready: this.onViewReady,
                selectionchange: this.onSelectionChange,
            },
            'deptslist button#add': {
                click: this.onButtonClickAdd
            },
            'deptslist button#delete': {
                click: this.onButtonClickDelete
            },
            'deptsedit button#save': {
                click: this.onButtonClickSave
            },
            'deptsedit button#cancel': {
                click: this.onButtonClickCancel
            }
        });
    },

    onViewReady: function(component, options) {
        CloudApp.util.Util.addToken(component.getStore());
        plist = Ext.ComponentQuery.query('deptsedit #parent_list')[0];
        CloudApp.util.Util.addToken(plist.getStore());

        component.getStore().load(function(records, operation, success) {
            if (records.length > 0){
                component.getSelectionModel().select(0);
            }
        });
    },

    onSelectionChange: function (sm, records, options) {
        if (records[0]) {
            this.getDeptsEdit().getForm().loadRecord(records[0])
            this.getDeptsEdit().setDisabled(false);
            
            plist = Ext.ComponentQuery.query('deptsedit #parent_list')[0];
            // 下拉框中去掉自己
            store = plist.getStore();
            store.filterBy(function(r) {
                return r.id != records[0].id;
            });

            // 总部不允许有上级部门
            if (records[0].raw.name == '总部') {
                plist.disable();
            } else {
                plist.enable();
            }

            // 显示正确的上级部门
            if (plist.findRecord('id', records[0].data.parent_id)) {
                plist.select(plist.findRecord('id', records[0].data.parent_id));
            } else {
                plist.clearValue();
            }
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

    onButtonClickSave: function (button, e, options) {
        var store = this.getDeptsList().getStore(),
        formPanel = button.up('form');

        if (formPanel.getForm().isValid()) {
            var values = formPanel.getValues();
            Ext.get(formPanel.getEl()).mask("正在保存部门信息...", "保存");

            url = API_URL + '/depts';
            if (values.id > 0) {
                url = url + '/' + values.id;
            }

            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
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
