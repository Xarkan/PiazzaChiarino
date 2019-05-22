
export class Body {
    public text: string;
    public path_img: string;
    public name_img: string;

    constructor(t: any, p: any = null, n: any = null) {
        this.text = t;
        this.path_img = p;
        this.name_img = n;
    }
}