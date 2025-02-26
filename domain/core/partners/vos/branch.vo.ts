export default class Branch {
    constructor(
        private id: string,
        private nameTH: string,
        private nameEN?: string,
        private location?: string,
        private address?: string,
        private zipCode?: string,
        private pronvince?: string,
        private district?: string,
        private subDistrict?: string,
        private latitude?: string,
        private longitude?: string,
    ) {
    }
}
