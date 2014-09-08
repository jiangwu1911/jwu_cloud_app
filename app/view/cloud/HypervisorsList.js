Ext.define('CloudApp.view.cloud.HypervisorsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.hypervisorslist',

    frame: true,
    store: 'cloud.HypervisorsList',

    columns: [
        {
            width: 150,
            dataIndex: 'hypervisor_hostname',
            flex: 1,
            text: '主机名'
        },
        {
            width: 150,
            dataIndex: 'host_ip',
            flex: 1,
            text: 'IP'
        },
        {
            width: 150,
            dataIndex: 'hypervisor_type',
            text: '类型'
        },
        {
            width: 150,
            dataIndex: 'vcpus',
            text: '虚拟内核',
            renderer: function(value, meta, record) {
                value = '虚拟内核: ' + record.get('vcpus') 
                      + '<br> -- 已使用: ' + record.get('vcpus_used');
                return value;
            }
        },
        {
            width: 150,
            dataIndex: 'memory',
            text: '内存',
            renderer: function(value, meta, record) {
                value = '内存: ' + record.get('memory_mb') + 'MB'
                      + '<br> -- 已使用: ' + record.get('memory_mb_used') + 'MB'
                      + '<br> -- 剩余: ' + record.get('free_ram_mb') + 'MB';
                return value;
            }
        },
        {
            width: 150,
            dataIndex: 'disk',
            text: '磁盘',
            renderer: function(value, meta, record) {
                value = '磁盘: ' + record.get('local_gb') + 'GB' 
                      + '<br> -- 已使用: ' + record.get('local_gb_used') + 'GB'
                      + '<br> -- 剩余: ' + record.get('free_disk_gb') + 'GB';
                return value;
            }
        },
        {
            width: 150,
            dataIndex: 'running_vms',
            text: '已运行的云主机个数'
        },
    ],
});
