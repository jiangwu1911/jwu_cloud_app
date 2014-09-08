Ext.define('CloudApp.view.cloud.VolumesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.volumeslist',

    frame: true,
    store: 'cloud.Volumes',

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
            width: 100,
            dataIndex: 'status',
            text: '状态'
        },
        {
            width: 150,
            dataIndex: 'attached_to',
            text: '挂载到云主机',
            renderer: function(value, metaData, record) {
                var serversStore = Ext.getStore('cloud.Servers');
                var server = serversStore.findRecord('id', value);
                return server != null? server.get('name') + ' (' + server.get('ip') + ')' : ''
            }
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
