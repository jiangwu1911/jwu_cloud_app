Ext.define('CloudApp.view.security.GroupPermissions', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.grouppermissions',

    requires: ['CloudApp.store.security.Permissions'],

    title: 'Group Permissions',
    rootVisible: false,
    useArrows: true,
    frame: false,
    viewConfig: {
	    markDirty: false
	},

    store: Ext.create('CloudApp.store.security.Permissions')

});
