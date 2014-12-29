Ext.define('CloudApp.view.monitor.PmCharts', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pmcharts',

    requires: [
        'CloudApp.view.monitor.CpuChart'
    ],

    layout: {
        type: 'fit'
    },
    
    dockedItems: [{
        xtype: 'toolbar',
        flex: 1,
        dock: 'top',
        items: [
            {
                xtype: 'cpuchart',
                itemId: 'm_cpuchart',
                width: 400,
                height: 300,
                store: cpustats
                axes: [
                    { title: '百分之',
                      type: 'Numeric',
                      position: 'left',
                      fields: ['value'],
                      minimum: 0,
                      maximum:100
                    },
                    { title: '时间',
                      type: 'Time',
                      position: 'bottom',
                      fields: ['date'],
                      dateFormat: 'ga'
                    }
                ]
            },
            {
                xtype: 'displayfield',
                itemId: 'vcpus_pie_label',
            },
        ]
    }]
});
