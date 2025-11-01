export const UserItem = Object.freeze(class {
    /**
     * 생성자
     * @param {string} email
     * @param {string} name
     */
    constructor(email, name) {
        this.#gd.email = email;
        this.#gd.name = name;
        this.tag = null;
        Object.seal(this);
    }
    #gd = Object.seal({
        /** @type {string} */
        email: null,

        /** @type {string} */
        name: null,
    });

    /**
     * 사용자 이메일
     * @type {string}
     */
    get email() {
        const gd = this.#gd;
        return gd.email;
    }

    /**
     * 사용자 이름
     * @type {string}
     */
    get name() {
        const gd = this.#gd;
        return gd.name;
    }

    toString() {
        const gd = this.#gd;
        return `email: ${gd.email}, name: ${gd.name}`;
    }

    /**
     * 사용자 ID
     * @type {string}
     */
    get id() {
        const gd = this.#gd;
        const mt = gd.email.match(/(^\w+?)@/);
        return mt?.[1];
    }

    /**
     * 사용자 ID
     * @type {string}
     */
    get lastName() {
        const gd = this.#gd;
        return gd.name.at(0);
    }

});