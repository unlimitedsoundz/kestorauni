-- SQL script to replace "Cannoga College" and "Penkka University" with "Kestora University", and "Penkka" with "Kestora" in the database
-- Also updates email domain from @penkka.fi to @kestora.online and domain in URLs from penkka.fi to kestora.online
-- Run this in your Supabase SQL editor or PostgreSQL client

-- Update School table
UPDATE "School"
SET "name" = REPLACE(REPLACE(REPLACE("name", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "name" LIKE '%Cannoga College%' OR "name" LIKE '%Penkka University%' OR "name" LIKE '%Penkka%';

UPDATE "School"
SET "description" = REPLACE(REPLACE(REPLACE("description", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "description" LIKE '%Cannoga College%' OR "description" LIKE '%Penkka University%' OR "description" LIKE '%Penkka%';

UPDATE "School"
SET "imageUrl" = REPLACE("imageUrl", 'penkka.fi', 'kestora.online')
WHERE "imageUrl" LIKE '%penkka.fi%';

-- Update Department table
UPDATE "Department"
SET "name" = REPLACE(REPLACE(REPLACE("name", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "name" LIKE '%Cannoga College%' OR "name" LIKE '%Penkka University%' OR "name" LIKE '%Penkka%';

UPDATE "Department"
SET "description" = REPLACE(REPLACE(REPLACE("description", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "description" LIKE '%Cannoga College%' OR "description" LIKE '%Penkka University%' OR "description" LIKE '%Penkka%';

-- Update Course table
UPDATE "Course"
SET "title" = REPLACE(REPLACE(REPLACE("title", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "title" LIKE '%Cannoga College%' OR "title" LIKE '%Penkka University%' OR "title" LIKE '%Penkka%';

UPDATE "Course"
SET "description" = REPLACE(REPLACE(REPLACE("description", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "description" LIKE '%Cannoga College%' OR "description" LIKE '%Penkka University%' OR "description" LIKE '%Penkka%';

UPDATE "Course"
SET "imageUrl" = REPLACE("imageUrl", 'penkka.fi', 'kestora.online')
WHERE "imageUrl" LIKE '%penkka.fi%';

-- Update Faculty table
UPDATE "Faculty"
SET "name" = REPLACE(REPLACE(REPLACE("name", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "name" LIKE '%Cannoga College%' OR "name" LIKE '%Penkka University%' OR "name" LIKE '%Penkka%';

UPDATE "Faculty"
SET "bio" = REPLACE(REPLACE(REPLACE("bio", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "bio" LIKE '%Cannoga College%' OR "bio" LIKE '%Penkka University%' OR "bio" LIKE '%Penkka%';

UPDATE "Faculty"
SET "imageUrl" = REPLACE("imageUrl", 'penkka.fi', 'kestora.online')
WHERE "imageUrl" LIKE '%penkka.fi%';

UPDATE "Faculty"
SET "email" = REPLACE("email", '@penkka.fi', '@kestora.online')
WHERE "email" LIKE '%@penkka.fi%';

-- Update Student table
UPDATE "Student"
SET "name" = REPLACE(REPLACE(REPLACE("name", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "name" LIKE '%Cannoga College%' OR "name" LIKE '%Penkka University%' OR "name" LIKE '%Penkka%';

-- Note: We do not update the email in Student table because it might be personal email.
-- If you want to update the institutional email, you can uncomment the following line:
-- UPDATE "Student"
-- SET "email" = REPLACE("email", '@penkka.fi', '@kestora.online')
-- WHERE "email" LIKE '%@penkka.fi%';

-- Update News table
UPDATE "News"
SET "title" = REPLACE(REPLACE(REPLACE("title", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "title" LIKE '%Cannoga College%' OR "title" LIKE '%Penkka University%' OR "title" LIKE '%Penkka%';

UPDATE "News"
SET "content" = REPLACE(REPLACE(REPLACE("content", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "content" LIKE '%Cannoga College%' OR "content" LIKE '%Penkka University%' OR "content" LIKE '%Penkka%';

UPDATE "News"
SET "excerpt" = REPLACE(REPLACE(REPLACE("excerpt", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "excerpt" LIKE '%Cannoga College%' OR "excerpt" LIKE '%Penkka University%' OR "excerpt" LIKE '%Penkka%';

UPDATE "News"
SET "imageUrl" = REPLACE("imageUrl", 'penkka.fi', 'kestora.online')
WHERE "imageUrl" LIKE '%penkka.fi%';

-- Update Event table
UPDATE "Event"
SET "title" = REPLACE(REPLACE(REPLACE("title", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "title" LIKE '%Cannoga College%' OR "title" LIKE '%Penkka University%' OR "title" LIKE '%Penkka%';

UPDATE "Event"
SET "location" = REPLACE(REPLACE(REPLACE("location", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "location" LIKE '%Cannoga College%' OR "location" LIKE '%Penkka University%' OR "location" LIKE '%Penkka%';

UPDATE "Event"
SET "category" = REPLACE(REPLACE(REPLACE("category", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "category" LIKE '%Cannoga College%' OR "category" LIKE '%Penkka University%' OR "category" LIKE '%Penkka%';

UPDATE "Event"
SET "content" = REPLACE(REPLACE(REPLACE("content", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "content" LIKE '%Cannoga College%' OR "content" LIKE '%Penkka University%' OR "content" LIKE '%Penkka%';

UPDATE "Event"
SET "imageUrl" = REPLACE("imageUrl", 'penkka.fi', 'kestora.online')
WHERE "imageUrl" LIKE '%penkka.fi%';

-- Update AdminUser table
UPDATE "AdminUser"
SET "name" = REPLACE(REPLACE(REPLACE("name", 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')
WHERE "name" LIKE '%Cannoga College%' OR "name" LIKE '%Penkka University%' OR "name" LIKE '%Penkka%';

UPDATE "AdminUser"
SET "email" = REPLACE("email", '@penkka.fi', '@kestora.online')
WHERE "email" LIKE '%@penkka.fi%';

-- Update sections content in Course table (assuming sections is jsonb array with content field)
UPDATE "Course"
SET "sections" = (
    SELECT jsonb_agg(
        CASE
            WHEN elem ? 'content'
            THEN jsonb_set(elem, '{content}', to_jsonb(REPLACE(REPLACE(REPLACE(elem->>'content', 'Cannoga College', 'Kestora University'), 'Penkka University', 'Kestora University'), 'Penkka', 'Kestora')))
            ELSE elem
        END
    )
    FROM jsonb_array_elements("sections") AS elem
)
WHERE EXISTS (
    SELECT 1 FROM jsonb_array_elements("sections") AS elem
    WHERE elem->>'content' LIKE '%Cannoga College%' OR elem->>'content' LIKE '%Penkka University%' OR elem->>'content' LIKE '%Penkka%'
);

-- Note: We do not update the password field in AdminUser.

-- Check for any other tables that might contain this text and update accordingly.
-- For example, if there are tables like "PageContent", "Blog", etc., update them similarly.