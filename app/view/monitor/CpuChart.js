Ext.define('CloudApp.view.monitor.CpuChart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.cpuchart',
    animate: true,
    shadow: false,
    store: 'monitor.CpuStats',
    width: 400,
    height: 300,
});
