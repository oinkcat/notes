/** User's note */
export default class Note {
    
    constructor(id, title, text, date) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.date = date;
    }

    getModifyDate() {
        const zNum = num => num > 10 ? num.toString() : '0' + num;

        const ts = this.date;
        const time = `${zNum(ts.getHours())}:${zNum(ts.getMinutes())}`;
        const date = ts.toLocaleDateString();

        return `${time}, ${date}`;
    }

    update() {
        const TITLE_LENGTH = 32;

        this.date = new Date();
        
        const beginPart = this.text.substr(0, TITLE_LENGTH);
        this.title = beginPart.split('\n')[0];
    }

    /** Create new blank note */
    static NewNote() {
        return new Note(null, 'New note', '', new Date());
    }
}