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
            "machines #machineslist": {
                render: this.onRender,
            },
        });
    },

    refresh: function() {
        var grid = Ext.ComponentQuery.query('machines #machineslist')[0];
        CloudApp.util.Util.addToken(grid.getStore());
        grid.getStore().load();
    },

    onRender: function(component, options) {
        this.refresh();
    },

    onActivate: function(component, eOpts) {
        this.refresh();
    },        
});
