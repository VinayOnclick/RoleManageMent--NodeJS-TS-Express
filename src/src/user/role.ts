const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
export default (function() {
ac.grant("employee")
 .readOwn("profile")
 .updateOwn("profile")
 
ac.grant("SuperAdmin")
 .extend("employee")
 .readAny("profile")
 .updateAny("profile")
 .deleteAny("profile")
 
ac.grant("admin")
 .extend("employee")
 .extend("SuperAdmin")
 .updateAny("profile")
 .deleteAny("profile")
 
return ac;
})();