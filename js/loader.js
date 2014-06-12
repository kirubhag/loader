var library = {
    /*global variable declaration goes here*/

    allowedType: ["js", "css"],
    ErrorStatus: true,
    doNotValidateURL: true,
    searchObject: {},
    queries: null,
    split: null,
    i: null,
    ext: null,
    head: document.getElementsByTagName('head')[0],
    script: document.createElement('script'),
    link: document.createElement('link'),
    scriptOption: {
        type: 'text/javascript',
        src: null
    },
    linkOption: {
        rel: 'stylesheet',
        type: 'text/css',
        href: null
    },
    urlRegEx: /^(ftp|http|https):\/\/[^ "]+$/,
    defaultError: {
        Error_1: "This is Invalid Url.",
        Error_2: "File has not allowed extension.!,You are trying to load invalid file.",
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
    isAllowedFileToLoad: function(url) {
        if (this.isUrl(url) || this.doNotValidateURL) {
            this.file = this.getFileName(url);
            this.ext = this.file.split('.').pop();
            if (this.hasValidExtension(this.ext)) {
                this.load(url, this.ext);
            } else {
                this.throughError(this.defaultError.Error_2);
            }
        } else {
            this.throughError(this.defaultError.Error_1);
        }
    },
    load: function(url, ext) {
        switch (ext) {
            case "js":
                this.script.type = this.scriptOption.type;
                this.script.src = url;
                this.head.appendChild(this.script);
                break;
            case "css":
                this.link.rel = this.linkOption.rel;
                this.link.type = this.linkOption.type;
                this.link.href = url;
                this.head.appendChild(this.link);
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
    }
};

function loader(url) {
    library.isAllowedFileToLoad(url)

}
