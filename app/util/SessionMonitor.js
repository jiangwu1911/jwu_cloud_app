/**
 * Session Monitor task, alerts the user that their session will expire in 60 seconds and provides
 * the options to continue working or logout.  If the count-down timer expires,  the user is automatically
 * logged out.
 */
Ext.define('CloudApp.util.SessionMonitor', {
  singleton: true,

  interval: 1000 * 10,  // run every 10 seconds.
  lastActive: null,
  maxInactive: 1000 * 60 * 15,  // 15 minutes of inactivity allowed; set it to 1 for testing.
  remaining: 0,
  ui: Ext.getBody(),
  
  /**
   * Dialog to display expiration message and count-down timer.
   */
  window: Ext.create('Ext.window.Window', {
    bodyPadding: 5,
    closable: false,
    closeAction: 'hide',
    modal: true,
    resizable: false,
    title: '会话过期',
    width: 325,
    items: [{
      xtype: 'container',
      frame: true,
      html: "如果15分钟没有进行任何操作，你的会话会过期并自动退出，所有未保存的数据将会丢失。</br></br>如果想继续工作，请按'继续'按钮。</br></br>"    
    },{
      xtype: 'label',
      text: ''
    }],
    buttons: [{
      text: '继续',
      handler: function() {
        Ext.TaskManager.stop(CloudApp.util.SessionMonitor.countDownTask);
        CloudApp.util.SessionMonitor.window.hide();
        CloudApp.util.SessionMonitor.start();

        // 'poke' the server-side to update your session.
        token = Ext.util.Cookies.get('user_token');
        Ext.Ajax.request({
          url: API_URL + '/users/0',
          method: 'POST',
          headers: { 'X-Auth-Token': token },
          params: { action: 'refresh_token' },

          success: function(conn, response, options, eOpts) {
            var result = CloudApp.util.Util.decodeJSON(conn.responseText);
            Ext.util.Cookies.set('user_token', result.success.token);
          },
          failure: function(conn, response, options, eOpts) {
            CloudApp.util.Util.sessionTimeout();
          }
        });
      }
    },{
      text: '退出',
      action: 'logout',
      handler: function() {
        Ext.TaskManager.stop(CloudApp.util.SessionMonitor.countDownTask);
        CloudApp.util.SessionMonitor.window.hide();
        
        // find and invoke your app's "Logout" button.
        Ext.ComponentQuery.query('button#logout')[0].fireEvent('click',Ext.ComponentQuery.query('button#logout')[0]);
      }
    }]
  }),

 
  /**
   * Sets up a timer task to monitor for mousemove/keydown events and
   * a count-down timer task to be used by the 60 second count-down dialog.
   */
  constructor: function(config) {
    var me = this;
   
    // session monitor task
    this.sessionTask = {
      run: me.monitorUI,
      interval: me.interval,
      scope: me
    };

    // session timeout task, displays a 60 second countdown
    // message alerting user that their session is about to expire.
    this.countDownTask = {
      run: me.countDown,
      interval: 1000,
      scope: me
    };
  },
 
 
  /**
   * Simple method to register with the mousemove and keydown events.
   */
  captureActivity : function(eventObj, el, eventOptions) {
    this.lastActive = new Date();
  },


  /**
   *  Monitors the UI to determine if you've exceeded the inactivity threshold.
   */
  monitorUI : function() {
    var now = new Date();
    var inactive = (now - this.lastActive);
        
    if (inactive >= this.maxInactive) {
      this.stop();

      this.window.show();
      this.remaining = 60;  // seconds remaining.
      Ext.TaskManager.start(this.countDownTask);
    }
  },

 
  /**
   * Starts the session timer task and registers mouse/keyboard activity event monitors.
   */
  start : function() {
    this.lastActive = new Date();

    this.ui = Ext.getBody();

    this.ui.on('mousemove', this.captureActivity, this);
    this.ui.on('keydown', this.captureActivity, this);
        
    Ext.TaskManager.start(this.sessionTask);
  },
 
  /**
   * Stops the session timer task and unregisters the mouse/keyboard activity event monitors.
   */
  stop: function() {
    Ext.TaskManager.stop(this.sessionTask);
    this.ui.un('mousemove', this.captureActivity, this);  //  always wipe-up after yourself...
    this.ui.un('keydown', this.captureActivity, this);
  },
 
 
  /**
   * Countdown function updates the message label in the user dialog which displays
   * the seconds remaining prior to session expiration.  If the counter expires, you're logged out.
   */
  countDown: function() {
    this.window.down('label').update('你的会话将会在' +  this.remaining + '秒后过期。');
    
    --this.remaining;

    if (this.remaining < 0) {
      this.window.down('button[action="logout"]').handler();
    }
  }
});
