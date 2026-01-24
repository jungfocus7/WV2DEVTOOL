/** @implements {ILmUser} */
class LmUser {
    /** @type {ILmUserConstructorArguments} */
    #md = Object.seal({
        email: '',
        name: '',
        age: 37,
        password: '',
    });

    /**
     * @constructor
     * @param {ILmUserConstructorArguments} args
     */
    constructor({email, name, age, password}) {
        const md = this.#md;
        md.email = email;
        md.name = name;
        md.age = age;
        md.password = password;
    }

    get email() {
        const md = this.#md;
        return md.email;
    }

    get name() {
        const md = this.#md;
        return md.name;
    }

    get age() {
        const md = this.#md;
        return md.age;
    }

    get password() {
        const md = this.#md;
        if (md.password)
            return 'applied';
        else
            return 'empty';
    }

    get info() {
        const md = this.#md;
        let rv = `
email: ${md.email}, name: ${md.name}, age: ${md.age}
        `.trim();
        return rv;
    }

    getInfo() {

    }

}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/** @type {ILmUser} */
let _user = new LmUser({
    email: 'pook61@ppop.pe.kr',
    name: '박종명',
    age: 37,
    // password: '001122'
});
console.log(_user.email);
console.log(_user.name);
console.log(_user.age);
console.log(_user.password);
console.log(_user.info);
// console.log(_user.getInfo());

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');


