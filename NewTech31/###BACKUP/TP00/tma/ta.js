{
    let c = 0;
    for (let i = 0; i < 100; i++) {
        let k = i + 1;
        // console.log('>>>', k);
        c += k;
    }
    console.log('>>>', c);
}


// {

//     let t1 = Math.pow(2, 16) - 1;
//     // console.log(t1, 0xffff);

//     let t2 = 5;
//     let t3 = -2;
//     // console.log(t2, t2.toString(2));
//     // console.log(0xff, (-1 & 0xff).toString(2));
//     // console.log((-1 & 0xff).toString(2));


//     let t4 = -75;
//     // console.log(t4, t4.toString(2), (t4 & 0xff), (-1 & 0xff));
//     console.log(-1 & 0xff);
//     console.log(-1 & 0xffff);
//     console.log(-1 & 0x7fffffff);
//     console.log((-1 & 0xffffffff) >>> 0);
//     // console.log(Math.pow(2, 31) - 1, 0x7fffffff);
//     //-1001011
//     //10110101
//     console.log(0xffffffff >>> 0);
//     // console.log(0xffff);
//     // console.log(0x7fffffff);
//     // console.log(0xffffffff);

// }