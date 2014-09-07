Ext.define('CloudApp.controller.cloud.Hypervisors', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.HypervisorsList',
    ],

    stores: [
        'cloud.HypervisorsList',
    ],

    refs: [
        {
            ref: 'HypervisorsList',
            selector: 'hypervisorslist'
        },
    ],

    init: function(application) {
        this.control({
            "hypervisors #hypervisorslist": {
                render: this.onRender,
            },
        });
    },

    onRender: function(component, options) {
        CloudApp.util.Util.addToken(component.getStore());
        component.getStore().load();

        var vcpus_pie = Ext.ComponentQuery.query('hypervisors #vcpus_pie')[0];
        items = vcpus_pie.getStore().data.items;

        var label1 = Ext.ComponentQuery.query('hypervisors #vcpus_pie_label')[0];
        var label2 = Ext.ComponentQuery.query('hypervisors #memory_pie_label')[0];
        var label3 = Ext.ComponentQuery.query('hypervisors #disk_pie_label')[0];

        label1.setValue('虚拟内核: <br> -- 已使用:' + items[0].get('vcpus') 
                        + '<br> -- 空闲:' + items[1].get('vcpus'));
        label2.setValue('内存: <br> -- 已使用:' + items[0].get('memory') + 'MB' 
                        + '<br> -- 空闲:' + items[1].get('memory') + 'MB');
        label3.setValue('磁盘: <br> -- 已使用:' + items[0].get('disk') + 'GB'
                        + '<br> -- 空闲:' + items[1].get('disk') + 'GB');
    },
});