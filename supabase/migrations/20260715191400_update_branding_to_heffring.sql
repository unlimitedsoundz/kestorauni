-- Update blog/news content from Kestora to Heffring
UPDATE "blogs"
SET 
  content = regexp_replace(content, 'Kestora', 'Heffring', 'g'),
  title = regexp_replace(title, 'Kestora', 'Heffring', 'g'),
  excerpt = regexp_replace(excerpt, 'Kestora', 'Heffring', 'g')
WHERE 
  content ILIKE '%Kestora%' 
  OR title ILIKE '%Kestora%' 
  OR excerpt ILIKE '%Kestora%';

-- Update FAQ content from Kestora to Heffring
UPDATE "faqs"
SET 
  question = regexp_replace(question, 'Kestora', 'Heffring', 'g'),
  answer = regexp_replace(answer, 'Kestora', 'Heffring', 'g')
WHERE 
  question ILIKE '%Kestora%' 
  OR answer ILIKE '%Kestora%';
