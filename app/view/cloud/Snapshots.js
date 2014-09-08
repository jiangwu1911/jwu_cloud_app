Ext.define('CloudApp.view.cloud.Snapshots', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.snapshots',

    requires: [
        'CloudApp.view.cloud.SnapshotsList'
    ],

    layout: {
        type: 'fit'
    },

    items: [
        {
            xtype: 'snapshotslist',
            itemId: 'snapshotslist',
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
                    text: '删除',
                    itemId: 'delete',
                    iconCls: 'delete'
                }
            ]
        }
    ]
});
