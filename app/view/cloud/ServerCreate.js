Ext.define('CloudApp.view.cloud.ServerCreate', {
    extend: 'Ext.window.Window',
    alias: 'widget.servercreate',

    height: 260,
    width: 550,
    modal: true,

    requires: ['CloudApp.util.Util'],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: '创建云主机',

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
                    title: '创建云主机',
                    defaults: {
                        afterLabelTextTpl: CloudApp.util.Util.required,
                        anchor: '100%',
                        xtype: 'textfield',
                        allowBlank: false,
                        labelWidth: 100
                    },
                    items: [
                        {
                            fieldLabel: '主机名',
                            maxLength: 100,
                            name: 'name'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '镜像',
                            name: 'image',
                            displayField: 'name',
                            valueField: 'name',
                            queryMode: 'local',
                            store: 'cloud.Images',
                            editable: false,
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '主机类型',
                            name: 'flavor',
                            displayField: 'name',
                            valueField: 'name',
                            queryMode: 'local',
                            store: 'cloud.Flavors',
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
