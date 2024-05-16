import {useEffect, useState} from 'react'
import './App.module.css'
import {API} from "./api/API.ts";
import {Calendar} from "./Сalendar/Calendar.tsx";
import {getDayOfWeek} from "./utils/getDayOfWeek.tsx";
import {getDaysAmount} from "./utils/getDaysAmount.ts";
import {monthNumberToName} from "./utils/MonthNumberToName.ts";
import s from './App.module.css'
import {Header} from "./Header/Header.tsx";
import lupa from './img/lupa.png'
import {SearchTable} from "./SearchTable/SearchTable.tsx";
import {EventType} from "./types/types.ts";

function App() {

    const date = new Date()

    const [events, setEvents] = useState<EventType[]>([])
    const [renderDate, setRenderDate] = useState([date.getMonth() + 1, date.getFullYear()])
    const [inputValue, setInputValue] = useState('')
    const [searchedEvents, setSearchedEvents] = useState<EventType[]>([])
    const fetchEvents = async () => {
        const res = await API.fetchEvents()
        if (res.data) {
            setEvents(res.data)
        }
    }
    const getEvents = async () => {
        const res = await API.getEvents(`${renderDate[0]}.${renderDate[1]}`)
        if (res.data) {
            setEvents(res.data)
        }
    }

    const searchEvents = async () => {
        const res = await API.searchEvents(inputValue)
        if (res.data) {
            setSearchedEvents(res.data)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    const onClickHandler = () => {
        searchEvents()
    }

    useEffect(() => {
        getEvents()
    }, [renderDate])

    return (
        <div className={s.app}>
            <Header />
            <div className={s.container}>
                <div className={s.monthSelect}>
                    <div>{renderDate[1]}</div>
                    <div className={s.buttonsContainer}>
                        <button onClick={() => {
                            if (renderDate[0] === 1) {
                                setRenderDate([12, renderDate[1] - 1])
                            } else {
                                setRenderDate([renderDate[0] - 1, renderDate[1]])
                            }
                        }}>{"<"}</button>
                        <span className={s.month}>{monthNumberToName(renderDate[0])}</span>
                        <button onClick={() => {
                            if (renderDate[0] === 12) {
                                setRenderDate([1, renderDate[1] + 1])
                            } else {
                                setRenderDate([renderDate[0] + 1, renderDate[1]])
                            }
                        }}>{">"}</button>
                    </div>
                </div>
                <Calendar events={events} firstDayOfWeek={getDayOfWeek(`1.${renderDate[0]}.${renderDate[1]}`)}
                          lastDate={getDaysAmount(`${renderDate[0]}.${renderDate[1]}`)}/>
                <div className={s.search}>
                    <div className={s.input}>
                        <input value={inputValue} onChange={e => setInputValue(e.currentTarget.value)}
                               placeholder={"Название события"} type="text"/>
                        <button onClick={onClickHandler} className={s.lupa}>< img src={lupa} alt=""/></button>
                    </div>
                    <SearchTable events={searchedEvents}/>
                </div>
            </div>
        </div>
    )
}

export default App
