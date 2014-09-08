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
                    text: '挂载',
                    itemId: 'attach',
                    iconCls: 'volume_attach'
                },
                {
                    xtype: 'button',
                    text: '卸载',
                    itemId: 'detach',
                    iconCls: 'volume_detach'
                }
            ]
        }
    ]
});
