Ext.define('CloudApp.view.cloud.SnapshotsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.snapshotslist',

    frame: true,
    store: 'cloud.Snapshots',

    columns: [
        {
            width: 200,
            dataIndex: 'name',
            flex: 1,
            text: '名称'
        },
        {
            width: 200,
            dataIndex: 'size',
            text: '大小(bytes)'
        },
        {
            width: 200,
            dataIndex: 'status',
            text: '状态'
        },
    ]
});
