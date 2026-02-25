import { supabase } from "./supabase";

export const uploadReviewMedia = async (file, reviewId) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${reviewId}-${Date.now()}.${fileExt}`;
  const filePath = `review-media/${fileName}`;

  const { error } = await supabase.storage
    .from("products")   // 👈 your bucket name
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(filePath);

  return data.publicUrl;
};