import { DAY_OF_WEEK } from './day-of-week.model';

export class ContractPlanningDay {
    public day: DAY_OF_WEEK;
    public absent: boolean;
    public startTime: string;
    public endTime: string;

    constructor() {
        this.absent = false;
        this.startTime = '';
        this.endTime = '';
    }
}
