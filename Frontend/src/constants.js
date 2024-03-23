function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("FORUMS_PER_PAGE", 6);

define("LOS_PER_PAGE", 9);

define("PERCENTAGE_TO_PASS_LO", 80);