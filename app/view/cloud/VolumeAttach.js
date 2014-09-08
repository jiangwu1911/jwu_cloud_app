Ext.define('CloudApp.view.cloud.VolumeAttach', {
    extend: 'Ext.window.Window',
    alias: 'widget.volumeattach',

    height: 180,
    width: 460,
    modal: true,

    requires: ['CloudApp.util.Util'],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: '挂载云硬盘',

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
                    title: '挂载云硬盘',
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
                            xtype: 'displayfield',
                            fieldLabel: '云硬盘名称',
                            name: 'name',
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: '大小(GB)',
                            name: 'size',
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '挂载到',
                            name: 'server',
                            displayField: 'name',
                            valueField: 'id',
                            queryMode: 'local',
                            store: 'cloud.Servers',
                            editable: false,
                            allowBlank: true,
                            itemId: 'server',
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
