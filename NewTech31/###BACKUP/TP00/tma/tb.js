{

    // class Romer {
    //     constructor() {
    //         const prt = Reflect.getPrototypeOf(this);
    //         Object.assign(prt, {
    //             fn_go() {
    //                 console.log('fn_go', this);
    //             }
    //         });
    //         // console.log(prt);
    //     }
    // }

    // let rr = new Romer();
    // rr.fn_go();


    let na = 1;
    let nb = 1;

    const fn_rg1 = () => {
        console.log('fn_rg1');
        return true;
    };

    let b1 = na == nb && fn_rg1();
    let b2 = na === nb || na++ === nb;
    console.log('==========');
}