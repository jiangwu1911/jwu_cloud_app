Ext.define('CloudApp.store.cloud.HypervisorsList', {
    extend: 'Ext.data.Store',
    requires: [ 
        'CloudApp.model.cloud.Hypervisor' 
    ],
    model: 'CloudApp.model.cloud.Hypervisor',
    storeId: 'hypervisorslist',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/hypervisors',
        reader: {
            type: 'json',
            root: 'hypervisors'
        }
    },
});
