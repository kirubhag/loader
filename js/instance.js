a = {
    A: 1,
    B: 2,
    p: document.createElement('p'),
    body: document.getElementsByTagName('body'),
    setter: function(A, B) {
        this.A = A;
        this.B = B;
    },
    getter: function() {
        var result;
        result = "A: " + this.A + " B: " + this.B;
        this.p.textContent = result;
        this.body[0].appendChild(this.p);
        console.log(result);
    }
};

b = {
    C: 11,
    D: 22
}

function set(m, n) {
    a.setter(m, n);
}

function get() {
    a.getter();
}