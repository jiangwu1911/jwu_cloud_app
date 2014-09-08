Ext.define('CloudApp.view.cloud.Hypervisors', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.hypervisors',

    requires: [
        'CloudApp.view.cloud.HypervisorsList'
    ],

    layout: {
        type: 'fit'
    },
    
    items: [
        {
            xtype: 'hypervisorslist',
            itemId: 'hypervisorslist',
            title: '服务器列表',
            emptyText: '没有服务器',
            flex: 1,
            hideGroup: true,
        },
    ],

    dockedItems: [{
        xtype: 'toolbar',
        flex: 1,
        dock: 'top',
        items: [
            {
                xtype: 'hypervisorstatspie',
                itemId: 'vcpus_pie',
                store: 'cloud.HypervisorStats',
                series: [{
                    type: 'pie',
                    field: 'vcpus',
                    showInLegend: true,
                    colorSet: ['#0000FF', '#EFEFEF'],
                    label: {
                        field: 'name',
                        display: 'rotate',
                        contrast: true,
                        font: '12px Arial'
                    }
                }],
            },
            {
                xtype: 'displayfield',
                itemId: 'vcpus_pie_label',
            },
            {
                xtype: 'hypervisorstatspie',
                itemId: 'memory_pie',
                series: [{
                    type: 'pie',
                    field: 'memory',
                    showInLegend: true,
                    colorSet: ['#0000FF', '#EFEFEF'],
                    label: {
                        field: 'name',
                        display: 'rotate',
                        contrast: true,
                        font: '12px Arial'
                    }
                }],
            },
            {
                xtype: 'displayfield',
                itemId: 'memory_pie_label',
            },
            {
                xtype: 'hypervisorstatspie',
                itemId: 'disk_pie',
                series: [{
                    type: 'pie',
                    field: 'disk',
                    showInLegend: true,
                    colorSet: ['#0000FF', '#EFEFEF'],
                    label: {
                        field: 'name',
                        display: 'rotate',
                        contrast: true,
                        font: '12px Arial'
                    }
                }],
            },
            {
                xtype: 'displayfield',
                itemId: 'disk_pie_label',
            },
        ]
    }]
});
