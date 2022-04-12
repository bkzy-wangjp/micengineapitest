//格式化代码函数,已经用原生方式写好了不需要改动,直接引用就好
function formatJson(json, options) {
    var reg = null,
    formatted = '',
    pad = 0,
    PADDING = '&emsp;';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

    if(typeof json === 'string'){
        if (json.charAt(0) !=='[' || json.charAt(0) !=='{'){
            return json;
        }
    }
    if (typeof json !== 'string') {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ':');
    }
    const jsonlen = json.split('\r\n').length;
    (json.split('\r\n')).forEach(function (node, index) {
        //console.log(index,node);
        var i = 0,
            indent = 0,
            padding = '';

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
                indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }
        if (node.includes(':')){
            node = node.replace(':','</span>:');
            node = '<span class="jsonkey">'+node
        }
        if (index>0 && index<(jsonlen-1)) {
            //formatted += padding + node + '\r\n';
            formatted += padding + node + '</br>';
        }
        pad += indent;
    });
    console.log(formatted);
    return formatted;
};
