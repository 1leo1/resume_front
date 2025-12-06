import re

input_file = '/Users/gaurav/Documents/code/resume/resume-enhancer/resume_front/final_templates.sql'
output_file = '/Users/gaurav/Documents/code/resume/resume-enhancer/resume_front/final_templates.sql'

with open(input_file, 'r') as f:
    content = f.read()

# Regex to capture the INSERT INTO templates blocks
# We assume the file structure is consistent:
# INSERT INTO templates (...) VALUES
# (
#   'slug',
#   ...
#   $data${...}$data$,
#   bool
# );

# We want to extract:
# 1. The slug
# 2. The dummy data (including the $data$ quotes)
# 3. The rest of the values (excluding dummy data)

# Let's parse the file into blocks based on "INSERT INTO templates"
blocks = content.split('INSERT INTO templates')

header = blocks[0]
new_content = [header]

# Add CREATE TABLE and TEMP TABLE setup after the DELETE
setup_sql = """
-- Create table for dummy data
CREATE TABLE IF NOT EXISTS template_dummy_data (
    id SERIAL PRIMARY KEY,
    template_slug TEXT NOT NULL REFERENCES templates(slug) ON DELETE CASCADE,
    industry TEXT NOT NULL,
    data JSONB NOT NULL,
    UNIQUE(template_slug, industry)
);

CREATE INDEX IF NOT EXISTS idx_template_dummy_data_slug_industry ON template_dummy_data(template_slug, industry);

-- Create temp table for source data
CREATE TEMP TABLE temp_source_data (
    slug TEXT,
    dummy_data JSONB
);

INSERT INTO temp_source_data (slug, dummy_data) VALUES
"""

# We will collect source data values here
source_data_values = []
# We will collect the modified template inserts here
template_inserts = []

# Map of slug -> dummy_data (for the temp table)
slug_data_map = {}

# Regex to parse the values
# Values: slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium
# We need to be careful with the $structure$ and $data$ quoting.
# The pattern roughly matches:
# \(\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(\$structure\$.*?\$structure\$),\s*'([^']+)',\s*(NULL|'[^']+'),\s*(\$data\$.*?\$data\$),\s*(true|false)\s*\);

pattern = re.compile(r"\(\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*(\$structure\$[\s\S]*?\$structure\$),\s*'([^']+)',\s*(NULL|'[^']+'),\s*(\$data\$[\s\S]*?\$data\$),\s*(true|false)\s*\);", re.DOTALL)

# Process blocks
for block in blocks[1:]:
    # The block starts with " (slug, name... ) VALUES" (or similar) and then the values
    # We need to find the VALUES part
    values_match = pattern.search(block)
    if values_match:
        slug = values_match.group(1)
        name = values_match.group(2)
        desc = values_match.group(3)
        ind = values_match.group(4)
        tags = values_match.group(5)
        structure = values_match.group(6)
        styles = values_match.group(7)
        thumb = values_match.group(8)
        data = values_match.group(9)
        premium = values_match.group(10)

        slug_data_map[slug] = data
        source_data_values.append(f"('{slug}', {data})")

        # Reconstruct the INSERT for templates (without dummy_data)
        # We need to preserve the comments and surrounding text in the block
        # The block contains the comments before the INSERT usually?
        # No, the split removed "INSERT INTO templates".
        # The block starts with " (slug, name, ...) VALUES \n (..."
        
        # Let's reconstruct the block.
        # The original block had: " (slug, name, description, industry, tags, structure, styles, thumbnail_url, dummy_data, is_premium) VALUES\n(..."
        
        # We want: " (slug, name, description, industry, tags, structure, styles, thumbnail_url, is_premium) VALUES\n(..."
        
        # We can replace the column list and the values.
        
        # Find the column list
        col_list_end = block.find('VALUES')
        col_list = block[:col_list_end]
        new_col_list = col_list.replace(', dummy_data', '')
        
        # Reconstruct the values part
        # We use the captured groups to rebuild it without data
        new_values = f"(\n  '{slug}',\n  '{name}',\n  '{desc}',\n  '{ind}',\n  '{tags}',\n  {structure},\n  '{styles}',\n  {thumb},\n  {premium}\n);"
        
        # Replace the original values with new values in the block
        # We need to be careful to replace only the values part
        # The regex match span gives us the location of the values
        start, end = values_match.span()
        new_block = new_col_list + 'VALUES\n' + new_values + block[end:]
        
        template_inserts.append("INSERT INTO templates" + new_block)

# Construct the new file content

# 1. Header (already in new_content[0])
# We need to inject the setup_sql after the DELETEs in the header
# The header ends with "DELETE FROM templates ... );\n\n"
delete_marker = ");\n\n"
header_end = header.rfind(delete_marker)
if header_end != -1:
    header_part1 = header[:header_end+len(delete_marker)]
    header_part2 = header[header_end+len(delete_marker):]
    
    # Insert setup_sql and source_data population
    source_data_sql = setup_sql + ",\n".join(source_data_values) + ";\n\n"
    
    final_header = header_part1 + source_data_sql + header_part2
else:
    # Fallback if marker not found (unlikely)
    final_header = header + "\n" + setup_sql + ",\n".join(source_data_values) + ";\n\n"

# 2. Template Inserts
final_inserts = "\n".join(template_inserts)

# 3. Footer (Population of template_dummy_data)
footer_sql = """
-- Populate template_dummy_data from temp_source_data
WITH industry_map AS (
    SELECT 'tech' as industry, 'tech-innovator' as source_slug UNION ALL
    SELECT 'business', 'classic-business' UNION ALL
    SELECT 'healthcare', 'healthcare-professional' UNION ALL
    SELECT 'creative', 'creative-portfolio' UNION ALL
    SELECT 'education', 'academic-scholar' UNION ALL
    SELECT 'legal', 'legal-excellence' UNION ALL
    SELECT 'marketing', 'marketing-pro' UNION ALL
    SELECT 'other', 'modern-professional'
)
INSERT INTO template_dummy_data (template_slug, industry, data)
SELECT 
    t.slug,
    im.industry,
    sd.dummy_data
FROM templates t
CROSS JOIN industry_map im
JOIN temp_source_data sd ON sd.slug = im.source_slug;

-- Drop Temp Table
DROP TABLE temp_source_data;
"""

final_content = final_header + final_inserts + footer_sql

with open(output_file, 'w') as f:
    f.write(final_content)

print("Successfully updated final_templates.sql")
