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
        'security.DeptsTree',
        'security.Depts',
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
                itemclick: this.onClickDept,
                show: this.onShow,
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
        ulist = this.getDeptsEdit().down('#deptuserslist');
        CloudApp.util.Util.addToken(ulist.getStore());
        plist = Ext.ComponentQuery.query('deptsedit #parent_list')[0];
        CloudApp.util.Util.addToken(plist.getStore());

        plist.getStore().load();
        ulist.getStore().load();
        component.getStore().load();
    },

    onShow: function(component, eOpts) {
        //component.getSelectionModel().select(0);
    },

    onClickDept: function (panel, record) {
        if (record) {
            var plist = Ext.ComponentQuery.query('deptsedit #parent_list')[0];
            var store = plist.getStore();
            var dept = store.findRecord('id', record.raw.id);

            this.getDeptsEdit().getForm().loadRecord(dept)
            this.getDeptsEdit().setDisabled(false);

            // 总部不允许有上级部门
            if (dept.raw.name == '总部') {
                plist.disable();
            } else {
                plist.enable();
            }

            // 显示正确的上级部门
            if (plist.findRecord('id', dept.raw.parent_id)) {
                plist.select(plist.findRecord('id', dept.raw.parent_id));
            } else {
                plist.clearValue();
            }

            this.getDeptsEdit().down('#deptuserslist').getStore().load({
                params: {
                    dept_id: dept.raw.id
                }
            });

        }
    },

    onButtonClickAdd: function (button, e, options) {
        var model = Ext.create('CloudApp.model.security.Dept', {
            id: 0,
            name: null
        });
        this.getDeptsEdit().getForm().loadRecord(model);
        this.getDeptsEdit().down('#deptuserslist').getStore().removeAll();
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

            plist = Ext.ComponentQuery.query('deptsedit #parent_list')[0];
            parent_id = plist.getValue();

            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                params: {
                    name: values.name,
                    desc: values.desc,
                    parent_id: parent_id
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
