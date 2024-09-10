import { getTotalPostCount } from "@/utils/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const count = await getTotalPostCount();
    res.status(200).json({ count });
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};