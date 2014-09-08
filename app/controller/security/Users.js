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
            "users": {
                activate: this.onActivate,
            },
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

        if (!Ext.getStore('security.Depts')) {
            Ext.create('CloudApp.store.security.Depts');
        }    
    },

    onRender: function(component, options) {
    },

    onActivate: function(component, eOpts) {
        //每次显示时刷新，以便及时得到user的状态
        var serversStore = Ext.getStore('cloud.Servers');
        serversStore.load();

        var store = component.down('#alluserslist').getStore();
        CloudApp.util.Util.addToken(store);
        store.load();
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
            // record[0]里的数据是未更新的数据，可能是extjs的bug
            // 只好从store里重新读取一遍            
            data = grid.getStore().getById(record[0].get('id'));

            var editWindow = Ext.create('CloudApp.view.security.Profile');
            editWindow.down('form').loadRecord(data);

            var field = editWindow.down('#password_again');
            field.setValue(data.get('password'));

            editWindow.setTitle(data.get('name'));
            editWindow.show();
        }
    },

    onButtonClickDelete: function (button, e, options) {
        var grid = this.getAllUsersList();
        var record = grid.getSelectionModel().getSelection();
        store = grid.getStore();

        if (record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            Ext.Msg.show({
                 title:'删除',
                 msg: '是否确定删除用户"' + data.get('name') +'"?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        url = API_URL + '/users' + '/' + data.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'DELETE',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                CloudApp.util.Alert.msg('信息', '成功删除用户。');
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

            var encrypted_password = values.password;
            record = formPanel.getRecord();
            if (record) {
                if (record.raw.password != encrypted_password) {
                    // 用户修改过密码
                    encrypted_password = CloudApp.util.MD5.encode(values.password);
                }
            } else {
                encrypted_password = CloudApp.util.MD5.encode(values.password);
            }

            if (values.id > 0) {
                url = url + '/' + values.id;
            }
           
            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                method: 'POST',
                params: {
                    id: values.id,
                    username: values.name,
                    email: values.email,
                    password: encrypted_password,
                    dept_id: values.dept_id,
                    role_id: values.role_id,
                },
                success:  function(conn, response, options, eOpts) {
                    CloudApp.util.Alert.msg('信息', '用户已保存。');
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
