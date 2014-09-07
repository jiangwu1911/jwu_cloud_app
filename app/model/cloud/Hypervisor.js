Ext.define('CloudApp.model.cloud.Hypervisor', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    fields: [
        { name: 'id' },
        { name: 'hypervisor_hostname' },
        { name: 'host_ip' },
        { name: 'hypervisor_type' },
        { name: 'vcpus' },
        { name: 'vcpus_used' },
        { name: 'memory_mb' },
        { name: 'memory_mb_used' },
        { name: 'free_ram_mb' },
        { name: 'local_gb' },
        { name: 'local_gb_used' },
        { name: 'free_disk_gb' },
        { name: 'running_vms' },
    ]
});
