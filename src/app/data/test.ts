export interface schedule {
    owner:string;
    member:string[];
    titleId:string;
    title:string;
    day:[{
        date: string;
        day: string;
        week: string;
        tourism:[{
            tripseq: string;
            startTime: string;
            endTime: string;
            tripTime: string;
            forcastTime: string;
            place: string;
            address: string;
            lat: string;
            lon: string;
        }]
    }]
}