Ext.define('CloudApp.store.monitor.CpuStats', {
    extend: 'Ext.data.Store',
    model: 'CloudApp.model.monitor.CpuPoint',
    storeId: 'cpustats',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: API_URL + '/monitor/cpu',
        reader: {
            type: 'json',
            root: 'cpustats'
        }
    },
});
