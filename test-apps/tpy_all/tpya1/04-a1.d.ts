// // 1. 생성자에 전달될 데이터 구조 정의
// export interface UserInput {
//     email: string;
//     name: string;
//     age: number;
//     password?: string;
// }

// // 2. 클래스의 인터페이스(구조) 선언
// export declare class LmUser4 {
//     constructor(data: UserInput);

//     // 외부에서 접근 가능한 Getter들만 선언
//     readonly email: string;
//     readonly name: string;
//     readonly age: number;

//     // 기본적으로 제공되는 toString 정의
//     toString(): string;
// }