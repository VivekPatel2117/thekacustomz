import { createClient } from "@supabase/supabase-js";
console.log("VITE_SUPABASE_URL:", import.meta.env.VITE_SUPABASE_URL);
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export const uploadProductImage = async (file, productName, isHero = false) => {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;

  const path = isHero
    ? `${productName}/hero/${fileName}`
    : `${productName}/${fileName}`;

  const { error } = await supabase.storage
    .from("thekacustomz")
    .upload(path, file, { upsert: true });

  if (error) throw error;

  return `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/thekacustomz/${path}`;
};
