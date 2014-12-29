Ext.define('CloudApp.view.cloud.Machines', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.machines',

    requires: [
        'CloudApp.view.cloud.MachinesList'
    ],

    layout: {
        type: 'fit'
    },
    
    items: [
        {
            xtype: 'machineslist',
            itemId: 'machineslist',
            title: '服务器列表',
            emptyText: '没有服务器',
            flex: 1,
            hideGroup: true,
        },
    ]
});
