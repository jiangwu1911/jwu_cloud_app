Ext.define('CloudApp.store.cloud.Servers', {
    extend: 'Ext.data.Store',
    requires: [ 
        'CloudApp.model.cloud.Server' 
    ],
    model: 'CloudApp.model.cloud.Server',
    storeId: 'servers',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/servers',
        reader: {
            type: 'json',
            root: 'servers'
        }
    },
});
