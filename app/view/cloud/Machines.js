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
    ],

    dockedItems: [{
        xtype: 'toolbar',
        flex: 1,
        dock: 'right',
        items: [
            {
                xtype: 'displayfield',
                itemId: 'cpuchart_label',
                value: 'CPU负载',
            },
            {
                xtype: 'cpuchart',
                itemId: 'cpuchart',
                width: 260,
                height: 180,
                store: 'monitor.CpuStats',
                theme: 'Green',
                axes: [
                    { type: 'Numeric',
                      position: 'left',
                      fields: ['value'],
                      minimum: 0,
                      maximum:100,
                      grid: true,
                    },
                    { type: 'Time',
                      position: 'bottom',
                      fields: ['date'],
                      dateFormat: 'H:i',
                      fromDate: new Date()-1800000,
                      toDate: new Date(),
                    }
                ],
                series: [
                    { type: 'line',
                      xField: 'date',
                      yField: 'value',
                      markerConfig: {
                        type: 'cross',
                        size: 0,
                        radius: 0,
                        'stroke-width': 0
                      }
                    }
                ]    
            },
        ]
    }]
});
