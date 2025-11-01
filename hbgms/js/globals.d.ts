type hfCellItem_args = {
    srt: SVGSVGElement;
    fcr: string;
    txt: string;
    rw: number;
    rh: number;
    rx: number;
    ry: number;
}

type hfCellItem_gd = {
    srt: SVGSVGElement;
    ge: SVGGElement;
    re: SVGRectElement;
    te: SVGTextElement;
    drc: DOMRect;
    mg: number;
};

type hfCellItem = {
    new (args: hfCellItem_args): hfCellItem;
    get_rect(): DOMRect;
    get_width(): number;
    get_height(): number;
    set_width(tv: number): void;
    set_height(tv: number): void;
    get_x(): number;
    get_y(): number;
    set_x(): void;
    set_y(): void;
};










// type hfCellItem_gd = {
//     rt: SVGSVGElement,
//     ge: SVGGElement,
//     re: SVGRectElement,
//     te: SVGTextElement,
//     drc: DOMRect,
//     mg: number,
// };

// type hfCellItem_new = new (rt: SVGSVGElement, rw: number, rh: number, rx: number, ry: number) => hfCellItem;

// type hfCellItem = {
//     // new(rt: SVGSVGElement, rw: number, rh: number, rx: number, ry: number): hfCellItem;
//     get_rect(): DOMRect;
//     get_width(): number;
//     // get_height(): number;
//     // set_width(tv: number): void;
//     // set_height(tv: number): void;
//     // get_x(): number;
//     // get_y(): number;
//     // set_x(): void;
//     // set_y(): void;
// };














// declare const fn_get_rect = (x, y) => DOMRect;

// const _xx = fn_get_rect(10, 10);


















// interface hfCellItem {
//     new(rt: SVGSVGElement, rw: number, rh=100, rx=0, ry=0): hfCellItem;
//     get_rect(): DOMRect;
//     get_width(): number;
//     get_height(): number;
//     set_width(tv: number): void;
//     set_height(tv: number): void;
//     get_x(): number;
//     get_y(): number;
//     set_x(): void;
//     set_y(): void;
// };

// type hfCellItem_new = {
//     new(rt: SVGSVGElement, rw: number, rh=100, rx=0, ry=0): hfCellItem;
// };



// interface hfCellItem {
//     // constructor: hfCellItem_new;
//     // new(rt: SVGSVGElement, rw: number, rh=100, rx=0, ry=0): void;
//     // constructor(rt: SVGSVGElement, rw: number, rh=100, rx=0, ry=0);
//     // get_rect(): DOMRect;
//     // get_width(): number;
//     // get_height(): number;
//     // set_width(tv: number): void;
//     // set_height(tv: number): void;
//     // get_x(): number;
//     // get_y(): number;
//     // set_x(): void;
//     // set_y(): void;
// };
// type hfCellItem_new = new (
//     rt: SVGSVGElement, rw: number, rh=100, rx=0, ry=0
// ) => hfCellItem;









// // hfCellItem.d.ts 또는 globals.d.ts 파일

// // 1. 인스턴스 타입 정의 (생성자가 반환할 객체의 모양)
// interface hfCellItemInstance {
//     rt: SVGSVGElement | null; // rt의 기본값은 null이므로 Union Type
//     rw: number;
//     rh: number;
//     rx: number;
//     ry: number;
// }

// // 2. 클래스 생성자 시그니처 정의 (핵심)
// type HfCellConstructor = new (
//     // constructor(rt=null, rw=100, ...)에 맞게 모두 옵셔널(?)로 정의
//     rt?: SVGSVGElement | null,
//     rw?: number,
//     rh?: number,
//     rx?: number,
//     ry?: number
// ) => hfCellItemInstance | null;

// // 전역에서 사용할 경우:
// // declare interface SVGSVGElement extends SVGElement {}





// // // 1. 인스턴스 타입 정의
// // interface hfCellItemInstance {
// //     rt: SVGSVGElement;
// //     // rw: number;
// //     // rh: number;
// //     // rx: number;
// //     // ry: number;
// //     // ... 인스턴스 메서드도 여기에 정의
// // }

// // // 2. 클래스 생성자 시그니처를 포함하는 타입 정의 (핵심)
// // type hfCellItem = new (
// //     rt?: SVGSVGElement,
// //     rw?: number,
// //     rh?: number,
// //     rx?: number,
// //     ry?: number
// // ) => hfCellItemInstance;

// // // 3. SVGSVGElement 등의 전역 타입을 명시적으로 선언하여 VS Code 힌트를 강화합니다.
// // // (이미 브라우저 환경에 전역으로 존재하지만, d.ts에 정의하면 VS Code 인텔리센스가 더 안정적임)
// // declare interface SVGSVGElement extends SVGElement {}






// interface hfCellItem {
//     // constructor: hfCellItem_new;
//     // new(rt: SVGSVGElement, rw: number, rh=100, rx=0, ry=0): void;
//     // constructor(rt: SVGSVGElement, rw: number, rh=100, rx=0, ry=0);
//     // get_rect(): DOMRect;
//     // get_width(): number;
//     // get_height(): number;
//     // set_width(tv: number): void;
//     // set_height(tv: number): void;
//     // get_x(): number;
//     // get_y(): number;
//     // set_x(): void;
//     // set_y(): void;
// };
// type hfCellItem_new = new (
//     rt: SVGSVGElement, rw: number, rh=100, rx=0, ry=0
// ) => hfCellItem;




// // declare const hfCellItem: {
// //     new(rt: SVGSVGElement, rw: number, rh=100, rx=0, ry=0): void;
// // };

// // type hfCellItem_gd = {
// //     rt: SVGSVGElement,
// //     ge: SVGGElement,
// //     re: SVGRectElement,
// //     te: SVGTextElement,
// //     drc: DOMRect,
// //     mg: number,
// // };

// // hfCellItem

// // // interface hfCellItem_gd {
// // //     name: string,
// // //     age: number,
// // //     age: number,
// // //     rt: string,
// // // }
// // new DOMRect(0, 0, 0, 0);

// // class UserInfo implements hfCellItem_gd {

// //     private _name: string;

// // }