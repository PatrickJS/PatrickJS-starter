import { Family } from '../family.model';
import { Child } from '../child.model';
import { Contract, CONTRACT_STATUS } from '../contract.model';

export const FAMILIES: Family[] = [
    {
        id: 11,
        name: 'Dubuisson',
        children: [
            {
                firstName: 'Paul'
            }, {
                firstName: 'Marie-Sophie'
            }
        ]
    },
    {
        id: 12, name: 'Bondebayonne', children: [
            {
                firstName: 'Jean'
            }]
    },
    {
        id: 13, name: 'Kerreger', children: [
            {
                firstName: 'Maël'
            }, {
                firstName: 'Jocelyne'
            }]
    },
    { id: 14, name: 'Lecoq' }
];

export const CHILDREN: Child[] = [
    {
        id: 12,
        firstName: 'Paul',
        sex: 'FEMALE',
        birthDate: new Date('2013-09-12')
    }
];

export const CONTRACTS: Contract[] = [
    {
        id: 12,
        status: CONTRACT_STATUS.PREPARING,
        fromDate: '2017-07-01'
    },
    {
        id: 13,
        status: CONTRACT_STATUS.VALIDATED,
        fromDate: '2017-01-01',
        toDate: '2017-07-01',
        pricePerMonth: 451.21,
        holidayWeekCount: 6,
        hoursPerWeek: 20
    },
    {
        id: 14,
        status: CONTRACT_STATUS.ACTIVE,
        fromDate: '2016-01-01',
        toDate: '2016-12-31',
        pricePerMonth: 432.87,
        holidayWeekCount: 17,
        hoursPerWeek: 47
    },
    {
        id: 15,
        status: CONTRACT_STATUS.DONE,
        fromDate: '2015-01-01',
        toDate: '2015-12-31',
        pricePerMonth: 407.48,
        holidayWeekCount: 26,
        hoursPerWeek: 45
    },
    {
        id: 16,
        status: CONTRACT_STATUS.DONE,
        fromDate: '2014-01-01',
        toDate: '2014-12-31',
        pricePerMonth: 404.48,
        holidayWeekCount: 26,
        hoursPerWeek: 45
    }
];
