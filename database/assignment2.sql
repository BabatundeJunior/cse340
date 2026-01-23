/* =========================
   Task 1 — Insert Tony Stark
   ========================= */
INSERT INTO public.account
  (account_firstname, account_lastname, account_email, account_password)
VALUES
  ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


/* ==========================================
   Task 2 — Update Tony Stark to Admin account
   ========================================== */
UPDATE public.account
SET account_type = 'Admin'::account_type
WHERE account_id = (
  SELECT account_id
  FROM public.account
  WHERE account_email = 'tony@starkent.com'
);


/* ==========================================
   Task 3 — Delete Tony Stark
   ========================================== */
DELETE FROM public.account
WHERE account_id = (
  SELECT account_id
  FROM public.account
  WHERE account_email = 'tony@starkent.com'
);


/* ==========================================================
   Task 4 — Update "GM Hummer" description using REPLACE
   ========================================================== */
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_id = (
  SELECT inv_id
  FROM public.inventory
  WHERE inv_make = 'GM' AND inv_model = 'Hummer'
);


/* ==========================================================
   Task 5 — INNER JOIN: Sport inventory (make, model, category)
   Expect 2 rows
   ========================================================== */
SELECT i.inv_make, i.inv_model, c.classification_name
FROM public.inventory i
INNER JOIN public.classification c
  ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';


/* ==========================================================
   Task 6 — Add "/vehicles" into image paths
    /images/a.jpg  -> /images/vehicles/a.jpg
   ========================================================== */
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
