Ext.define('CloudApp.view.cloud.HypervisorStatsPie', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.hypervisorstatspie',
    animate: true,
    store: 'cloud.HypervisorStats',
    shadow: true,
    width: 120,
    height: 120,
    theme: 'Base:gradients',
});
