// Request: http://localhost:3000/api/events/getevents
/*
    http://localhost:3000/api/events/getevents

    [
    {
        "id": "1933ad47-35a0-4a43-bd07-8c5f04254c2d",
        "name": "Test event",
        "description": "Lorem ipsun is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy\n text ever since the 1500s, when an unknown printer took a galley of \ntype and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, \nremaining essentially unchanged. It was popularised in the 1960s with \nthe release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n",
        "date": "2024-09-10",
        "location": "Virtual",
        "tags": [
        "Test",
        "Test2",
        "Test3",
        "Test4"
        ],
        "public": true,
        "organizer": "Pedro Kaleb De Je1",
        "equip": [
        "Pedro Jesus"
        ],
        "created_time": "2024-09-09T14:34:00.000Z",
        "last_edited_time": "2024-09-09T15:07:00.000Z",
        status: "Not started",
        "url": "https://www.notion.so/Test-event-1933ad4735a04a43bd078c5f04254c2d"
    }
    ]
    */

// http://localhost:3000/api/events/eventcount
// Res: {"count":1}


import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Chakra ui

import { Text, Heading, Image } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Tag, Input } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";

// Motion
import { motion } from "framer-motion";

import Fuse from "fuse.js";
import { remove as removeDiacritics } from "diacritics";

// Components
import EventCard from "@/components/events/EventCard";

export default function ListEvents() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        fetch("/api/events/getevents")
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                setFilteredEvents(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (search === "") {
            setFilteredEvents(events);
        } else {
            const fuse = new Fuse(events, {
                keys: ["name", "description", "tags"],
                includeScore: true,
            });

            const result = fuse.search(search).map((event) => event.item);
            setFilteredEvents(result);
        }
    }, [search, events]);

    function eventIsInFuture(event: any) {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return eventDate > currentDate;
    }

    function eventIsInPast(event: any) {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return eventDate < currentDate;
    }

    function eventIsInProgress(event: any) {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return eventDate === currentDate;
    }

    function eventIsExpired(event: any) {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return eventDate < currentDate;
    }

    function eventIsToday(event: any) {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return eventDate === currentDate;
    }

    function eventIncoming(event: any) {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return eventDate > currentDate;
    }


    // Percentage to time left to the event
    // 
    /*
    if today is 2024-09-09 and the event is 2024-09-10 the percentage is 50% - 1 day left
    if today is 2024-09-09 and the event is 2024-09-09 the percentage is 100% - 0 days left
    if today is 2024-09-09 and the event is 2024-09-08 the percentage is 100% - -1 days left
    if today is 2024-09-09 and the event is 2024-09-12 the percentage is 25% - 3 days left

    Calculate the percentage of days left to the event
    */
    function eventPercentage(event: any) {
        const eventDate = new Date(event.date) as any;
        const currentDate = new Date() as any;
        const diffTime = Math.abs(eventDate - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return 100 - diffDays;
    }
    

    function daysToEvent(event: any) {
        const eventDate = new Date(event.date) as any;
        const currentDate = new Date() as any;
        const diffTime = Math.abs(eventDate - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    function liveTextCoundown(event: any) {
        // Display an countdown to the event on the format: dd:hh:mm:ss
        const eventDate = new Date(event.date) as any;
        const currentDate = new Date() as any;
        
        const diffTime = Math.abs(eventDate - currentDate);

        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

        const diffMinutes = Math.ceil(diffTime / (1000 * 60));

        const diffSeconds = Math.ceil(diffTime / (1000));

        return `${diffDays} days ${diffHours} hours ${diffMinutes} minutes ${diffSeconds} seconds`;
    }





    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col space-y-4 justify-center items-center w-full"
        >
            <Heading>Events</Heading>
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for events"
                className="w-full max-w-lg"
            />
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                filteredEvents.map((event: any) => (
                    <EventCard event={event} key={event.id} />
                ))
            )}
        </motion.div>
    );
}
