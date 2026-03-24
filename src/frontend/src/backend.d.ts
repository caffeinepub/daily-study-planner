import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    getDailyGoals(date: string): Promise<Array<string>>;
    getTaskStates(date: string): Promise<Array<[string, boolean]>>;
    resetTasks(date: string): Promise<void>;
    setDailyGoals(date: string, goals: Array<string>): Promise<void>;
    toggleTask(date: string, taskID: string): Promise<boolean>;
}
