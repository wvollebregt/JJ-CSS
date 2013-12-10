var count = document.createElement('script');
count.type = 'text/javascript';
count.async = true;
count.src = '//hello.myfonts.net/count/29061b';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(count, s);
var browserName, browserVersion, webfontType;
if (typeof (woffEnabled) == 'undefined') {
    var woffEnabled = true;
}
var svgEnabled = 0;
if (typeof (customPath) != 'undefined') {
    var path = customPath;
} else {
    var scripts = document.getElementsByTagName("SCRIPT");
    var script = scripts[scripts.length - 1].src;
    if (!script.match("://") && script.charAt(0) != '/')
        script = "./" + script;
    var path = script.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');
}
var wfpath = path + "/webfonts/";
var browsers = [{
    'regex': 'MSIE (\\d+\\.\\d+)',
    'versionRegex': 'new Number(RegExp.$1)',
    'type': [{
        "version": 9.0,
        "type": "woff"
    }, {
        "version": 5.0,
        "type": "eot"
    }]
}, {
    'regex': 'Trident\/(\\d+\\.\\d+); (.+)?rv:(\\d+\\.\\d+)',
    'versionRegex': 'new Number(RegExp.$3)',
    'type': [{
        "version": 11.0,
        "type": "woff"
    }]
}, {
    'regex': 'Firefox[\/\s](\\d+\\.\\d+)',
    'versionRegex': 'new Number(RegExp.$1)',
    'type': [{
        "version": 3.6,
        "type": "woff"
    }, {
        "version": 3.5,
        "type": "ttf"
    }]
}, {
    'regex': 'Chrome\/(\\d+\\.\\d+)',
    'versionRegex': 'new Number(RegExp.$1)',
    'type': [{
        "version": 6.0,
        "type": "woff"
    }, {
        "version": 4.0,
        "type": "ttf"
    }]
}, {
    'regex': 'Mozilla.*Android (\\d+\\.\\d+).*AppleWebKit.*Safari',
    'versionRegex': 'new Number(RegExp.$1)',
    'type': [{
        "version": 4.1,
        "type": "woff"
    }, {
        "version": 3.1,
        "type": "svg#wf"
    }, {
        "version": 2.2,
        "type": "ttf"
    }]
}, {
    'regex': 'Mozilla.*(iPhone|iPad).* OS (\\d+)_(\\d+).* AppleWebKit.*Safari',
    'versionRegex': "new Number(RegExp.$2) + (new Number(RegExp.$3) / 10)",
    "unhinted": true,
    'type': [{
        "version": 5.0,
        "type": "woff"
    }, {
        "version": 4.2,
        "type": "ttf"
    }, {
        "version": 1.0,
        "type": "svg#wf"
    }]
}, {
    'regex': 'Mozilla.*(iPhone|iPad|BlackBerry).*AppleWebKit.*Safari',
    'versionRegex': '1.0',
    'type': [{
        "version": 1.0,
        "type": "svg#wf"
    }]
}, {
    'regex': 'Version\/(\\d+\\.\\d+)(\\.\\d+)? Safari\/(\\d+\\.\\d+)',
    'versionRegex': 'new Number(RegExp.$1)',
    'type': [{
        "version": 5.1,
        "type": "woff"
    }, {
        "version": 3.1,
        "type": "ttf"
    }]
}, {
    'regex': 'Opera\/(\\d+\\.\\d+)(\.+)Version\/(\\d+\\.\\d+)(\\.\\d+)?',
    'versionRegex': 'new Number(RegExp.$3)',
    'type': [{
        "version": 11.1,
        "type": "woff"
    }, {
        "version": 10.1,
        "type": "ttf"
    }]
}, ]
var browLen = browsers.length;
var suffix = "";
out: for (i = 0; i < browLen; i++) {
    var regex = new RegExp(browsers[i].regex);
    if (regex.test(navigator.userAgent)) {
        browserVersion = eval(browsers[i].versionRegex);
        var typeLen = browsers[i].type.length;
        for (j = 0; j < typeLen; j++) {
            if (browserVersion >= browsers[i].type[j].version) {
                if (browsers[i].unhinted == true) {
                    suffix = "_unhinted";
                }
                webfontType = browsers[i].type[j].type;
                if (webfontType == "woff" && !woffEnabled) {
                    continue;
                } else if (webfontType == "svg#wf" && !svgEnabled) {
                    continue;
                } else {
                    break out;
                }
            }
        }
    } else {
        webfontType = 'woff';
    }
}
if (/(Macintosh|Android)/.test(navigator.userAgent) && webfontType != "svg#wf")
    suffix = "_unhinted";
var fonts = [{
    "fontFamily": "PFDinMono-Medium",
    "url": wfpath + "290640_0" + suffix + "_0." + webfontType
}, {
    "fontFamily": "PFDinMono-Regular",
    "url": wfpath + "290640_1" + suffix + "_0." + webfontType
}, {
    "fontFamily": "PFDinMono-Bold",
    "url": wfpath + "290640_2" + suffix + "_0." + webfontType
}, {
    "fontFamily": "GillSansMTStd-Medium",
    "url": wfpath + "29061B_1" + suffix + "_0." + webfontType
}, {
    "fontFamily": "GillSansMTStd-Book",
    "url": wfpath + "29061B_2" + suffix + "_0." + webfontType
}];
var len = fonts.length;
var head = document.getElementsByTagName("head")[0];
var css = "";
for (var i = 0; i < len; i++) {
    if (webfontType == "svg#wf") {
        var format = "format(\"svg\")";
    } else if (webfontType == "ttf") {
        var format = "format(\"truetype\")";
    } else if (webfontType == "eot") {
        var format = "";
    } else {
        var format = "format(\"" + webfontType + "\")";
    }
    css += "@font-face{font-family: " + fonts[i].fontFamily + ";src:url(" + fonts[i].url + ")" + format + ";";
    if (fonts[i].fontWeight) {
        css += "font-weight: " + fonts[i].fontWeight + ";";
    }
    if (fonts[i].fontStyle) {
        css += "font-style: " + fonts[i].fontStyle + ";";
    }
    css += "}";
}
var stylesheet = document.createElement("style");
stylesheet.setAttribute("type", "text/css");
stylesheet.innerHTML = css;
head.appendChild(stylesheet);