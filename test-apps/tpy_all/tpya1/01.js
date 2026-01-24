// // @ts-check

// //#region [LmUser]
// /**
//  * @typedef {object} ILmUserConstructorArguments
//  * @property {string} email
//  * @property {string} name
//  * @property {number} age
//  * @property {string} password
//  */

// /**
//  * @typedef {object} ILmUser
//  * @property {string} email
//  * @property {string} name
//  * @property {number} age
//  */



// /** @type {ILmUser} */
// class LmUser {
//     /** @type {ILmUserConstructorArguments} */
//     #md = Object.seal({
//         email: '',
//         name: '',
//         age: 37,
//         password: '',
//     });

//     /**
//      * 생성자
//      * @param {ILmUserConstructorArguments} args
//      */
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
// }
// //#endregion



// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// let _user = new LmUser({
//     email: 'pook61@ppop.pe.kr',
//     name: '박종명',
//     age: 37,
//     password: '001122'
// });
// console.log(_user.email);
// console.log(_user.name);

// console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');





// /**
//  * 사용자의 권한 등급
//  * @typedef {'admin' | 'editor' | 'viewer'} UserRole
//  */

// // /**
// //  * 데이터를 처리하는 핸들러 함수 정의
// //  * @typedef {(data: string, id: number) => boolean} DataHandler
// //  */

// /**
//  * @callback DataHandler
//  * @param {string} data - 처리할 데이터
//  * @param {number} id - 데이터 아이디
//  * @returns {boolean} 성공 여부
//  */
