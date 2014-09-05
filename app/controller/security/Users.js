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
        console.log(grid);
        var record = grid.getSelectionModel().getSelection();
        console.log(record);

        if(record[0]){
            var editWindow = Ext.create('CloudApp.view.security.Profile');
            editWindow.down('form').loadRecord(record[0]);
            editWindow.setTitle(record[0].get('name'));
            editWindow.show();
        }
    },

    onButtonClickDelete: function (button, e, options) {
        var grid = this.getAllUsersList();
        record = grid.getSelectionModel().getSelection(), 
        store = grid.getStore();

        if (store.getCount() >= 2 && record[0]){

            Ext.Msg.show({
                 title:'Delete?',
                 msg: 'Are you sure you want to delete?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        Ext.Ajax.request({
                            url: 'php/security/deleteUser.php',
                            params: {
                                id: record[0].get('id')
                            },
                            success: function(conn, response, options, eOpts) {

                                var result = CloudApp.util.Util.decodeJSON(conn.responseText);

                                if (result.success) {

                                    CloudApp.util.Alert.msg('Success!', 'User deleted.');
                                    store.load();
                                  
                                } else {
                                    CloudApp.util.Util.showErrorMsg(conn.responseText);
                                }
                            },
                            failure: function(conn, response, options, eOpts) {

                                CloudApp.util.Util.showErrorMsg(conn.responseText);
                            }
                        });
                    }
                 }
            });
        } else if (store.getCount() == 1) {
            Ext.Msg.show({
                title:'Warning',
                msg: 'You cannot delete all the users from the application.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
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
           
            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                params: {
                    username: values.username,
                    email: values.email,
                    password:  CloudApp.util.MD5.encode(values.password),
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
