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
            text: '快照名称'
        },
        {
            width: 200,
            dataIndex: 'size',
            text: '大小(bytes)'
        },
        {
            width: 150,
            dataIndex: 'created_at',
            text: '创建于',
            renderer: function(value, meta, record) {
                meta.attr = 'style="white-space:normal;"';
                return value;
            }
        },
        {
            width: 200,
            dataIndex: 'status',
            text: '状态'
        },
        {
            width: 100,
            dataIndex: 'owner',
            text: '属于',
            renderer: function(value, metaData, record) {
                var usersStore = Ext.getStore('security.Users');
                var user = usersStore.findRecord('id', value);
                return user != null ? user.get('name') : '';
            }
        },
    ]
});
