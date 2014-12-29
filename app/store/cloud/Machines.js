Ext.define('CloudApp.store.cloud.Machines', {
    extend: 'Ext.data.Store',
    requires: [ 
        'CloudApp.model.cloud.Machine' 
    ],
    model: 'CloudApp.model.cloud.Machine',
    storeId: 'machines',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/hosts',
        reader: {
            type: 'json',
            root: 'hosts'
        }
    },
});
