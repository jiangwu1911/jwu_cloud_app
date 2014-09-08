Ext.define('CloudApp.view.cloud.VolumeEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.volumeedit',

    height: 300,
    width: 460,
    modal: true,

    requires: ['CloudApp.util.Util'],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: '编辑云硬盘',

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
                    title: '编辑云硬盘',
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
                            fieldLabel: '云硬盘名称',
                            maxLength: 100,
                            name: 'name',
                            itemId: 'name',
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '大小(GB)',
                            name: 'size',
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '创建于',
                            name: 'created_at',
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '状态',
                            name: 'status',
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
                            itemId: 'owner',
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
