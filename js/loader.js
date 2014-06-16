function inherit(baseClass) {
    function inheritance() {};
    inheritance.prototype = baseClass;
    return  new inheritance();
}

var library = {
    
    /*global variable declaration goes here*/
    
    scriptTag: null,
    linkTag: null,
    urlRegEx: /^(ftp|http|https):\/\/[^ "]+$/,
    allowedType: ["js", "css"],
    ErrorStatus: true,
    doNotValidateURL: true,
    searchObject: {},
    queries: null,
    split: null,
    i: null,
    ext: null,
    scriptOption: {
        type: 'text/javascript',
        src: null
    },
    linkOption: {
        rel: 'stylesheet',
        type: 'text/css',
        href: null
    },
    defaultError: {
        Error_1: "This is Invalid Url.",
        Error_2: "File has not allowed extension.!,You are trying to load invalid file.",
        Error_3: "Your browser does not support XMLHttpRequest."
    },
    file: null,
    throughError: function(error) {
        if (this.ErrorStatus)
            console.log(error);
    },
    hasSlashes: function(url) {

    },
    hasExtension: function(url) {

    },
    hasValidExtension: function(ext) {
        return (this.allowedType.indexOf(ext) !== -1) ? true : false;
    },
    isAllowedFileToLoad: function(url, element) {
        if (this.doNotValidateURL || this.isUrl(url)) {
            this.file = this.getFileName(url);
            this.ext = this.file.split('.').pop();
            if (this.hasValidExtension(this.ext)) {
                this.load(url, element, this.ext);
            } else {
                this.throughError(this.defaultError.Error_2);
            }
        } else {
            this.throughError(this.defaultError.Error_1);
        }
    },
    load: function(url, element, ext) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        var link = document.createElement('link');
        this.scriptTag = null;
        this.linkTag = null;
        switch (ext) {
            case "js":
                this.scriptTag = script;
                this.scriptTag.type = this.scriptOption.type;
                this.scriptTag.src = url;
                head.appendChild(this.scriptTag);
                break;
            case "css":
                this.linkTag = link;
                this.linkTag.rel = this.linkOption.rel;
                this.linkTag.type = this.linkOption.type;
                this.linkTag.href = url;
                head.appendChild(this.linkTag);
                break;
        }
    },
    /*@url    : receive user input
     *@return : boolean result
     */
    isUrl: function(url) {
        return this.urlRegEx.test(url);
    },
    /*@url    : receive user input
     *@return : collection of object of url properties,such as protocol,
     *          host name, port, path and query string
     */
    querySpliter: function(url) {
        var parser = document.createElement('a'),
                searchObject = {}, queries, split, i;

        // Let the browser do the work
        parser.href = url;

        // Convert query string to object
        queries = parser.search.replace(/^\?/, '').split('&');
        for (i = 0; i < queries.length; i++) {
            split = queries[i].split('=');
            searchObject[split[0]] = split[1];
        }

        return {
            protocol: parser.protocol,
            host: parser.host,
            hostname: parser.hostname,
            port: parser.port,
            pathname: parser.pathname,
            search: parser.search,
            searchObject: searchObject,
            hash: parser.hash
        }
    },
    getFileName: function(url) {
        return url.split('/').pop()
    },
    makeXmlHttpReq: function(url) {
        var req = this.getReq();
        var httpStatus = {};
        try {
            req.open("GET", url, false);
            req.send("");
        } catch (e) {
            return httpStatus = {
                success: false,
                error_msg: "Error: " + e
            }
        }
        return httpStatus = {
            success: true,
            status: req.status
        }

    },
    getReq: function() {
        var req = false;
        if (window.XMLHttpRequest) {
            try {
                req = new XMLHttpRequest();
            } catch (e) {
                req = false;
            }
        } else if (window.ActiveXObject) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                req = false;
            }
        }
        if (!req) {
            this.throughError(this.defaultError.Error_3);
        }
        return req;
    }
};

function loader(url) {
    var lib = inherit(library);
    lib.isAllowedFileToLoad(url);
}
