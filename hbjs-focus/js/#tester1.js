// 객체를 일부만 동결함 (속성 추가/제거 불가능, 속성값변경 가능)
Object.seal(this);

// 객체를 완전히 동결함 (속성 추가/제거 불가가능, 속성값변경 불가능)
Object.freeze(this);












// const fn_test = () => {
//     console.log('>>>: ' + window);
//     console.log('개발자입니다.');
// };

// export default {
//     fn_test
// };