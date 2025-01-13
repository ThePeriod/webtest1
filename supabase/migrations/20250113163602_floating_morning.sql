/*
  # Initial Schema Setup for Educational Institution Users

  1. New Tables
    - `roles`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `users`
      - `id` (uuid, primary key, matches auth.users.id)
      - `email` (text, unique)
      - `full_name` (text)
      - `role_id` (uuid, references roles)
      - `department` (text)
      - `created_at` (timestamp)
    
    - `personal_info`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `phone` (text)
      - `address` (text)
      - `emergency_contact` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
    - Set up secure view for user information
*/

-- Create roles table
CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create users table extending auth.users
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role_id uuid REFERENCES roles(id),
  department text,
  created_at timestamptz DEFAULT now()
);

-- Create personal info table
CREATE TABLE personal_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  phone text,
  address text,
  emergency_contact text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;

-- Roles policies
CREATE POLICY "Roles are viewable by all authenticated users"
  ON roles FOR SELECT
  TO authenticated
  USING (true);

-- Users policies
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users with Responsable de Convivencia role can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      INNER JOIN roles r ON u.role_id = r.id
      WHERE u.id = auth.uid() AND r.name = 'Responsable de Convivencia'
    )
  );

-- Personal info policies
CREATE POLICY "Users can view their own personal info"
  ON personal_info FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Responsable de Convivencia can view all personal info"
  ON personal_info FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      INNER JOIN roles r ON u.role_id = r.id
      WHERE u.id = auth.uid() AND r.name = 'Responsable de Convivencia'
    )
  );

-- Insert initial roles
INSERT INTO roles (name, description) VALUES
  ('Responsable de Convivencia', 'Supervisor de convivencia escolar'),
  ('Director', 'Director de la institución educativa'),
  ('Profesor', 'Docente de la institución'),
  ('Administrativo', 'Personal administrativo');

-- Insert test users
INSERT INTO users (id, email, full_name, role_id, department) VALUES
  -- Responsable de Convivencia
  ('d7bed83c-882c-4ce9-a9a2-d4a2f34a3f72', 'convivencia@edu.com', 'Ana Martínez', 
    (SELECT id FROM roles WHERE name = 'Responsable de Convivencia'),
    'Convivencia Escolar'),
  -- Director
  ('f6b6d83c-992c-4ce9-b9a2-d4a2f34a3f73', 'director@edu.com', 'Carlos Rodríguez',
    (SELECT id FROM roles WHERE name = 'Director'),
    'Dirección'),
  -- Profesor
  ('e5a5d83c-772c-4ce9-c9a2-d4a2f34a3f74', 'profesor@edu.com', 'María García',
    (SELECT id FROM roles WHERE name = 'Profesor'),
    'Matemáticas');

-- Insert test personal info
INSERT INTO personal_info (user_id, phone, address, emergency_contact) VALUES
  ('d7bed83c-882c-4ce9-a9a2-d4a2f34a3f72', '+1234567890', 'Calle Principal 123', 'Juan Pérez - +1987654321'),
  ('f6b6d83c-992c-4ce9-b9a2-d4a2f34a3f73', '+1234567891', 'Avenida Central 456', 'Laura López - +1987654322'),
  ('e5a5d83c-772c-4ce9-c9a2-d4a2f34a3f74', '+1234567892', 'Plaza Mayor 789', 'Pedro Sánchez - +1987654323');