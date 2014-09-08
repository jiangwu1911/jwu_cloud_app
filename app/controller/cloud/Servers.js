Ext.define('CloudApp.controller.cloud.Servers', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.Servers',
        'cloud.ServersList',
        'cloud.ServerCreate',
        'cloud.ServerEdit',
        'cloud.Console',
    ],

    stores: [
        'cloud.Servers'
    ],

    refs: [
        {
            ref: 'serversList',
            selector: 'serverslist'
        },
    ],

    init: function(application) {
        this.control({
            "servers": {
                activate: this.onActivate,
            }, 
            "servers #serverslist": {
                render: this.onRender,
                select: this.onSelect,
                itemdblclick: this.onButtonClickEdit
            },
            "servers button#add": {
                click: this.onButtonClickAdd
            },
            "servers button#edit": {
                click: this.onButtonClickEdit
            },
            "servers button#delete": {
                click: this.onButtonClickDelete
            },
            "servers button#start_stop": {
                click: this.onButtonClickStartStop
            },
            "servers button#suspend_resume": {
                click: this.onButtonClickSuspendResume
            },
            "servers button#console": {
                click: this.onButtonClickConsole
            },
            "serveredit button#save": {
                click: this.onButtonClickEditSave
            },
            "serveredit button#cancel": {
                click: this.onButtonClickEditCancel
            },
            "servercreate button#save": {
                click: this.onButtonClickSave
            },
            "servercreate button#cancel": {
                click: this.onButtonClickCancel
            },

        });
    },

    onRender: function(component, options) {
        role = Ext.util.Cookies.get('user_role');
        if (role != '系统管理员' && role != '部门管理员') {
            Ext.ComponentQuery.query('servers button#add')[0].hide();
            Ext.ComponentQuery.query('servers button#edit')[0].hide();
            Ext.ComponentQuery.query('servers button#delete')[0].hide();
        }

        var imagesStore = Ext.getStore('cloud.Images');
        CloudApp.util.Util.addToken(imagesStore);
        imagesStore.load();

        var flavorsStore = Ext.getStore('cloud.Flavors');
        CloudApp.util.Util.addToken(flavorsStore);
        flavorsStore.load();

        var usersStore = Ext.getStore('security.Users');
        CloudApp.util.Util.addToken(usersStore);
        usersStore.load();

        var task = { 
            run: function() {
                component.getStore().each(function(r) {
                    //刷新server的状态信息
                    //task_state不为空，说明有正在进行的任务
                    if (r.raw.state=='building' || (r.raw.task_state && r.raw.task_state!='')) {
                        url = API_URL + '/servers' + '/' + r.raw.id;
                        Ext.Ajax.request({
                            url: url,
                            method: 'GET',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                ret = CloudApp.util.Util.decodeJSON(conn.responseText);
                                r.data.state = ret.server.state;
                                r.data.task_state = ret.server.task_state;
                                r.data.ip = ret.server.ip;
                                r.raw.task_state = ret.server.task_state;
                                r.raw.state = ret.server.state;
                                r.dirty = true;
                            },
                            failure: function(conn, response, options, eOpts) {
                                if (conn.status == 404) {
                                    //server被删除
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
        //每次显示时刷新，以便及时得到server的状态
        store = component.down('#serverslist').getStore();
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

        var state = record.get('state');
        var btn1 = Ext.ComponentQuery.query('servers button#start_stop')[0];
        var btn2 = Ext.ComponentQuery.query('servers button#suspend_resume')[0];
        var btn3 = Ext.ComponentQuery.query('servers button#console')[0];

        switch (state) {
            case 'error':
                btn1.disable();
                btn2.disable();
                btn3.disable();
            case 'building':
                btn1.setIconCls('stop');
                btn1.setText('停止');
                btn1.disable();
                btn2.setIconCls('suspend');
                btn2.setText('暂停');
                btn2.disable();
                btn3.disable();
                break;
            case 'active':
                btn1.setIconCls('stop');
                btn1.setText('停止');
                btn1.enable();
                btn2.setIconCls('suspend');
                btn2.setText('暂停');
                btn2.enable();
                btn3.enable();
                break;
            case 'stopped': 
                btn1.setIconCls('start');
                btn1.setText('启动');
                btn1.enable();
                btn2.setIconCls('suspend');
                btn2.setText('暂停');
                btn2.disable();
                btn3.disable();
                break;
            case 'suspended':
                btn1.setIconCls('stop');
                btn1.setText('停止');
                btn1.disable();
                btn2.setIconCls('start');
                btn2.setText('恢复');
                btn2.enable();
                btn3.disable();
                break;
        }
    },

    onButtonClickAdd: function (button, e, options) {
        var win = Ext.create('CloudApp.view.cloud.ServerCreate');
        win.setTitle('创建云主机');
        win.show();
    },

    onButtonClickEdit: function (button, e, options) {
        role = Ext.util.Cookies.get('user_role');
        if (role != '系统管理员' && role != '部门管理员')
            return;

        var grid = this.getServersList();
        var record = grid.getSelectionModel().getSelection();

        if(record[0]) {
            // record[0]里的数据是未更新的数据，可能是extjs的bug
            // 只好从store里重新读取一遍
            data = grid.getStore().getById(record[0].get('id'));
        
            var editWindow = Ext.create('CloudApp.view.cloud.ServerEdit');
            editWindow.down('form').loadRecord(data);

            var sysinfo = editWindow.down('#sysinfo');
            sysinfo.setValue('虚拟内核: ' + data.raw.vcpus + ', '
                          + '内存: ' +  data.raw.ram + 'MB,'
                          + '根硬盘: ' + data.raw.disk + 'GB, <br>'
                          + '临时硬盘: ' + data.raw.ephemeral + 'GB,'
                          + '交换空间: ' + data.raw.swap + 'MB');

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
        var grid = this.getServersList();
        var record = grid.getSelectionModel().getSelection();
        store = grid.getStore();

        if (record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            Ext.Msg.show({
                 title:'删除',
                 msg: '是否确定删除云主机"' + data.get('name') +'"?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        url = API_URL + '/servers' + '/' + data.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'DELETE',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                CloudApp.util.Alert.msg('成功', '正在执行删除云主机操作。');
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

    onButtonClickStartStop: function (button, e, options) {
        var grid = this.getServersList();
        var record = grid.getSelectionModel().getSelection();
        store = grid.getStore();

        if (record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            if (button.getText() == '停止') {
                title = '停止';
                action = 'stop';
            } else {
                title = '启动';
                action = 'start';
            }

            Ext.Msg.show({
                 title: title,
                 msg: '是否确定' + title + '云主机"' + data.get('name') + '"?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        url = API_URL + '/servers' + '/' + data.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'POST',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            params: {
                                action: action,
                            },
                            success: function(conn, response, options, eOpts) {
                                CloudApp.util.Alert.msg('成功', '正在' + title + '云主机。');
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

    onButtonClickSuspendResume: function(button, e, options) {
        var grid = this.getServersList();
        var record = grid.getSelectionModel().getSelection();
        store = grid.getStore();

        if (record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            if (button.getText() == '暂停') {
                title = '暂停';
                action = 'suspend';
            } else {
                title = '恢复';
                action = 'resume';
            }

            Ext.Msg.show({
                 title: title,
                 msg: '是否确定' + title + '云主机"' + data.get('name') + '"?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        url = API_URL + '/servers' + '/' + data.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'POST',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            params: {
                                action: action,
                            },
                            success: function(conn, response, options, eOpts) {
                                CloudApp.util.Alert.msg('成功', '正在' + title + '云主机。');
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

    onButtonClickConsole: function(button, e, options) {
        var grid = this.getServersList();
        var record = grid.getSelectionModel().getSelection();
        store = grid.getStore();

        if (record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            url = API_URL + '/servers' + '/' + data.get('id');

            Ext.Ajax.request({
                url: url,
                method: 'POST',
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                params: {
                    action: 'get_console',
                    console_type: 'novnc'
                },
                success: function(conn, response, options, eOpts) {
                    ret = CloudApp.util.Util.decodeJSON(conn.responseText);
                    console_url = ret.console.url; 

                    if (console_url) {
                        var mainPanel = Ext.ComponentQuery.query('mainpanel')[0];
                        var newTab = mainPanel.items.findBy(
                            function(tab) {
                                return tab.title === data.get('name');
                            });

                        if (!newTab) {
                            newTab = mainPanel.add({
                                xtype: 'console',
                                closable: true,
                                iconCls: 'console',
                                title: data.get('name'),
                                html: "<iframe src='" + console_url + 
                                        "' scrolling='yes' frameborder=0 width=100% height=100%></iframe>"
                            });
                        }
                        mainPanel.setActiveTab(newTab);
                    }
                },
                failure: function(conn, response, options, eOpts) {
                    CloudApp.util.Util.showErrorMsg(conn.responseText);
                }
            });
        }
    },

    onButtonClickSave: function(button, e, options) {
        var win = button.up('window'),
        formPanel = win.down('form'),
        store = this.getServersList().getStore();

        if (formPanel.getForm().isValid()) {
            url = API_URL + '/servers';
            var values = formPanel.getValues();

            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                method: 'POST',
                params: {
                    server_name: values.name,
                    image_name: values.image,
                    flavor_name: values.flavor,
                },
                success:  function(conn, response, options, eOpts) {
                    CloudApp.util.Alert.msg('成功', '正在创建云主机。');
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
        role = Ext.util.Cookies.get('user_role');
        if (role != '系统管理员' && role != '部门管理员')
            return;

        var win = button.up('window'),
        formPanel = win.down('form'),
        store = this.getServersList().getStore();

        if (formPanel.getForm().isValid()) {
            var values = formPanel.getValues();
            url = API_URL + '/servers/' + values.id;

            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                method: 'POST',
                params: {
                    name: values.name,
                    owner: values.owner,
                },
                success:  function(conn, response, options, eOpts) {
                    CloudApp.util.Alert.msg('成功', '正在保存云主机配置。');
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
});
