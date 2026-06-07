-- ============================================
-- HALUOLEO WEBSITE - SUPABASE SETUP
-- Jalankan di Supabase Dashboard > SQL Editor
-- ============================================

-- 1. Tabel project_images
CREATE TABLE IF NOT EXISTS project_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_slug TEXT NOT NULL,         -- e.g. 'loonars-living'
  url TEXT NOT NULL,                  -- public URL dari Supabase Storage
  storage_path TEXT NOT NULL,         -- path di storage bucket
  caption TEXT DEFAULT '',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_images_slug 
  ON project_images(project_slug);
CREATE INDEX IF NOT EXISTS idx_project_images_order 
  ON project_images(project_slug, display_order);

-- 2. Row Level Security (baca publik, tulis hanya authenticated)
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read project_images"
  ON project_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated insert project_images"
  ON project_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated delete project_images"
  ON project_images FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated update project_images"
  ON project_images FOR UPDATE
  TO authenticated
  USING (true);

-- 3. Storage bucket (jalankan di Storage UI, bukan SQL)
-- Buka Supabase Dashboard > Storage > New Bucket
-- Nama: project-images
-- Centang: Public bucket
-- Lalu tambahkan policy:
--   SELECT: anon (public read)
--   INSERT: authenticated only
--   DELETE: authenticated only

-- ============================================
-- CARA BUAT ADMIN USER:
-- Supabase Dashboard > Authentication > Users > Invite User
-- Masukkan email kamu → invite → set password
-- ============================================
