Ext.define('CloudApp.store.cloud.Flavors', {
    extend: 'Ext.data.Store',
    requires: [ 
        'CloudApp.model.cloud.Flavor' 
    ],
    model: 'CloudApp.model.cloud.Flavor',
    storeId: 'flavors',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/flavors',
        reader: {
            type: 'json',
            root: 'flavors'
        }
    },
});
