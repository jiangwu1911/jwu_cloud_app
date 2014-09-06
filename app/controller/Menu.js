Ext.define('CloudApp.controller.Menu', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.view.security.Depts',
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
        role = Ext.util.Cookies.get('user_role');
        var data = {}
        if (role == '系统管理员') {
            data = { menuitems: 
                    [{id:1, text:'帐号管理', iconCls:'menu_admin', parent_id:null, className:null},
                     {id:2, text:'部门', iconCls:'menu_dept', parent_id:1, className:'depts'},
                     {id:3, text:'用户', iconCls:'menu_user', parent_id:1, className:'users'},
                     {id:4, text:'硬件资源管理', iconCls:'menu_hardware', parent_id:null, className:null},
                     {id:5, text:'服务器', iconCls:'menu_host', parent_id:4, className:null},
                     {id:7, text:'云平台管理', iconCls:'menu_openstack', parent_id:null, className:null},
                     {id:8, text:'云主机类型', iconCls:'menu_flavor', parent_id:7, className:'flavors'},
                     {id:9, text:'镜像', iconCls:'menu_image', parent_id:7, className:'images'},
                     {id:10, text:'云主机', iconCls:'menu_server', parent_id:7, className:'servers'},
                     {id:11, text:'云硬盘', iconCls:'menu_vdisk', parent_id:7, className:null},
                     {id:12, text:'快照', iconCls:'menu_snapshot', parent_id:7, className:null}] };

        } else if (role == '部门管理员') {
            data = { menuitems:
                    [{id:1, text:'帐号管理', iconCls:'menu_admin', parent_id:null, className:null},
                     {id:2, text:'部门', iconCls:'menu_dept', parent_id:1, className:'depts'},
                     {id:3, text:'用户', iconCls:'menu_user', parent_id:1, className:'users'},
                     {id:7, text:'云平台管理', iconCls:'menu_openstack', parent_id:null, className:null},
                     {id:8, text:'云主机类型', iconCls:'menu_flavor', parent_id:7, className:'flavors'},
                     {id:9, text:'镜像', iconCls:'menu_image', parent_id:7, className:'images'},
                     {id:10, text:'云主机', iconCls:'menu_server', parent_id:7, className:'servers'},
                     {id:11, text:'云硬盘', iconCls:'menu_vdisk', parent_id:7, className:null},
                     {id:12, text:'快照', iconCls:'menu_snapshot', parent_id:7, className:null}] };

        } else {
            data = { menuitems:
                    [{id:7, text:'云平台管理', iconCls:'menu_openstack', parent_id:null, className:null},
                     {id:8, text:'云主机类型', iconCls:'menu_flavor', parent_id:7, className:'flavors'},
                     {id:9, text:'镜像', iconCls:'menu_image', parent_id:7, className:'images'},
                     {id:10, text:'云主机', iconCls:'menu_server', parent_id:7, className:'servers'},
                     {id:11, text:'云硬盘', iconCls:'menu_vdisk', parent_id:7, className:null},
                     {id:12, text:'快照', iconCls:'menu_snapshot', parent_id:7, className:null}] };
        }

        var memProxy = new Ext.data.proxy.Memory({
            model: 'CloudApp.model.MenuItem',
            reader: {root: 'menuitems'},
            data: data
        });

        var menuPanel = Ext.ComponentQuery.query('mainmenu')[0];

        memProxy.read(new Ext.data.Operation(), function(result) {
            Ext.each(result.resultSet.records, function(record) {
                if (!record.get('parent_id')) {
                    // 一级菜单
                    var menu = Ext.create('CloudApp.view.menu.Item', {
                        title: record.get('text'),
                        iconCls: record.get('iconCls')
                    });
                    menuPanel.add(menu);
                    
                    Ext.each(result.resultSet.records, function(sub_menu) {
                        if (sub_menu.get('parent_id') == record.get('id')) {
                            // 二级菜单
                            menu.getRootNode().appendChild({
                                text: sub_menu.get('text'),
                                leaf: true,
                                iconCls: sub_menu.get('iconCls'),
                                id: sub_menu.get('id'),
                                className: sub_menu.get('className')
                            });
                        }
                    }); 
                }
            });
        });
    }, 

    onTreepanelSelect: function(selModel, record, index, options) {
        var mainPanel = Ext.ComponentQuery.query('mainpanel')[0];
        var newTab = mainPanel.items.findBy(
            function(tab) {
                return tab.title === record.get('text');
            });

        if (!newTab) {
            newTab = mainPanel.add({
                xtype: record.raw.className,
                closable: true,
                iconCls: record.get('iconCls'),
                title: record.get('text')
            });
        }
        mainPanel.setActiveTab(newTab);
    },

    onTreepanelItemClick: function(view, record, item, index, event, options){
        this.onTreepanelSelect(view, record, index, options);
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
