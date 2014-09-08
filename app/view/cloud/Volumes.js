Ext.define('CloudApp.view.cloud.Volumes', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.volumes',

    requires: [
        'CloudApp.view.cloud.VolumesList'
    ],

    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'volumeslist',
            itemId: 'volumeslist',
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
