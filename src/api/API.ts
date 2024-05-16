import axios from "axios"
import {EventType} from "../types/types.ts";
import { SetStateAction } from "react";

const instance = axios.create({
    baseURL: 'http://localhost:5000/events'
})

export const API = {
    fetchEvents: () => {
        return instance.get<SetStateAction<EventType[]>>('/')
    },
    getEvents: (month: string) => {
        return instance.get<SetStateAction<EventType[]>>(`/${month}`)
    },
    searchEvents: (title: string) => {
        return instance.get<SetStateAction<EventType[]>>(`/search/${title}`)
    }
}