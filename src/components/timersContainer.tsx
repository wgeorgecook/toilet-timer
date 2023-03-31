import { Button } from "grommet";
import {AddCircle} from "grommet-icons"
import { useState } from "react";
import fetchTimers, { newTimer, storeTimers, timer } from "../utils/fetchTimers"
import TimerCard from "./timer";

export enum action {
    delete,
    save
}
const TimersContainer = () => {
    const [timers, setTimers] = useState<timer[]>(fetchTimers());

    const timerAction = (t: timer, a: action) => {
        let timersCopy = [...timers];
        switch (a) {
            case action.save:
                const foundIndex = timers.map((u) => u.id).indexOf(t.id)
                if (foundIndex === -1) {
                    // not found, new item
                    timersCopy.push(t);
                } else {
                    // timer exists, update at it's index
                    timersCopy[foundIndex] = t;
                }
                break;
            case action.delete:
                timersCopy = timersCopy.filter((tm) => tm.id !== t.id)
                break;
        }


        storeTimers(timersCopy);
        setTimers(timersCopy);
    }

    const addTimer = (index: number) => {
        const t = newTimer(index);
        timerAction(t, action.save);
    }

    return (
        <div id="timersContainer" style={{marginLeft:"5%"}}>
            <div 
                className="timersMap" 
                style={{
                    display:"flex",
                    flexWrap: "wrap",
                    overflowY: "scroll",
                }}
            >
            {
                timers?.map((t) => {
                return (
                    <TimerCard 
                        id={t.id} 
                        name={t.name} 
                        time={t.time} 
                        key={t.id}
                        created_at={t.created_at}
                        timerAction={timerAction}
                    />
                )
                })
            }
            </div>
            <div>
            <Button 
                onClick={() => addTimer(timers.length + 1)} 
                label="Add Timer"
                plain
                icon={<AddCircle color="plain"/>}
                style={{
                    marginLeft:"1em"
                }}
            />
            </div>
        </div>

    )

}

export default TimersContainer;