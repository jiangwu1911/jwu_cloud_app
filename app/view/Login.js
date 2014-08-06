Ext.define('CloudApp.view.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.login',

    autoShow: true,
    height: 170,
    width: 360,
    layout: {
        type: 'fit'
    },
    iconCls: 'key',
    title: '登录',
    closeAction: 'hide',
    closable: false,

    items: [
        {
            xtype: 'form',
            frame: false,
            bodyPadding: 15,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                labelWidth: 60,
                allowBlank: false,
                minLength: 1,
                msgTarget: 'under'
            },
            items: [
                {
                    name: 'user',
                    fieldLabel: '用户名',
                    maxLength: 25,
                    value: ''
                },
                {
                    inputType: 'password',
                    name: 'password',
                    fieldLabel: '密码',
                    enableKeyEvents: true,
                    id: 'password',
                    maxLength: 15,
                    value: '',
                    msgTarget: 'side'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            itemId: 'cancel',
                            iconCls: 'cancel',
                            text: '取消'
                        },
                        {
                            xtype: 'button',
                            itemId: 'submit',
                            formBind: true,
                            iconCls: 'key-go',
                            text: '提交'
                        }
                    ]
                }
            ]
        }
    ]
});
