
import { DAY_OF_WEEK } from './day-of-week.model';
import { ContractPlanningDay } from './contract-planning-day.model';

export enum CONTRACT_STATUS {
    PREPARING,
    VALIDATED,
    ACTIVE,
    DONE
}

export class Contract {
    public id?: number;
    public status: CONTRACT_STATUS;
    public fromDate?: string;
    public toDate?: string;
    public pricePerMonth?: number;
    public holidayWeekCount?: number;
    public hoursPerWeek?: number;
    public planning?: Map<DAY_OF_WEEK, ContractPlanningDay>;

    constructor() {
        this.initPlanning();
    }

    public initPlanning?(): void {
        this.planning[DAY_OF_WEEK.MONDAY] = new ContractPlanningDay();
        this.planning[DAY_OF_WEEK.TUESDAY] = new ContractPlanningDay();
        this.planning[DAY_OF_WEEK.WEDNESDAY] = new ContractPlanningDay();
        this.planning[DAY_OF_WEEK.THURSDAY] = new ContractPlanningDay();
        this.planning[DAY_OF_WEEK.FRIDAY] = new ContractPlanningDay();
    }
}
