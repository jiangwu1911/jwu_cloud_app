Ext.define('CloudApp.view.cloud.HypervisorStatsPie', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.hypervisorstatspie',

    animate: true,
    store: 'cloud.HypervisorStats',
    shadow: true,
    legend: {
        position: 'right'
    },
    insetPadding: 60,
    theme: 'Base:gradients',
    series: [{
        type: 'pie',
        field: 'memory_mb',
        showInLegend: true,
        tips: {
              trackMouse: true,
              width: 140,
              height: 28,
              renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('memory_mb_used'));
              }
        },
        highlight: {
          segment: {
            margin: 20
          }
        },
        label: {
            field: 'category',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }
    }]
});
