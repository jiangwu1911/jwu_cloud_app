Ext.define('CloudApp.view.cloud.HypervisorsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.hypervisorslist',

    frame: true,
    store: Ext.create('CloudApp.store.cloud.HypervisorsList'),

    columns: [
        {
            width: 150,
            dataIndex: 'name',
            flex: 1,
            text: '主机名'
        },
        {
            width: 150,
            dataIndex: 'hypervisor_type',
            text: '类型'
        },
    ],
});
