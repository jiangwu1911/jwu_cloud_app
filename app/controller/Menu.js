Ext.define('CloudApp.controller.Menu', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.view.security.Profile',
        'CloudApp.model.MenuItem',
    ],

    views: [
        'menu.Accordion',
        'menu.Item'
    ],

    refs: [
        {
            ref: 'mainPanel',
            selector: 'mainPanel'
        }
    ],

    onPanelRender: function(abstractcomponent, options) {
        role = sessionStorage.getItem('user_role');
        var data = {}
        if (role == '系统管理员') {
            data = { menuitems: 
                    [{id:1, text:'帐号管理', iconCls:'menu_admin', parent_id:0},
                     {id:2, text:'部门', iconCls:'menu_dept', parent_id:1},
                     {id:3, text:'用户', iconCls:'menu_user', parent_id:1},
                     {id:4, text:'硬件资源管理', iconCls:'menu_hardware', parent_id:0},
                     {id:5, text:'服务器', iconCls:'menu_host', parent_id:4},
                     {id:6, text:'存储', iconCls:'menu_storage', parent_id:4}, 
                     {id:7, text:'云平台管理', iconCls:'menu_openstack', parent_id:0},
                     {id:8, text:'云主机类型', iconCls:'menu_flavor', parent_id:7},
                     {id:9, text:'镜像', iconCls:'menu_image', parent_id:7},
                     {id:10, text:'云主机', iconCls:'menu_vm', parent_id:7},
                     {id:11, text:'云硬盘', iconCls:'menu_vdisk', parent_id:7},
                     {id:12, text:'快照', iconCls:'menu_snapshot', parent_id:7}] };

        } else if (role == '部门管理员') {
            data = { menuitems:
                    [{id:1, text:'帐号管理', iconCls:'menu_admin', parent_id:0},
                     {id:2, text:'部门', iconCls:'menu_dept', parent_id:1},
                     {id:3, text:'用户', iconCls:'menu_user', parent_id:1},
                     {id:7, text:'云平台管理', iconCls:'menu_openstack', parent_id:0},
                     {id:8, text:'云主机类型', iconCls:'menu_flavor', parent_id:7},
                     {id:9, text:'镜像', iconCls:'menu_image', parent_id:7},
                     {id:10, text:'云主机', iconCls:'menu_vm', parent_id:7},
                     {id:11, text:'云硬盘', iconCls:'menu_vdisk', parent_id:7},
                     {id:12, text:'快照', iconCls:'menu_snapshot', parent_id:7}] };

        } else {
            data = { menuitems:
                    [{id:7, text:'云平台管理', iconCls:'menu_openstack', parent_id:0},
                     {id:8, text:'云主机类型', iconCls:'menu_flavor', parent_id:7},
                     {id:9, text:'镜像', iconCls:'menu_image', parent_id:7},
                     {id:10, text:'云主机', iconCls:'menu_vm', parent_id:7},
                     {id:11, text:'云硬盘', iconCls:'menu_vdisk', parent_id:7},
                     {id:12, text:'快照', iconCls:'menu_snapshot', parent_id:7}] };
        }

        var memProxy = new Ext.data.proxy.Memory({
            model: 'CloudApp.model.MenuItem',
            reader: {root: 'menuitems'},
            data: data
        });

        var menuPanel = Ext.ComponentQuery.query('mainmenu')[0];
        memProxy.read(new Ext.data.Operation(), function(result) {
            Ext.each(result.resultSet.records, function(record) {
                var menu = Ext.create('CloudApp.view.menu.Item', {
                    title: record.get('text'),
                    iconCls: record.get('iconCls')
                });
                menuPanel.add(menu);
            });
        });
    }, 

    onTreepanelItemClick: function(view, record, item, index, event, options){
    },

    init: function(application) {
        this.control({
            "mainmenu": {
                render: this.onPanelRender
            },
            "mainmenuitem": {
                itemclick: this.onTreepanelItemClick
            }
        });
    }
});
