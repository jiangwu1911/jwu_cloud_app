Ext.define('CloudApp.view.cloud.MachinesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.machineslist',

    frame: true,
    store: 'cloud.Machines',

    columns: [
        {
            width: 230,
            dataIndex: 'hostname',
            flex: 1,
            text: '主机名'
        },
        {
            width: 70,
            dataIndex: 'state',
            text: '主机状态'
        },
        {
            width: 200,
            dataIndex: 'service',
            text: '服务'
        },
    ],
});
