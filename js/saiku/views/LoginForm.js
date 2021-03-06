/**
 * The login prompt on startup
 */
var LoginForm = Modal.extend({
    type: "login",
    message: "<form id='login_form'>" +
        "<label for='username'>Username</label><br />" +
        "<input type='text' id='username' name='username' value='admin' /><br />" +
        "<label for='password'>Password</label><br />" +
        "<input type='password' id='password' name='password' value='admin' />" +
        "</form>",
        
    buttons: [
        { text: "Login", method: "login" }
    ],
    
    events: {
        'click a': 'call',
        'keyup #login_form input': 'check'
    },
    
    initialize: function(args) {
        _.extend(this, args);
        _.bindAll(this, "adjust");
        this.options.title = Settings.VERSION;
        this.bind('open', this.adjust);
    },
    
    adjust: function() {
        $(this.el).parent().find('.ui-dialog-titlebar-close').hide();
        $(this.el).find("#username").select().focus();
    },
    
    check: function(event) {
        if(event.which === 13) {
            this.login();
        }
    },
    
    login: function() {
        var username = $("#username").val();
        var password = $("#password").val();
        $(this.el).dialog('close');
        
        this.session.login(username, password);
        return false;
    }
});