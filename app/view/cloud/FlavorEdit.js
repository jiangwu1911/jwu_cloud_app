Ext.define('CloudApp.view.cloud.FlavorEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.flavoredit',

    height: 260,
    width: 550,
    modal: true,

    requires: ['CloudApp.util.Util'],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: '云主机类型',

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
                    title: '云主机类型',
                    defaults: {
                        afterLabelTextTpl: CloudApp.util.Util.required,
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
                            fieldLabel: '名称',
                            maxLength: 100,
                            name: 'name'
                        },
                        {
                            xtype : 'numberfield',
                            fieldLabel: '虚拟内核个数',
                            maxLength: 100,
                            name: 'vcpus'
                        },
                        {
                            xtype : 'numberfield',
                            fieldLabel: '内存(MB)',
                            maxLength: 100,
                            name: 'ram'
                        },
                        {
                            xtype : 'numberfield',
                            fieldLabel: '根磁盘(GB)',
                            maxLength: 100,
                            name: 'disk'
                        },
                        {
                            xtype : 'numberfield',
                            fieldLabel: '临时磁盘(GB)',
                            maxLength: 100,
                            name: 'ephemeral',
                            value: 0
                        },
                        {
                            xtype : 'numberfield',
                            fieldLabel: '交换空间(GB)',
                            maxLength: 100,
                            name: 'swap',
                            value: 0
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
