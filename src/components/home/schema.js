import { z } from "zod";

export const behavioralSchema = z.object({
  tab: z.literal("behavioral"),
  behavioral_role: z.string().min(1, "Required"),
  behavioral_experience: z.string().min(1, "Required"),
  behavioral_focus: z.string().min(1, "Focus area is required"),
  technical_role: z.string().optional(),
  technical_level: z.string().optional(),
});

export const technicalSchema = z.object({
  tab: z.literal("technical"),
  technical_role: z.string().min(1, "Required"),
  technical_experience: z.string().min(1, "Required"),
  behavioral_role: z.string().optional(),
  behavioral_experience: z.string().optional(),
  behavioral_focus: z.string().optional(),
});

export const formSchema = z.union([behavioralSchema, technicalSchema]);