Ext.define('CloudApp.store.cloud.HypervisorStats', {
    extend: 'Ext.data.Store',
    requires: [ 
        'CloudApp.model.cloud.HypervisorStats' 
    ],
    model: 'CloudApp.model.cloud.HypervisorStats',
    storeId: 'hypervisorstats',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/hypervisors',
        extraParams: { action: 'stats' },
        reader: {
            type: 'json',
            root: 'hypervisor_stats'
        }
    },
});
