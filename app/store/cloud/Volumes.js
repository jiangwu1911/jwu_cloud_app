Ext.define('CloudApp.store.cloud.Volumes', {
    extend: 'Ext.data.Store',
    requires: [ 
        'CloudApp.model.cloud.Volume' 
    ],
    model: 'CloudApp.model.cloud.Volume',
    storeId: 'volumes',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/volumes',
        reader: {
            type: 'json',
            root: 'volumes'
        }
    },
});
