Ext.define('CloudApp.controller.cloud.Machines', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'cloud.MachinesList',
        'cloud.MachinesMonitor',
    ],

    stores: [
        'cloud.Machines',
    ],

    refs: [
        {
            ref: 'MachinesList',
            selector: 'machineslist'
        },
        {
            ref: 'MachinesMonitor',
            selector: 'machinesmonitor'
        },
    ],

    init: function(application) {
        this.control({
            "machines": {
                activate: this.onActivate,
            },
            "machineslist": {
                render: this.onRender,
                itemclick: this.onClickMachine,
            },
            "machinesmonitor button#btn_30m": {
                click: this.onButtonClick
            },
            "machinesmonitor button#btn_6h": {
                click: this.onButtonClick
            },
            "machinesmonitor button#btn_1d": {
                click: this.onButtonClick
            },
            "machinesmonitor button#btn_1w": {
                click: this.onButtonClick
            },
        });
    },

    refresh: function() {
        var grid = Ext.ComponentQuery.query('machineslist')[0];
        CloudApp.util.Util.addToken(grid.getStore());
        grid.getStore().load();
    },

    draw_cpu_chart: function(hostname) { 
        var cpuchart = Ext.ComponentQuery.query('machinesmonitor #cpuchart')[0];
        CloudApp.util.Util.addToken(cpuchart.getStore());

        time_axe = cpuchart.axes.items[1];

        to_time = new Date();
        to_time = Math.ceil(to_time / 60000) * 60000;   //按分钟取整

        var time_range = Ext.util.Cookies.get('monitor_time_range');
        if (time_range == null) 
            time_range = '30分钟';
        
        if (time_range == '30分钟') {
            from_time = to_time - (30 * 60 * 1000);         //缺省30分钟
            interval = 10 * 1000;                           //缺省间隔10秒
            time_axe.dateFormat = 'H:i';
        }
        if (time_range == '6小时') {
            from_time = to_time - (6 * 60 * 60 * 1000)  
            interval = 120 * 1000;
            time_axe.dateFormat = 'H:i';
        }
        if (time_range == '1天') {
            from_time = to_time - (24 * 60 * 60 * 1000)  
            interval = 10 * 60 * 1000;
            time_axe.dateFormat = 'Y-m-d H:i';
        }
        if (time_range == '1周') {
            from_time = to_time - (7 * 24 * 60 * 60 * 1000)  
            interval = 60 * 60 * 1000;
            time_axe.dateFormat = 'Y-m-d H:i';
        }
        time_axe.fromDate = from_time;
        time_axe.toDate = to_time;
            
        cpuchart.getStore().load({
            params: {
                hostname: hostname,
                from_time: from_time,
                to_time: to_time,
                interval: interval,
            }
        });
    },

    onClickMachine: function (panel, record) {
        this.draw_cpu_chart(record.get('hostname'));
    },

    onRender: function(component, options) {
        this.refresh();
    },

    onActivate: function(component, eOpts) {
        this.refresh();
    },        

    onButtonClick: function(button, e, options) {
        Ext.util.Cookies.set('monitor_time_range', button.text);

        var grid = Ext.ComponentQuery.query('machineslist')[0];
        var record = grid.getSelectionModel().getSelection();
        if (record[0] != null) 
            this.draw_cpu_chart(record[0].get('hostname'));
    },
});
