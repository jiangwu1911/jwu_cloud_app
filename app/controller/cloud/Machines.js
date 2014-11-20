Ext.define('CloudApp.controller.cloud.Machines', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.MachinesList',
    ],

    stores: [
        'cloud.Machines',
    ],

    refs: [
        {
            ref: 'MachinesList',
            selector: 'machineslist'
        },
    ],

    init: function(application) {
        this.control({
            "machines": {
                activate: this.onActivate,
            },
            "machines machineslist": {
                render: this.onRender,
                itemclick: this.onClickMachine,
            },
        });
    },

    refresh: function() {
        var grid = Ext.ComponentQuery.query('machines machineslist')[0];
        CloudApp.util.Util.addToken(grid.getStore());
        grid.getStore().load();
    },

    draw_cpu_chart: function(hostname) { 
        var cpuchart = Ext.ComponentQuery.query('machines machinesmonitor #cpuchart')[0];
        CloudApp.util.Util.addToken(cpuchart.getStore());
        cpuchart.getStore().load({
            params: {
                hostname: hostname
            }
        });
    },

    onClickMachine: function (panel, record) {
        this.draw_cpu_chart(record.get('hostname'));
    },

    onRender: function(component, options) {
        this.refresh();
    },

    onActivate: function(component, eOpts) {
        this.refresh();
    },        
});
