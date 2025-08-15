export const behavioralRoles = ["Software Engineering", "Product Management", "UX Design", "IS Security" , "Data Science"]
export const behavioralFocus = ["Conflict resolution", "Leadership", "Teamwork", "Time management", "Adaptability", "Decision making", "Communication", "Random"]

export const technicalRoles = ["Full-stack Engineer", "Frontend Engineer", "Backend Engineer", "DevOps Engineer" , "AI/ML Engineer", "Mobile Developer", "Data Engineer"]

export const experienceLevels = ["Intern", "Entry-Level", "Junior / Mid-Level", "Senior", "Staff/Principal"]

export const DROPDOWN_CONFIGS = {
  behavioral: [
    { type: "behavioral", label: "Industry", name: "behavioral_role" },
    {
      type: "experience",
      label: "Experience",
      name: "behavioral_experience",
    },
    { type: "focus", label: "Focus", name: "behavioral_focus" },
  ],
  technical: [
    { type: "technical", label: "Role", name: "technical_role" },
    { type: "experience", label: "Experience", name: "technical_experience" },
  ],
};