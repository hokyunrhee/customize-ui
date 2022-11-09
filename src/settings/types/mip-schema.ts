import { z } from "zod";

export const MIPSchema = z.object({
  layout: z.array(
    z.object({
      i: z.string(),
      x: z.number(),
      y: z.number(),
      w: z.number(),
      h: z.number(),
    })
  ),
});

export type MIP = z.infer<typeof MIPSchema>;
