//Reference Url http://www.mypriceindia.com/mobiles/apple/apple-iphone-5s-16gb-b95652
var siteTable=document.createElement('table');
var ab=document.getElementsByTagName('table');

siteTable=ab[0];

function getTree(node) {
    var r = {tag: node.nodeName}, a, i;
    if (node.childElementCount) {
        r.children = [];
        for (i = 0; a = node.children[i]; i++ ) {
            r.children.push(getTree(a));
            r['innerHTML']=node.innerHTML;
            r['textContent']=node.textContent;            
        }
    }
    for (i = 0; a = node.attributes[i]; i++) {
        r[a.nodeName] = a.nodeValue;
    }
    return r;        
} 

var tab=getTree(siteTable);