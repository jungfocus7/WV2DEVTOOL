class LmUser2 {
    #md = Object.seal({
        email: '',
        name: '',
        age: 37,
        password: '',
    });

    constructor({email, name, age, password}) {
        const md = this.#md;
        md.email = email;
        md.name = name;
        md.age = age;
        md.password = password;
    }


    toString() {
        return 'xxx';
    }

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let _user2 = new LmUser2({
    email: 'pook61@ppop.pe.kr',
    name: '박종명',
    age: 37,
    password: '001122'
});
console.log(_user2);
console.log(`${_user2}`);

