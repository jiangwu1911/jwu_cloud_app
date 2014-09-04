Ext.define('CloudApp.controller.security.Depts', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.Util'
    ],

    views: [
        'security.Depts',
        'security.DeptsList',
        'security.DeptsEdit'
    ],

    stores: [
        'security.Depts'
    ],

    refs: [
        {
            ref: 'deptsEdit',
            selector: 'deptsedit'
        },
        {
            ref: 'deptsList',
            selector: 'deptslist'
        }
    ],
});
