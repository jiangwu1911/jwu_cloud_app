Ext.define('CloudApp.view.cloud.FlavorsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.flavorslist',

    frame: true,
    store: Ext.create('CloudApp.store.cloud.Flavors'),

    columns: [
        {
            width: 150,
            dataIndex: 'name',
            flex: 1,
            text: '名称'
        },
        {
            width: 100,
            dataIndex: 'vcpus',
            text: '虚拟内核'
        },
        {
            width: 100,
            dataIndex: 'ram',
            text: '内存(MB)'
        },
        {
            width: 100,
            dataIndex: 'disk',
            text: '根磁盘(GB)'
        },
        {
            width: 100,
            dataIndex: 'ephemeral',
            text: '临时磁盘(GB)'
        },
        {
            width: 100,
            dataIndex: 'swap',
            text: '交换盘空间(MB)',
            renderer: function(value, metaData, record) {
                return value=='' ? 0 : value;
            }
        },
    ]
});
