Ext.define('CloudApp.view.cloud.Images', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.images',

    requires: [
        'CloudApp.view.cloud.ImagesList'
    ],

    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'imageslist',
            itemId: 'imageslist',
        },
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: '创建',
                    itemId: 'add',
                    iconCls: 'add'
                },
                {
                    xtype: 'button',
                    text: '编辑',
                    itemId: 'edit',
                    iconCls: 'edit'
                },
                {
                    xtype: 'button',
                    text: '删除',
                    itemId: 'delete',
                    iconCls: 'delete'
                }
            ]
        }
    ]
});
