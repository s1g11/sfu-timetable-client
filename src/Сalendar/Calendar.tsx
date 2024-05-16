import {EventType} from "../types/types.ts";
import s from './Calendar.module.css'

type PropsType = {
    events: EventType[],
    lastDate: number,
    firstDayOfWeek: number
}

export const Calendar = (props: PropsType) => {
    const week = [1, 2, 3, 4, 5, 6, 7]
    const month = [1,2,3,4,5,6]
    let currentDate = 0


    return (
        <table className={s.table}>
            <thead>
            <tr>
                <th>Понедельник</th>
                <th>Вторник</th>
                <th>Среда</th>
                <th>Четверг</th>
                <th>Пятница</th>
                <th>Суббота</th>
                <th>Воскресенье</th>
            </tr>
            </thead>
            <tbody>
            {month.map((_, key) => <tr key={key}> {week.map((t, key) => {
                if ((t === props.firstDayOfWeek || currentDate) && currentDate <= props.lastDate) {
                    currentDate++
                    return <td key={key}>
                        {currentDate <= props.lastDate && <h2>{currentDate}</h2>}
                        {currentDate <= props.lastDate && props.events.map(e => {

                            return +e.date.split('.')[0] === currentDate &&
                            <div key={e.id} style={{background: e.color || "#FFAF91"}}
                                 className={s.event}>
                                <h3>{e.title}</h3>
                                <p className={s.time}>{e.time}</p>
                                <p>{e.place}</p>
                                <div style={{background: e.color || "#FFAF91", }} className={s.inf}>
                                    <h3>{e.title}</h3>
                                    <p>{e.description}</p>
                                    <p className={s.time}>{e.time}</p>
                                    <p>Пройдет в: {e.place}</p>
                                    <div style={{background:"black", }} className={s.infArrow}></div>
                                </div>
                            </div>
                        })}
                    </td>
                } else {
                    return <td key={key}></td>
                }
            })}</tr>)}
            </tbody>
        </table>
    )
}

