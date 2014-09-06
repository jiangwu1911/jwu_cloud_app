Ext.define('CloudApp.controller.security.Users', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'security.Users',
        'security.AllUsersList',
        'security.Profile'
    ],

    stores: [
        'security.Depts'
    ],

    refs: [
        {
            ref: 'allUsersList',
            selector: 'alluserslist'
        },
    ],

    init: function(application) {
        this.control({
            "users #alluserslist": {
                render: this.onRender,
                itemdblclick: this.onButtonClickEdit
            },
            "users button#add": {
                click: this.onButtonClickAdd
            },
            "users button#edit": {
                click: this.onButtonClickEdit
            },
            "users button#delete": {
                click: this.onButtonClickDelete
            },
            "profile button#save": {
                click: this.onButtonClickSave
            },
            "profile button#cancel": {
                click: this.onButtonClickCancel
            },
        });

        if (!Ext.getStore('depts')) {
            Ext.create('CloudApp.store.security.Depts');
        }    
    },

    onRender: function(component, options) {
        CloudApp.util.Util.addToken(component.getStore());
        component.getStore().load();
    },

    onButtonClickAdd: function (button, e, options) {
        var win = Ext.create('CloudApp.view.security.Profile');
        win.setTitle('增加新用户');
        win.show();
    },

    onButtonClickEdit: function (button, e, options) {
        var grid = this.getAllUsersList();
        var record = grid.getSelectionModel().getSelection();

        if(record[0]) {
            var editWindow = Ext.create('CloudApp.view.security.Profile');
            editWindow.down('form').loadRecord(record[0]);

            var field = editWindow.down('#password_again');
            field.setValue(record[0].get('password'));

            editWindow.setTitle(record[0].get('name'));
            editWindow.show();
        }
    },

    onButtonClickDelete: function (button, e, options) {
        var grid = this.getAllUsersList();
        var record = grid.getSelectionModel().getSelection();
        var store = grid.getStore();

        if (record[0]) {
            Ext.Msg.show({
                 title:'删除',
                 msg: '是否确定删除用户"' + record[0].get('name') +'"?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        url = API_URL + '/users' + '/' + record[0].get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'DELETE',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                CloudApp.util.Alert.msg('成功', '成功删除用户。');
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
        store = this.getAllUsersList().getStore();

        if (formPanel.getForm().isValid()) {
            url = API_URL + '/users';
            var values = formPanel.getValues();

            if (values.password != values.password_again) {
                Ext.Msg.show({ title:'错误',
                               msg: '两次输入的密码不一致。',
                               icon: Ext.Msg.ERROR,
                               buttons: Ext.Msg.OK });
                return; 
            }

            record = formPanel.getRecord();
            var encrypted_password = values.password;
            if (record.raw.password != encrypted_password) {
                // 用户修改过密码
                encrypted_password = CloudApp.util.MD5.encode(values.password);
            }

            url = url + '/' + values.id;
           
            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                params: {
                    id: values.id,
                    username: values.name,
                    email: values.email,
                    password: encrypted_password,
                    dept_id: values.dept_id
                },
                success:  function(conn, response, options, eOpts) {
                    CloudApp.util.Alert.msg('成功', '用户已保存。');
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
