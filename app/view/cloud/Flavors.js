Ext.define('CloudApp.view.cloud.Flavors', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.flavors',

    requires: [
        'CloudApp.view.cloud.FlavorsList'
    ],

    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'flavorslist',
            itemId: 'flavorslist',
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
                    text: '新建',
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
