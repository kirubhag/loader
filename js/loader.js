var library = {
    /*global variable declaration goes here*/

    allowedType: ["js", "css"],
    ErrorStatus: true,
    searchObject: {},
    queries: null,
    split: null,
    i: null,
    head: document.getElementsByTagName('head')[0],
    script: document.createElement('script'),
    scriptOption: {
        type: 'text/javascript',
        src: null
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
        if (this.isUrl(url)) {
            this.file = this.getFileName(url);
            if (this.hasValidExtension(this.file.split('.').pop())) {
                this.script.type = this.scriptOption.type;
                this.script.src = url;
                this.head.appendChild(this.script);
            } else {
                this.throughError(this.defaultError.Error_2);
            }
        } else {
            this.throughError(this.defaultError.Error_1);
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
/*
 senaroi:1
 ---------
 
 var subject = 'hello/world/test/index.php';
 var regex = /(?:[^\/\\]+|\\.)+/g;
 var matched = null;
 while (matched = regex.exec(subject)) {
 console.log(matched[0]);
 }
 */
/*
 var subject = 'hello/world/test/index.php';
 var regex = /(?:[^\/\\]+|\\.)+/g;
 var matched = null;
 while (matched = regex.exec(subject)) {
 console.log(matched[0]);
 }
 */

/*	
 Reference: http://www.abeautifulsite.net/blog/2013/10/parsing-urls-in-javascript/
 function parseURL(url) {
 
 var parser = document.createElement('a'),
 searchObject = {},
 queries, split, i;
 
 // Let the browser do the work
 parser.href = url;
 
 // Convert query string to object
 queries = parser.search.replace(/^\?/, '').split('&');
 for( i = 0; i < queries.length; i++ ) {
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
 };
 
 }
 */


/*
 Reference:https://gist.github.com/2428561.git or https://gist.github.com/jlong/2428561
 var parser = document.createElement('a');
 parser.href = "http://example.com:3000/pathname/?search=test#hash";
 
 parser.protocol; // => "http:"
 parser.hostname; // => "example.com"
 parser.port;     // => "3000"
 parser.pathname; // => "/pathname/"
 parser.search;   // => "?search=test"
 parser.hash;     // => "#hash"
 parser.host;     // => "example.com:3000"
 */