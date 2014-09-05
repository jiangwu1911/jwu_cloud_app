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
            text: '名称'
        },
        {
            width: 80,
            dataIndex: 'vcpus',
            text: '虚拟内核'
        },
        {
            width: 80,
            dataIndex: 'ram',
            text: '内存(MB)'
        },
        {
            width: 80,
            dataIndex: 'disk',
            text: '根磁盘(GB)'
        },
        {
            width: 80,
            dataIndex: 'ephemeral',
            text: '临时磁盘(GB)'
        },
        {
            width: 80,
            dataIndex: 'swap',
            text: '交换空间(MB)'
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
            renderer: function(value,meta,record) {     
                meta.attr = 'style="white-space:normal;"';   
                return value;  
            }  
        },
        {
            width: 80,
            dataIndex: 'state',
            text: '状态'
        },
    ]
});
