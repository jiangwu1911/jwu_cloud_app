Ext.define('CloudApp.store.cloud.Snapshots', {
    extend: 'Ext.data.Store',
    requires: [ 
        'CloudApp.model.cloud.Snapshot' 
    ],
    model: 'CloudApp.model.cloud.Snapshot',
    storeId: 'snapshots',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/snapshots',
        reader: {
            type: 'json',
            root: 'snapshots'
        }
    },
});
