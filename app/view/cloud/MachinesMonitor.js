Ext.define('CloudApp.view.cloud.MachinesMonitor', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.machinesmonitor',

    requires: [
        'CloudApp.view.monitor.CpuChart',
    ],

    layout: {
        type: 'vbox',
        align: 'top',
    },
    
    dockedItems: [{
        xtype: 'toolbar',
        flex: 1,
        dock: 'top',
        items: [
            {
                xtype: 'button',
                text: '30分钟',
                itemId: 'btn_30m',
            },
            {
                xtype: 'button',
                text: '6小时',
                itemId: 'btn_6h',
            },
            {
                xtype: 'button',
                text: '1天',
                itemId: 'btn_1d',
            },
            {
                xtype: 'button',
                text: '1周',
                itemId: 'btn_1w',
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
            width: 300,
            height: 160,
            store: 'monitor.CpuStats',
            theme: 'Blue',
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
                  dateFormat: 'm-d H:i',
                  fromDate: new Date()-1800000,
                  toDate: new Date(),
                }
            ],
            series: [
                { type: 'line',
                  xField: 'date',
                  yField: 'value',
                  markerConfig: {
                    type: 'circle',
                    size: 0,
                    radius: 0,
                    'stroke-width': 0
                  }
                }
            ]    
        },
    ]
});
