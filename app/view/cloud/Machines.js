Ext.define('CloudApp.view.cloud.Machines', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.machines',

    requires: [
        'CloudApp.view.cloud.MachinesList',
        'CloudApp.view.cloud.MachinesMonitor'
    ],

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    
    items: [
        {
            xtype: 'machineslist',
            flex: 3
        },
        {
            xtype: 'machinesmonitor',
            flex: 2
        }
    ]
});
