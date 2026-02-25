import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export const uploadReviewMedia = async (file) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `review-media/${fileName}`;

  const { error } = await supabase.storage
    .from("thekacustomz")   // 👈 your bucket name
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("thekacustomz")
    .getPublicUrl(filePath);

  return data.publicUrl;
};