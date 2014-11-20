Ext.define('CloudApp.view.cloud.MachinesMonitor', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.machinesmonitor',

    layout: {
        type: 'fit'
    },
    
    dockedItems: [{
        xtype: 'toolbar',
        flex: 1,
        dock: 'top',
        items: [
            {
                xtype: 'button',
                text: '30分钟',
                itemId: 'view_30m',
            },
            {
                xtype: 'button',
                text: '6小时',
                itemId: 'view_6h',
            },
            {
                xtype: 'button',
                text: '1天',
                itemId: 'view_1d',
            },
            {
                xtype: 'button',
                text: '1周',
                itemId: 'view_1w',
            },
        ]
    }],

    items:[
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
});
