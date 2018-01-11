function getRandom()
{
    tdy = new Date();
    var bigN=tdy.getSeconds()*tdy.getTime();
    bigN *= Math.sqrt(tdy.getMinutes());
    var randN = (bigN % 4) + 1;
    return Math.floor(randN);
}

console.log(getRandom())