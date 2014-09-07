Ext.define('CloudApp.model.cloud.HypervisorStats', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'name' },
        { name: 'memory' },
        { name: 'vcpus' },
        { name: 'disk' },
    ]
});
