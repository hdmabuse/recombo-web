-- Supabase Storage Setup for RE:COMBO
-- Execute este script no editor SQL do Supabase

-- ============================================
-- 1. Criar bucket para arquivos do acervo
-- ============================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'recombo',
  'recombo',
  true,
  524288000, -- 500MB
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'audio/flac',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'application/pdf',
    'text/plain'
  ]
) ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. Políticas de acesso público (leitura)
-- ============================================

-- Permite leitura pública de qualquer arquivo no bucket 'recombo'
CREATE POLICY "Public access to recombo files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'recombo');

-- ============================================
-- 3. Políticas de acesso autenticado (escrita)
-- ============================================

-- Permite upload autenticado (usuários logados)
CREATE POLICY "Authenticated uploads to recombo"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'recombo' 
  AND auth.role() IN ('authenticated', 'service_role')
);

-- Permite atualização autenticada
CREATE POLICY "Authenticated updates to recombo"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'recombo' AND auth.role() IN ('authenticated', 'service_role'));

-- Permite delete apenas para service_role
CREATE POLICY "Service role can delete recombo files"
ON storage.objects
FOR DELETE
USING (bucket_id = 'recombo' AND auth.role() = 'service_role');

-- ============================================
-- 4. Pasta para thumbnails (pública)
-- ============================================

INSERT INTO storage.objects (bucket_id, name, is_public)
VALUES ('recombo', 'thumbnails/', false)
ON CONFLICT DO NOTHING;

-- ============================================
-- 5. Função para gerar URL pública
-- ============================================

-- Esta função retorna a URL pública de um arquivo
CREATE OR REPLACE FUNCTION storage.get_public_url(bucket_name TEXT, file_path TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN (
    SELECT CONCAT(
      (SELECT value FROM storage.config WHERE key = 'public_bucket_endpoint'),
      '/',
      bucket_name,
      '/',
      file_path
    )
  );
END;
$$;