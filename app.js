/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

var API_URL = ''

Ext.application({
    name: 'CloudApp',

    requires: [
        'Ext.menu.Menu',
        'Ext.form.Panel',
        'Ext.layout.container.Accordion',
        'Ext.layout.container.Border',        
        'Ext.form.Label',
        'Ext.data.proxy.Ajax',
        'Ext.form.FieldSet',
        'Ext.form.field.Hidden',
        'Ext.form.field.ComboBox',
        'Ext.form.field.File',
        'Ext.grid.plugin.CellEditing',
        'Ext.ux.grid.FiltersFeature',
        'Ext.grid.column.Date',
        'Ext.grid.column.Action',
        'Ext.chart.series.Pie',
        'Ext.chart.series.Column',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.form.CheckboxGroup',
        'Ext.chart.axis.Time',
        'Ext.chart.series.Line',
        'Ext.util.Cookies',
        'CloudApp.util.Util',
        'CloudApp.store.security.Users',
        'CloudApp.store.security.Depts',
        'CloudApp.store.security.Roles',
        'CloudApp.store.cloud.Flavors',
        'CloudApp.store.cloud.Images',
        'CloudApp.store.cloud.Volumes',
        'CloudApp.store.cloud.Servers',
        'CloudApp.store.cloud.HypervisorsList',
        'CloudApp.store.cloud.HypervisorStats',
        'CloudApp.store.cloud.Snapshots',
        'CloudApp.store.cloud.Machines',
        'CloudApp.store.monitor.CpuStats',
    ],

    extend: 'CloudApp.Application',

    views: [
        'Main',
        'Viewport',
        'cloud.Flavors',
        'cloud.Images',
        'cloud.Snapshots',
        'cloud.Volumes',
        'cloud.Servers',
        'cloud.Hypervisors',
        'cloud.HypervisorStatsPie',
        'cloud.Machines',
        'cloud.Logs',
        'monitor.CpuChart',
    ],

    stores: [
        'security.Depts',
        'security.Users',
        'security.Roles',
        'security.DeptsTree',
        'cloud.Flavors',
        'cloud.Images',
        'cloud.Snapshots',
        'cloud.Volumes',
        'cloud.Servers',
        'cloud.HypervisorsList',
        'cloud.HypervisorStats',
        'cloud.Machines',
        'monitor.CpuStats',
    ],
 
    controllers: [
        'Main',
        'Login',
        'Menu',
        'security.Depts',
        'security.Users',
        'cloud.Flavors',
        'cloud.Images',
        'cloud.Snapshots',
        'cloud.Volumes',
        'cloud.Servers',
        'cloud.Hypervisors',
        'cloud.Machines',
    ],
    
    splashscreen: {},

    init: function() {
        // Start the mask on the body and get a reference to the mask
        splashscreen = Ext.getBody().mask('正在加载程序...', 'splashscreen');

        // Add a new class to this mask as we want it to look different from the default.
        splashscreen.addCls('splashscreen');

        // Insert a new div before the loading icon where we can place our logo.
        Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
            cls: 'x-splash-icon'
        });
    },

    launch: function() {
        var task = new Ext.util.DelayedTask(function() {
            //Fade out the body mask
            splashscreen.fadeOut({
                duration: 1000,
                remove:true
            });

            //Fade out the icon and message
            splashscreen.next().fadeOut({
                duration: 1000,
                remove:true,
                listeners: {
                    afteranimate: function(el, startTime, eOpts ){
                        Ext.widget('login');
                    }
                }
            });
       });
       task.delay(2000);
    },
});
