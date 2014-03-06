var require = require;
var exports = exports;
var print = print;

var ff = require('ffef/FatFractal');

exports.changePassword= function() {

    // Restrict execution of this code to only logged in users
    if (ff.getActiveUser().guid == "anonymous") {
        throw {statusCode:403, statusMessage:"Must be logged in."};
    }
	
    var data = ff.getExtensionRequestData();
    var r = ff.response();
	
    // check that the password has been supplied
    var secret = data.httpContent['password'];
    if (! secret || secret === null || secret == '') {
        r.responseCode = "400";
        r.statusMessage = "Empty password";
        return;
    }
    
    // Change the password
    try {
        ff.resetPassword (ff.getActiveUser().guid, secret);
    } catch (ex1) {
        ff.logger.error("Change password failed: " + JSON.stringify(ex1));
        r.responseCode = "500";
        r.statusMessage = "Internal server error";
        return;
    }
    
    // return statusCode 200 and an appropriate message
    r.responseCode = "200";
    r.statusMessage = "Password has been changed";
};
