import { getEventsSimplifiedByDateRecent } from "../../../utils/Events";
import { NextApiRequest, NextApiResponse } from "next";

// export default async (req: NextApiRequest, res: NextApiResponse) => {

const getEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const events = await getEventsSimplifiedByDateRecent();
    res.status(200).json(events);
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export default getEvents;