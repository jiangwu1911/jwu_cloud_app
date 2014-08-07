Ext.define('CloudApp.controller.Login', {
    extend: 'Ext.app.Controller',

    requires: [
        'CloudApp.util.MD5',
        'CloudApp.util.Alert',
        'CloudApp.view.MyViewport',
        'CloudApp.util.Util',
        'CloudApp.util.SessionMonitor'
    ],

    views: [
        'Login',
        'Header',
        'authentication.CapsLockTooltip'
    ],

    refs: [
        {
            ref: 'capslockTooltip',
            selector: 'capslocktooltip'
        }
    ],

    init: function(application) {
        this.control({
            "login form button#submit": {
                click: this.onButtonClickSubmit
            },
            "login form button#cancel": {
                click: this.onButtonClickCancel
            },
            "login form textfield": {
                specialkey: this.onTextfielSpecialKey
            },
            "login form textfield[name=password]": {
                keypress: this.onTextfielKeyPress
            },
            "appheader button#logout": {
                click: this.onButtonClickLogout
            }
        });

        Ext.apply(Ext.form.field.VTypes, {
            customPass: function(val, field) {
                return /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,20}$/.test(val);
            },
            customPassText: '密码必须包含6-20个字符、数字或符号.',
        });

    },

    onButtonClickSubmit: function(button, e, options) {
        var formPanel = button.up('form'),
            login = button.up('login'),
            user = formPanel.down('textfield[name=user]').getValue(),
            pass = formPanel.down('textfield[name=password]').getValue();   

        if (formPanel.getForm().isValid()) {
            pass = CloudApp.util.MD5.encode(pass); 
            Ext.get(login.getEl()).mask("Authenticating... Please wait...", 'loading');

            Ext.Ajax.request({
                url: API_URL + '/login',
                method: 'post',
                params: {
                    username: user,
                    password: pass
                },
                success: function(conn, response, options, eOpts) {
                    Ext.get(login.getEl()).unmask();
                    var result = CloudApp.util.Util.decodeJSON(conn.responseText);

                    if (result.success) {
                        login.close();
                        Ext.create('CloudApp.view.MyViewport');
                        CloudApp.util.SessionMonitor.start();

                    } else {
                        CloudApp.util.Util.showErrorMsg(conn.responseText);
                    }
                },
                failure: function(conn, response, options, eOpts) {
                    Ext.get(login.getEl()).unmask();
                    CloudApp.util.Util.showErrorMsg(conn.responseText);
                }
            });
        }    
    },    

    onButtonClickCancel: function(button, e, options) {
        button.up('form').getForm().reset();
    },

    onTextfielSpecialKey: function(field, e, options) {
        if (e.getKey() == e.ENTER){
            var submitBtn = field.up('form').down('button#submit');
            submitBtn.fireEvent('click', submitBtn, e, options);
        }
    },

    onTextfielKeyPress: function(field, e, options) {
        var charCode = e.getCharCode(); 
        
        if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
            (!e.shiftKey && charCode >= 65 && charCode <= 90)){

            if(this.getCapslockTooltip() === undefined){
                Ext.widget('capslocktooltip');
            }
            this.getCapslockTooltip().show();

        } else {
            if(this.getCapslockTooltip() !== undefined){
                this.getCapslockTooltip().hide();
            }
        }
    },
    
    onButtonClickLogout: function(button, e, options) {
        Ext.Ajax.request({
            url:  API_URL + '/logout',
            method: 'POST',
            success: function(conn, response, options, eOpts) {
                var result = CloudApp.util.Util.decodeJSON(conn.responseText);

                if (result.success) {
                    button.up('mainviewport').destroy();
                    window.location.reload();
                } else {
                    CloudApp.util.Util.showErrorMsg(conn.responseText);
                }
            },
            failure: function(conn, response, options, eOpts) {
                CloudApp.util.Util.showErrorMsg(conn.responseText);
            }
        });
    }
});
