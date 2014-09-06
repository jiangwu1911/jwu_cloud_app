Ext.define('CloudApp.view.cloud.ServerEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.serveredit',

    height: 320,
    width: 550,
    modal: true,

    requires: ['CloudApp.util.Util'],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: '编辑云主机',

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
                    title: '编辑云主机',
                    defaults: {
                        afterLabelTextTpl: '',
                        anchor: '100%',
                        xtype: 'textfield',
                        allowBlank: false,
                        labelWidth: 100
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            fieldLabel: 'Label',
                            name: 'id',
                        },
                        {
                            afterLabelTextTpl: CloudApp.util.Util.required,
                            fieldLabel: '主机名',
                            maxLength: 100,
                            name: 'name'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '镜像',
                            name: 'image',
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '配置',
                            name: 'sysinfo',
                            itemId: 'sysinfo',
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'IP地址',
                            name: 'ip',
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '创建于',
                            name: 'created_at',
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '状态',
                            name: 'state',
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '错误信息',
                            name: 'fault',
                            itemId: 'fault',
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '分配给',
                            name: 'owner',
                            displayField: 'name',
                            valueField: 'id',
                            queryMode: 'local',
                            store: 'security.Users',
                            editable: false,
                            allowBlank: true,
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
