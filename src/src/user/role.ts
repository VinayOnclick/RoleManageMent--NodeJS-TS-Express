const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
export default (function() {
ac.grant("Employee")
 .readOwn("profile")
 .updateOwn("profile")
 
ac.grant("SuperAdmin")
 .extend("Employee")
 .readAny("profile")
 .updateAny("profile")
 .deleteAny("profile")
 
ac.grant("Admin")
 .extend("Employee")
 .extend("SuperAdmin")
 .updateAny("profile")
 .deleteAny("profile")
 
return ac;
})();