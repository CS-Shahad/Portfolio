# Shahad Al-Matrafi Portfolio

A professional portfolio website for a Data Analysis | AI | Automation professional. Built with React + Vite, connected to Supabase for content management, and Formspree for contact form emails.

---

## Environment Variables

Set these in your Replit Secrets (or `.env` file for local development):

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL (e.g. `https://xxxx.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `VITE_FORMSPREE_ENDPOINT` | Your Formspree form endpoint (e.g. `https://formspree.io/f/xxxxxxxx`) |

---

## Supabase Database Setup

Run the following SQL in your **Supabase project → SQL Editor** to create all required tables.

---

### 1. `about` — Bio section

```sql
create table about (
  id serial primary key,
  bio text not null,
  keywords jsonb default '[]'
);
```

**Example row:**
```sql
insert into about (bio, keywords) values (
  'I am a Data & AI Professional dedicated to translating vast, complex datasets into precise, actionable strategies.',
  '["predictive analytics", "automation pipelines", "machine learning", "strategic vision", "data engineering"]'
);
```

---

### 2. `experiences` — Work timeline

```sql
create table experiences (
  id serial primary key,
  role text not null,
  company text not null,
  duration text not null,
  achievements jsonb default '[]'
);
```

**Example row:**
```sql
insert into experiences (role, company, duration, achievements) values (
  'Data Scientist',
  'Company Name',
  '2022 - Present',
  '["Led end-to-end ML pipeline development.", "Reduced processing time by 40%."]'
);
```

---

### 3. `projects` — Projects grid and detail pages

```sql
create table projects (
  id serial primary key,
  title text not null,
  description text,
  thumbnail_url text,
  tags jsonb default '[]',
  github_url text,
  overview text,
  tools_used jsonb default '[]',
  video_url text,
  image_gallery jsonb default '[]',
  outcome text
);
```

**Column notes:**
- `tags` — array of strings, e.g. `'["AI", "Data Analysis"]'`. Accepted values: `"AI"`, `"Data Analysis"`, `"Automation"`
- `thumbnail_url` — full URL to the project cover image (Supabase Storage or external)
- `github_url` — link to the specific project repo
- `image_gallery` — array of image URLs shown in the project detail page
- `video_url` — optional video URL shown in the project detail page

**Example row:**
```sql
insert into projects (title, description, thumbnail_url, tags, github_url, overview, tools_used, outcome) values (
  'Customer Churn Predictor',
  'A machine learning pipeline that predicts customer churn with 92% accuracy.',
  'https://your-storage-url/project-thumbnail.jpg',
  '["AI", "Data Analysis"]',
  'https://github.com/shahadmatrafi/project-name',
  'Built an end-to-end predictive model to identify at-risk customers.',
  '["Python", "scikit-learn", "Pandas", "PostgreSQL"]',
  'Reduced overall churn by 18% in the first quarter.'
);
```

---

### 4. `skills` — Skills grid

```sql
create table skills (
  id serial primary key,
  name text not null,
  category text not null,
  icon_name text
);
```

**`category` accepted values:** `"Artificial Intelligence"`, `"Automation"`, `"Data Analysis"`, `"Technical Stack"`

**Example rows:**
```sql
insert into skills (name, category, icon_name) values
  ('Machine Learning', 'Artificial Intelligence', 'FiCpu'),
  ('Deep Learning', 'Artificial Intelligence', 'FiLayers'),
  ('NLP', 'Artificial Intelligence', 'FiMessageSquare'),
  ('ETL Pipelines', 'Automation', 'FiRepeat'),
  ('Apache Airflow', 'Automation', 'FiWind'),
  ('Statistical Modeling', 'Data Analysis', 'FiPieChart'),
  ('Data Visualization', 'Data Analysis', 'FiMonitor'),
  ('Python', 'Technical Stack', 'FiCode'),
  ('SQL', 'Technical Stack', 'FiDatabase'),
  ('Power BI', 'Technical Stack', 'FiBarChart2');
```

---

### 5. `certifications` — Auto-scrolling carousel

```sql
create table certifications (
  id serial primary key,
  title text not null,
  issuer text,
  badge_url text
);
```

**Column notes:**
- `badge_url` — URL to the certificate image (upload to Supabase Storage bucket)

**Example rows:**
```sql
insert into certifications (title, issuer, badge_url) values
  ('AWS Certified Machine Learning', 'Amazon Web Services', 'https://your-storage-url/aws-cert.png'),
  ('Data Engineering Professional', 'Google Cloud', 'https://your-storage-url/gcp-cert.png');
```

**Supabase Storage bucket setup for certificates:**
1. Go to Supabase → Storage → New Bucket
2. Name it `certifications`, set it to **Public**
3. Upload your certificate images
4. Copy the public URL and paste it as `badge_url`

---

### 6. `contact_messages` — Contact form submissions

```sql
create table contact_messages (
  id serial primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default now()
);
```

> Messages are automatically inserted here whenever someone submits the contact form. No manual data needed.

---

### 7. `personal_info` — "Know More About Me" section

```sql
create table personal_info (
  id serial primary key,
  books jsonb default '[]',
  events jsonb default '[]'
);
```

**Column notes:**

`books` — array of objects, each with a `title` and `notes` array:
```json
[
  {
    "title": "Thinking, Fast and Slow by Daniel Kahneman",
    "notes": [
      "System 1 vs System 2 thinking shapes every decision.",
      "Cognitive biases are predictable once you are aware of them."
    ]
  },
  {
    "title": "The Signal and the Noise by Nate Silver",
    "notes": [
      "Most data is noise — finding the true signal requires discipline.",
      "Probabilistic thinking beats point predictions almost every time."
    ]
  }
]
```

`events` — array of objects for hackathons and competitions:
```json
[
  {
    "id": "1",
    "title": "National AI Hackathon 2024",
    "description": "Built a real-time demand forecasting model in 48 hours. Reached top 5 finalists.",
    "date": "Nov 2024",
    "photo_url": "https://your-storage-url/hackathon-photo.jpg"
  }
]
```

**Example insert:**
```sql
insert into personal_info (books, events) values (
  '[{"title": "Thinking, Fast and Slow", "notes": ["Key insight 1", "Key insight 2"]}]',
  '[{"id": "1", "title": "AI Hackathon 2024", "description": "Built a forecasting model.", "date": "2024", "photo_url": ""}]'
);
```

---

## Supabase Storage Buckets

Create these buckets under **Supabase → Storage** (all set to **Public**):

| Bucket Name | Used For |
|---|---|
| `certifications` | Certificate badge images |
| `project-media` | Project thumbnails, gallery images, videos |
| `events` | Hackathon and competition photos |

---

## Row Level Security (RLS)

For the `contact_messages` table, enable RLS and add a policy that allows anonymous inserts:

```sql
alter table contact_messages enable row level security;

create policy "Allow anonymous inserts"
on contact_messages
for insert
to anon
with check (true);
```

For all other tables (read-only from the frontend), allow anonymous selects:

```sql
-- Run for each table: about, experiences, projects, skills, certifications, personal_info
alter table about enable row level security;
create policy "Allow public read" on about for select to anon using (true);

alter table experiences enable row level security;
create policy "Allow public read" on experiences for select to anon using (true);

alter table projects enable row level security;
create policy "Allow public read" on projects for select to anon using (true);

alter table skills enable row level security;
create policy "Allow public read" on skills for select to anon using (true);

alter table certifications enable row level security;
create policy "Allow public read" on certifications for select to anon using (true);

alter table personal_info enable row level security;
create policy "Allow public read" on personal_info for select to anon using (true);
```

---

## Local Development

```bash
pnpm install
pnpm --filter @workspace/portfolio run dev
```
