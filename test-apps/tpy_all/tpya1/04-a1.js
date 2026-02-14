// class LmUser4 {
//     #md = Object.seal({
//         email: '',
//         name: '',
//         age: 37,
//         password: '',
//     });

//     constructor({email, name, age, password}) {
//         const md = this.#md;
//         md.email = email;
//         md.name = name;
//         md.age = age;
//         md.password = password;
//     }

//     get email() {
//         const md = this.#md;
//         return md.email;
//     }

//     get name() {
//         const md = this.#md;
//         return md.name;
//     }

//     get age() {
//         const md = this.#md;
//         return md.age;
//     }
// }



// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// let _user4 = new LmUser4({
//     email: 'pook61@ppop.pe.kr',
//     name: '박종명',
//     age: 37,
//     password: '001122'
// });
// console.log(_user4.email);
// console.log(_user4.name);
// console.log(_user4.age);
// console.log(_user4.toString());

// console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

