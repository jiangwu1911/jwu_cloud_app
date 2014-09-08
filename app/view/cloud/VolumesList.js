Ext.define('CloudApp.view.cloud.VolumesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.volumeslist',

    frame: true,
    store: Ext.create('CloudApp.store.cloud.Volumes'),

    columns: [
        {
            width: 200,
            dataIndex: 'name',
            flex: 1,
            text: '云硬盘名称'
        },
        {
            width: 200,
            dataIndex: 'size',
            text: '大小(GB)'
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
            text: '分配给',
            renderer: function(value, metaData, record ){
                var usersStore = Ext.getStore('security.Users');
                var user = usersStore.findRecord('id', value);
                return user != null ? user.get('name') : '';
            }
        },
    ]
});
