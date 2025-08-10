export async function fetchRecentInterviews(user_id) {
  try{
    const response = await fetch(`/api/interviews/db?user_id=${user_id}`)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const result = await response.json();
    return result.data;
  } catch(err){
    console.error("Failed to get recent interviews: ", err.message);
    throw err;
  }
}