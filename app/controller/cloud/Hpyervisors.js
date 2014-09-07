Ext.define('CloudApp.controller.cloud.Hypervisor', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.HypervisorsList',
    ],

    refs: [
        {
            ref: 'imageList',
            selector: 'imageslist'
        },
    ],

    init: function(application) {
        this.control({
            "hyperlist": {
                render: this.onRender,
            },
        });
    },

    onRender: function(component, options) {
        var hyperStatsStore = Ext.getStore('cloud.HypervisorStats');
        CloudApp.util.Util.addToken(hyperStatsStore);
        hyperStatsStore.load();

        var hyperListStore = Ext.getStore('cloud.HypervisorsList');
        CloudApp.util.Util.addToken(hyperListStore);
        hyperListStore.load();
    },
});
