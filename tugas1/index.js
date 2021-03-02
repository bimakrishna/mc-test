function twoSums (arr, target) {
    let result = []

    for ( let i = 0; i<arr.length; i++){
        for ( let j = 1; j<arr.length; j++) {
            if ( arr[i] + arr[j] === target) {
                result.push(i, j)
                break;
            }
        }
        if ( result.length === 2 ) {
            break;
        }
    } 
    return result
}

console.log(twoSums([2,7,11,15],13));
console.log(twoSums([3,2,4],6));
console.log(twoSums([3,3], 6));