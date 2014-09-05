Ext.define('CloudApp.store.cloud.Images', {
    extend: 'Ext.data.Store',
    requires: [ 
        'CloudApp.model.cloud.Image' 
    ],
    model: 'CloudApp.model.cloud.Image',
    storeId: 'images',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/images',
        reader: {
            type: 'json',
            root: 'images'
        }
    },
});
