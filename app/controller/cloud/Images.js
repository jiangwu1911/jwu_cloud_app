Ext.define('CloudApp.controller.cloud.Images', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.Images',
        'cloud.ImagesList',
        'cloud.ImageCreate',
        'cloud.ImageEdit',
    ],

    stores: [
        'cloud.Images'
    ],

    refs: [
        {
            ref: 'imagesList',
            selector: 'imageslist'
        },
    ],

    init: function(application) {
        this.control({
            "images": {
                activate: this.onActivate,
            },
            "images #imageslist": {
                render: this.onRender,
                itemdblclick: this.onButtonClickEdit
            },
            "images button#add": {
                click: this.onButtonClickAdd
            },
            "images button#edit": {
                click: this.onButtonClickEdit
            },
            "images button#delete": {
                click: this.onButtonClickDelete
            },
            "imagecreate button#save": {
                click: this.onButtonClickSave
            },
            "imagecreate button#cancel": {
                click: this.onButtonClickCancel
            },
            "imageedit button#save": {
                click: this.onButtonClickEditSave
            },
            "imageedit button#cancel": {
                click: this.onButtonClickEditCancel
            },
        });
    },

    onActivate: function(component, eOpts) {
        this.refresh();
    },

    refresh: function() {
        var grid = Ext.ComponentQuery.query('images #imageslist')[0];
        grid.getStore().load();
    },

    onRender: function(component, options) {
        this.refresh();
        var task = {
            run: function() {
                component.getStore().each(function(r) {
                    //刷新image的状态信息
                    if (r.raw.status!='active' && r.raw.status!='error') {
                        url = API_URL + '/images' + '/' + r.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'GET',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                ret = CloudApp.util.Util.decodeJSON(conn.responseText);
                                r.data.status = ret.image.status;
                                r.raw.status = ret.image.status;
                                r.data.size = ret.image.size;
                                r.dirty = true;
                            },
                            failure: function(conn, response, options, eOpts) {
                                if (conn.status == 404) {
                                    //image被删除
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

    onButtonClickAdd: function (button, e, options) {
        var win = Ext.create('CloudApp.view.cloud.ImageCreate');
        win.setTitle('创建镜像');
        win.show();
    },

    onButtonClickEdit: function (button, e, options) {
        var grid = this.getImagesList();
        var record = grid.getSelectionModel().getSelection();

        if(record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            var editWindow = Ext.create('CloudApp.view.cloud.ImageEdit');
            editWindow.down('form').loadRecord(data);

            var fault = editWindow.down('#fault');
            if (data.get('fault')) {
                fault.show();
            } else {
                fault.hide();
            }

            editWindow.setTitle(data.get('name'));
            editWindow.show();
        }
    },

    onButtonClickDelete: function (button, e, options) {
        var grid = this.getImagesList();
        var record = grid.getSelectionModel().getSelection();
        store = grid.getStore();

        if (record[0]) {
            data = grid.getStore().getById(record[0].get('id'));
            Ext.Msg.show({
                 title:'删除',
                 msg: '是否确定删除镜像"' + data.get('name') +'"?',
                 buttons: Ext.Msg.YESNO,
                 icon: Ext.Msg.QUESTION,
                 fn: function (buttonId){
                    if (buttonId == 'yes'){
                        url = API_URL + '/images' + '/' + data.get('id');
                        Ext.Ajax.request({
                            url: url,
                            method: 'DELETE',
                            headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                            success: function(conn, response, options, eOpts) {
                                CloudApp.util.Alert.msg('信息', '正在执行删除镜像操作。');
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
        store = this.getImagesList().getStore();

        if (formPanel.getForm().isValid()) {
            formPanel.getForm().submit({
                clientValidation: true,
                url: API_URL + '/images',
                mimetype: 'application/json',
                success:  function(form, action) {
                    CloudApp.util.Alert.msg('信息', '正在创建镜像。');
                    store.load();
                    win.close();
                },
                failure: function(form, action) {
                    //console.log(action);
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('错误', '表单参数错误');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('错误', 'Ajax通讯错误 ');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            //Ext.Msg.alert('错误', action.result.msg);
                            CloudApp.util.Util.showErrorMsg(action.result.msg);
                    }
                },
            });
        }
    },

    onButtonClickCancel: function(button, e, options) {
        button.up('window').close();
    },

    onButtonClickEditSave: function(button, e, options) {
        var win = button.up('window'),
        formPanel = win.down('form'),
        store = this.getImagesList().getStore();

        if (formPanel.getForm().isValid()) {
            var values = formPanel.getValues();
            url = API_URL + '/images/' + values.id;

            Ext.Ajax.request({
                url: url,
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                method: 'POST',
                params: {
                    name: values.name,
                    owner: values.owner,
                },
                success:  function(conn, response, options, eOpts) {
                    CloudApp.util.Alert.msg('信息', '正在保存镜像信息。');
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
