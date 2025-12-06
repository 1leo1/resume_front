-- Migration: Refactor Dummy Data to Child Table
-- 1. Create new table
-- 2. Populate with cross-product of templates and industries
-- 3. Drop old column

BEGIN;

-- 1. Create table
CREATE TABLE IF NOT EXISTS template_dummy_data (
    id SERIAL PRIMARY KEY,
    template_slug TEXT NOT NULL REFERENCES templates(slug) ON DELETE CASCADE,
    industry TEXT NOT NULL,
    data JSONB NOT NULL,
    UNIQUE(template_slug, industry)
);

CREATE INDEX IF NOT EXISTS idx_template_dummy_data_slug_industry ON template_dummy_data(template_slug, industry);

-- 2. Populate data
-- We map each industry to a "source template" that contains the best dummy data for that industry.
WITH source_data AS (
    SELECT slug, dummy_data FROM templates
),
industry_map AS (
    SELECT 'tech' as industry, 'tech-innovator' as source_slug UNION ALL
    SELECT 'business' as industry, 'classic-business' as source_slug UNION ALL
    SELECT 'healthcare' as industry, 'healthcare-professional' as source_slug UNION ALL
    SELECT 'creative' as industry, 'creative-portfolio' as source_slug UNION ALL
    SELECT 'education' as industry, 'academic-scholar' as source_slug UNION ALL
    SELECT 'legal' as industry, 'legal-excellence' as source_slug UNION ALL
    SELECT 'marketing' as industry, 'marketing-pro' as source_slug UNION ALL
    SELECT 'other' as industry, 'modern-professional' as source_slug
)
INSERT INTO template_dummy_data (template_slug, industry, data)
SELECT 
    t.slug,
    im.industry,
    sd.dummy_data
FROM templates t
CROSS JOIN industry_map im
JOIN source_data sd ON sd.slug = im.source_slug
ON CONFLICT (template_slug, industry) DO UPDATE SET data = EXCLUDED.data;

-- 3. Drop old column
-- Note: We wrap this in a safe block or comment it out if you want to verify first.
-- For this task, we will proceed with dropping it to complete the refactor.
ALTER TABLE templates DROP COLUMN IF EXISTS dummy_data;

COMMIT;
