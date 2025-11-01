import { UserItem } from "./js/UserItem.js";


console.log('======================================================================');
const _user = new UserItem('pook61@naver.com', '박종명');
// console.log(_user);
console.log('_user: ' + _user);
console.log('email: ' + _user.email);
console.log('name: ' + _user.name);
console.log('id: ' + _user.id);
console.log('lastName: ' + _user.lastName);

_user.tag = Object.seal({
    comment: '임헌진의 친구',
    age: 37,
    job: '유통업',
    newsPaper: '강동구일보',
    이천가서할일: '아크칸투구 보석작(칼데산의 절망)'
});
console.log(_user.tag);