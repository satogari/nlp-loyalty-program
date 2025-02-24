export default class Attachment {
    constructor(
        private attachmentType: string,
        private name: string,
        private url: string,
        private mimeType: string,
    ) { }
}