function sort(arr,result){
    if(arr.length>0){
        var a = min(arr);
        result[result.length] = a;
        arr.remove(a);
        sort(arr,result);
    }
}
function min(arr){
    if(arr.length>1){
        var a = arr[0];
        var b = arr[1];
        arr.remove(a<b?b:a);
    }else if(arr.length==1){
        return arr[0];
    }
    min(arr);
}