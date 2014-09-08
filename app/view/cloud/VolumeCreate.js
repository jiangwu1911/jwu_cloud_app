Ext.define('CloudApp.view.cloud.VolumeCreate', {
    extend: 'Ext.window.Window',
    alias: 'widget.volumecreate',

    height: 150,
    width: 400,
    modal: true,

    requires: ['CloudApp.util.Util'],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: '创建云硬盘',

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
                    title: '创建云硬盘',
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
                            xtype: 'numberfield',
                            fieldLabel: '大小(GB)',
                            name: 'size',
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
