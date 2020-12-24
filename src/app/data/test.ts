export interface schedule {
    owner:string;
    member:string[];
    titleId:number;
    title:string;
    day:[{
        date: string;
        day: string;
        week: string;
        tourism:[{
            startTime: string;
            endTime: string;
            forcastTime: string;
            place: string;
            address: string;
        }]
    }]
}