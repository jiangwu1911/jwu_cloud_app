Ext.define('CloudApp.view.cloud.MachinesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.machineslist',

    frame: true,
    store: 'cloud.MachinesList',

    columns: [
        {
            width: 150,
            dataIndex: 'hostname',
            flex: 1,
            text: '主机名'
        },
        {
            width: 150,
            dataIndex: 'state',
            text: '主机状态'
        },
        {
            width: 150,
            dataIndex: 'service',
            text: '服务'
        },
    ],
});
