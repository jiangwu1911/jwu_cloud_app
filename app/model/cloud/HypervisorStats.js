Ext.define('CloudApp.model.cloud.HypervisorStats', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'vcpus' },
        { name: 'vcpus_used' },
        { name: 'memory_mb' },
        { name: 'memory_mb_used' },
        { name: 'free_ram_mb' },
        { name: 'local_gb' },
        { name: 'local_gb_used' },
        { name: 'free_disk_gb' },
    ]
});
