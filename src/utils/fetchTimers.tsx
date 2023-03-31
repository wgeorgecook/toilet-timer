import {v4 as uuidv4} from 'uuid';

export interface timer {
    id: string,
    time: number,
    name: string,
    created_at: number,
}

export const newTimer = (index: number): timer => {
    return {
        id: uuidv4(),
        time: 0,
        name: `New Timer ${index}`,
        created_at: Date.now(),
    }
}
const fetchTimers = () => {
    let timers: timer[] = [];
    const timerStorage = localStorage.getItem("timers")
    
    if (timerStorage !== null) {
        timers = JSON.parse(timerStorage)
    }

    if(timers.length === 0) {
        timers.push(newTimer(1))
    }

    return timers;
}

export const storeTimers = (t: timer[])=> {
    localStorage.setItem("timers", JSON.stringify(t));
}

export default fetchTimers;