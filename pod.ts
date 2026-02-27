import { createClient } from '@supabase/supabase-js'

// Initialize Supabase Client
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY')

async function uploadProofOfDelivery(file: File, tripId: string) {
  // 1. Define a unique file path: trips/trip-id/timestamp-filename
  const filePath = `trips/${tripId}/${Date.now()}_${file.name}`;

  // 2. Upload the file to Supabase Storage Bucket 'logistics-docs'
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('logistics-docs')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading file:', uploadError);
    return;
  }

  // 3. Get the public URL for the uploaded file
  const { data: urlData } = supabase.storage
    .from('logistics-docs')
    .getPublicUrl(filePath);

  // 4. Insert file metadata into the 'docs' database table
  const { error: dbError } = await supabase
    .from('docs')
    .insert({
      trip_id: tripId,
      type: 'POD', // Proof of Delivery
      file_url: urlData.publicUrl,
    });

  if (dbError) {
    console.error('Error saving document to database:', dbError);
    return;
  }

  console.log('Document uploaded and linked successfully!');
}
