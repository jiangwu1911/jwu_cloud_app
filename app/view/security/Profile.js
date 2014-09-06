Ext.define('CloudApp.view.security.Profile', {
    extend: 'Ext.window.Window',
    alias: 'widget.profile',

    height: 260,
    width: 550,

    requires: ['CloudApp.util.Util'],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'User',

    items: [
        {
            xtype: 'form',
            bodyPadding: 5,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldset',
                    flex: 2,
                    title: '用户信息',
                    defaults: {
                        afterLabelTextTpl: CloudApp.util.Util.required,
                        anchor: '100%',
                        xtype: 'textfield',
                        allowBlank: false,
                        labelWidth: 60
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            fieldLabel: 'Label',
                            name: 'id',
                        },
                        {
                            fieldLabel: '姓名',
                            maxLength: 100,
                            name: 'name'
                        },
                        {
                            fieldLabel: '电子邮件',
                            maxLength: 100,
                            allowBlank: true,
                            afterLabelTextTpl: '',
                            name: 'email'
                        },
                        {
                            fieldLabel: '密码',
                            name: 'password',
                            maxLength: 50,
                            inputType: 'password'
                        },
                        {
                            fieldLabel: '重复密码',
                            name: 'password_again',
                            itemId: 'password_again',
                            maxLength: 50,
                            inputType: 'password'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '所属部门',
                            name: 'dept_id',
                            displayField: 'name',
                            valueField: 'id',
                            queryMode: 'local',
                            store: 'security.Depts',
                            editable: false,
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '角色权限',
                            name: 'role_id',
                            displayField: 'name',
                            valueField: 'id',
                            queryMode: 'local',
                            store: 'security.Roles',
                            editable: false,
                        },
                    ]
                },
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            ui: 'footer',
            layout: {
                pack: 'end',
                type: 'hbox'
            },
            items: [
                {
                    xtype: 'button',
                    text: '取消',
                    itemId: 'cancel',
                    iconCls: 'cancel'
                },
                {
                    xtype: 'button',
                    text: '确定',
                    itemId: 'save',
                    iconCls: 'save'
                }
            ]
        }
    ]
});
