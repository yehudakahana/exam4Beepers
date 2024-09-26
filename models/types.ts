
export enum BeeperStatus{
    MANUFACTURED = 'manufactured',
    ASSEMBLED = 'assembled',
    SHIPPED = 'shipped',
    DETONATED = 'detonated',
    DEPLOYED = 'deployed',
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


