import {ChangeEvent, useEffect, useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, TextInput} from "grommet";
import { Play, Save, Stop, Trash } from 'grommet-icons';
import { timer } from "../utils/fetchTimers";
import { action } from "./timersContainer";

interface timerProps {
    id: string,
    key: string,
    time: number,
    name: string,
    created_at: number,
    timerAction: (t: timer, a: action) => void,
}

export const TimerCard = (props: timerProps) => {
    const { id, time, created_at, timerAction } = props;
    const [buttonText, setButtonText] = useState("Start")
    const [buttonIcon, setButtonIcon] = useState(<Play/>)
    const [running, setRunning] = useState(false);
    const [seconds, setSeconds] = useState(time);
    const [name, setName] = useState(props.name)
    const [formattedTime, setFormattedTime] = useState<string>();

    useEffect(() => {
        if(running) {
            setButtonIcon(<Stop size="medium"/>);
            setButtonText("Stop")
            return
        }

        setButtonIcon(<Play size="medium"/>);
        setButtonText("Start");
    }, [running])

    useEffect(() => {
        let interval: NodeJS.Timer | number = 0;
        if (running) {
          interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
          }, 1000);
        } else if (!running && seconds !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [running, seconds]);

    useEffect(() => {
        const d = new Date(1000 * seconds).toUTCString().split(" ")
        if (d.length >= 4) {
            setFormattedTime(d[4])
            return
        }
        console.error((err:Error) =>`could not format timer: ${err}`)
    }, [seconds]);

    const handleToggle = () => {
        setRunning(!running);
    }

    const updateTimer = (a: action) => {
        timerAction({
            id, 
            name, 
            created_at,
            time: seconds,
        }, a)
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return (
        <Card 
            className="timer" 
            id={id}
            style={
                {
                    margin: "1em",
                    minWidth: "40%"
                }
            }
        >
            <CardHeader>
                <TextInput 
                    onChange={
                        (e: ChangeEvent<HTMLInputElement>) => 
                            handleNameChange(e)} value={name}
                />
            </CardHeader>
            <CardBody>
                <div className="seconds-container" style={{margin:"auto"}}>
                    {formattedTime}
                </div>
                <div className="buttonDiv" style={{display: "flex"}}>
                    <Button  
                        icon={buttonIcon}
                        label={buttonText}
                        onClick={handleToggle}
                        size="small"
                        style={{width:"40%", margin:"1em auto"}}
                        primary
                    /> 
                    {
                        (
                            (seconds > 0) && 
                            <Button 
                                secondary
                                label="Save"
                                icon={<Save/>}
                                onClick={() => updateTimer(action.save)}
                                size="small"
                                style={{width:"40%", margin:"1em auto"}}
                                disabled={running}
                            />
                        )
                    }
                </div>

            </CardBody>
            <CardFooter
                style={{
                    backgroundColor: "lavender",
                }}
            >
                <div 
                    className="footerDiv"
                    style={{
                        marginLeft:"1em",
                        fontSize: ".75em"
                    }}
                >
                    Created: {new Date(created_at).toLocaleString()}
                </div>
                <div className="deleteButton">
                    <Button 
                        a11yTitle="Delete timer" 
                        onClick={() => updateTimer(action.delete)}
                        icon={<Trash color="plain"/>}
                        tip="Delete this timer"
                    />
                </div>
            </CardFooter>
        </Card>
    )
}

export default TimerCard;