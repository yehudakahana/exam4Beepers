
export enum BeeperStatus{
    MANUFACTURED = 'manufactured',
    ASSEMBLED = 'assembled',
    SHIPPED = 'shipped',
    DEPLOYED = 'deployed',
    DETONATED = 'detonated',

}


export interface Beeper{
    id: string,
    name: string,
    status: BeeperStatus,
    created_at:Date,
    detonated_at:Date | null,
    latitude: Number,
    longitude:Number,
    }


