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
                },
                {
                    xtype: 'button',
                    text: '停止',
                    itemId: 'start_stop',
                    iconCls: 'stop'
                },
                {
                    xtype: 'button',
                    text: '暂停',
                    itemId: 'suspend_resume',
                    iconCls: 'suspend'
                },
                {
                    xtype: 'button',
                    text: '做快照',
                    itemId: 'snapshot',
                    iconCls: 'snapshot'
                },
                {
                    xtype: 'button',
                    text: '控制台',
                    itemId: 'console',
                    iconCls: 'console'
                },
            ]
        }
    ]
});
