export default async function getInterviewDetails(interview_id){
  try{
    const response = await fetch(`/api/interviews/db/details?interview_id=${interview_id}`);
    if (!response.ok){
      throw new Error(`Response status: ${response.status}`)
    }
    const result = await response.json();
    return result.data;

  } catch(err) {
    console.error("Failed to get interview details for this specific interview ", err.message);
    throw err;
  }

}