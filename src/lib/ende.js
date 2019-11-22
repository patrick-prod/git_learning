function en(code, h) {
    var monyer = new Array();var i,s;
    for(i=0;i<code.length;i++)
        monyer+=code.charCodeAt(i).toString(h)+"_"; 
    return monyer;
};

function de(code, h) {
    var i,s="",code = code.split("_");
    for(i=0;i<code.length;i++) {
        s += String.fromCharCode(parseInt(code[i],h));
    };
    return s
};

export {en,de}