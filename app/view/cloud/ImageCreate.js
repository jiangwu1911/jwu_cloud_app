Ext.define('CloudApp.view.cloud.ImageCreate', {
    extend: 'Ext.window.Window',
    alias: 'widget.imagecreate',

    height: 150,
    width: 400,
    modal: true,

    requires: ['CloudApp.util.Util'],

    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: '创建镜像',

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
                    title: '创建镜像',
                    defaults: {
                        afterLabelTextTpl: CloudApp.util.Util.required,
                        anchor: '100%',
                        xtype: 'textfield',
                        allowBlank: false,
                        labelWidth: 100
                    },
                    items: [
                        {
                            fieldLabel: '名称',
                            maxLength: 100,
                            name: 'name',
                            itemId: 'name',
                        },
                        {
                            xtype: 'filefield',
                            fieldLabel: '镜像文件',
                            name: 'imagefile',
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
