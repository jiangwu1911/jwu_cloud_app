Ext.define('CloudApp.view.cloud.CpuChart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.cpuchart',
    animate: true,
    store: 'cloud.CpuStats',
    width: 400,
    height: 300
});
