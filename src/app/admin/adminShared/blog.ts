export class Blog {
    constructor(
        public title: string,
        public content: string,
        public imgTitle?: string, //? is optional properties, must go after required
        public img?: any,
        public id?: string //generated by firebase automatically
    ) { }
}