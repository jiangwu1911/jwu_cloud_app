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
                     {id:11, text:'硬件资源管理', iconCls:'menu_hardware', parent_id:null, className:null},
                     {id:12, text:'使用情况', iconCls:'menu_hypervisor', parent_id:11, className:'hypervisors'},
                     {id:13, text:'日志', iconCls:'menu_log', parent_id:11, className:null},
                     {id:21, text:'云平台管理', iconCls:'menu_openstack', parent_id:null, className:null},
                     {id:22, text:'云主机类型', iconCls:'menu_flavor', parent_id:21, className:'flavors'},
                     {id:23, text:'镜像', iconCls:'menu_image', parent_id:21, className:'images'},
                     {id:24, text:'云主机', iconCls:'menu_server', parent_id:21, className:'servers'},
                     {id:25, text:'云硬盘', iconCls:'menu_volume', parent_id:21, className:'volumes'},
                     {id:26, text:'快照', iconCls:'menu_snapshot', parent_id:21, className:'snapshots'}] };

        } else if (role == '部门管理员') {
            data = { menuitems:
                    [{id:1, text:'帐号管理', iconCls:'menu_admin', parent_id:null, className:null},
                     {id:2, text:'部门', iconCls:'menu_dept', parent_id:1, className:'depts'},
                     {id:3, text:'用户', iconCls:'menu_user', parent_id:1, className:'users'},
                     {id:21, text:'云平台管理', iconCls:'menu_openstack', parent_id:null, className:null},
                     {id:22, text:'云主机', iconCls:'menu_server', parent_id:21, className:'servers'},
                     {id:23, text:'云硬盘', iconCls:'menu_vdisk', parent_id:21, className:'volumes'},
                     {id:24, text:'快照', iconCls:'menu_snapshot', parent_id:21, className:'snapshots'}] };

        } else {
            data = { menuitems:
                    [{id:21, text:'云平台管理', iconCls:'menu_openstack', parent_id:null, className:null},
                     {id:22, text:'云主机', iconCls:'menu_server', parent_id:21, className:'servers'},
                     {id:23, text:'云硬盘', iconCls:'menu_vdisk', parent_id:21, className:'volumes'},
                     {id:24, text:'快照', iconCls:'menu_snapshot', parent_id:21, className:'snapshots'}] };
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

    openLogWindow:  function(selModel, record, index, options) {
        var mainPanel = Ext.ComponentQuery.query('mainpanel')[0];
        var newTab = mainPanel.items.findBy(
            function(tab) {
                return tab.title === record.get('text');
            });

        if (!newTab) {
            url = API_URL + '/logs'
            Ext.Ajax.request({
                url: url,
                method: 'GET',
                headers: { 'X-Auth-Token': Ext.util.Cookies.get('user_token') },
                success: function(conn, response, options, eOpts) {
                    ret = CloudApp.util.Util.decodeJSON(conn.responseText);
                    if (ret.url) {
                        newTab = mainPanel.add({
                            xtype: 'logs',
                            closable: true,
                            iconCls: 'menu_log',
                            title: '日志',
                            html: "<iframe src='" + ret.url +
                                    "' scrolling='yes' frameborder=0 width=100% height=100%></iframe>"
                        });
                        mainPanel.setActiveTab(newTab);
                    }
                },
                failure: function(conn, response, options, eOpts) {
                    CloudApp.util.Util.showErrorMsg(conn.responseText);
                }
            });
        }
        mainPanel.setActiveTab(newTab);
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
        if (record.get('text') === '日志') {
            this.openLogWindow(view, record, index, options);
        } else {
            this.onTreepanelSelect(view, record, index, options);
        }
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
