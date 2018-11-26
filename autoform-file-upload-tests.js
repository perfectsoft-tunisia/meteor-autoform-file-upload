// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by autoform-file-upload.js.
import { name as packageName } from "meteor/perfectsofttunisia:autoform-file-upload";

// Write your tests here!
// Here is an example.
Tinytest.add('autoform-file-upload - example', function (test) {
  test.equal(packageName, "autoform-file-upload");
});
