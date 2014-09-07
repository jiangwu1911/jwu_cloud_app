Ext.define('CloudApp.view.cloud.ServersList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.serverslist',

    frame: true,
    store: Ext.create('CloudApp.store.cloud.Servers'),

    columns: [
        {
            width: 150,
            dataIndex: 'name',
            flex: 1,
            text: '主机名'
        },
        {
            width: 250,
            dataIndex: 'sysinfo',
            text: '配置',
            renderer: function(value, meta, record) {
                value = '虚拟内核: ' + record.raw.vcpus + ', '
                      + '内存: ' +  record.raw.ram + 'MB, <br> '
                      + '根硬盘: ' + record.raw.disk + 'GB, '
                      + '临时硬盘: ' + record.raw.ephemeral + 'GB, <br> '
                      + '交换空间: ' + record.raw.swap + 'MB';
                return value;
            } 
        },
        {
            width: 80,
            dataIndex: 'ip',
            text: 'IP地址'
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
            dataIndex: 'state',
            text: '状态'
        },
        {
            width: 100,
            dataIndex: 'task_state',
            text: '任务'
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
