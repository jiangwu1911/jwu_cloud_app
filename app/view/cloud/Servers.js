Ext.define('CloudApp.view.cloud.Servers', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.servers',

    requires: [
        'CloudApp.view.cloud.ServersList'
    ],

    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'serverslist',
            itemId: 'serverslist',
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
