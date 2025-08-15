import supabaseAnon from '@/lib/supabaseAnon';


export default async function getInterviewDetails(id) {
  const { data, error } = await supabaseAnon
    .from('interview_details')
    .select('interview_id, question, feedback')
    .eq('interview_id', id)
    .maybeSingle();

  if (error) throw error;
  if (!data) {
    const e = new Error('Not found or unauthorized');
    e.status = 404;
    throw e;
  }
  return data;
}
