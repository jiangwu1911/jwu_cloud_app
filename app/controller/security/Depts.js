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
        this.onClickDept(0);
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
        var record = this.getDeptsList().getSelectionModel().getSelection();
        var store = this.getDeptsList().getStore();
        var form = this.getDeptsEdit();

        if (record[0]) {
            // record[0]里的数据是未更新的数据，可能是extjs的bug
            // 只好从store里重新读取一遍
            data = store.getById(record[0].get('id'));

            Ext.Msg.show({
                 title:'删除',
                 msg: '是否确定删除部门"' + data.get('text') + '"?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        url = API_URL + '/depts' + '/' + data.get('id');                        
                        Ext.Ajax.request({
                            url: url,
                            method: 'DELETE',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                CloudApp.util.Alert.msg('成功', '成功删除部门。');
                                store.load();
                                var plist = Ext.ComponentQuery.query('deptsedit #parent_list')[0];
                                plist.getStore().load();
                                form.getForm().reset();
                                form.down('#deptuserslist').getStore().removeAll();
                            },
                            failure:  function(conn, response, options, eOpts) {
                                CloudApp.util.Util.showErrorMsg(conn.responseText);
                            }
                        });
                    }
                }
            });
        }
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
                    var plist = Ext.ComponentQuery.query('deptsedit #parent_list')[0];
                    plist.getStore().load();

                },
                failure: function(conn, response, options, eOpts) {
                    Ext.get(formPanel.getEl()).unmask();
                    CloudApp.util.Util.showErrorMsg(conn.responseText);
                }
            });
        }
    },

    resetForm: function(){
        var form = this.getDeptsEdit();
        form.down('#deptuserslist').getStore().removeAll();
        form.getForm().reset();
    },

    onButtonClickCancel: function(button, e, options) {
        this.resetForm();
    },
});
