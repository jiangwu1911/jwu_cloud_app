Ext.define('CloudApp.controller.cloud.Images', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.Images',
        'cloud.ImagesList',
        'cloud.ImageCreate',
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
            "images #imageslist": {
                render: this.onRender,
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
        });
    },

    onRender: function(component, options) {
        CloudApp.util.Util.addToken(component.getStore());
        component.getStore().load();
    },

    onButtonClickAdd: function (button, e, options) {
        var win = Ext.create('CloudApp.view.cloud.ImageCreate');
        win.setTitle('创建镜像');
        win.show();
    },

    onButtonClickEdit: function (button, e, options) {
    },

    onButtonClickDelete: function (button, e, options) {
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
});
