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
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role_id uuid REFERENCES roles(id),
  department text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create personal info table
CREATE TABLE personal_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
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

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, full_name, role_id, department)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    (SELECT id FROM roles WHERE name = COALESCE(NEW.raw_user_meta_data->>'role', 'Profesor')),
    COALESCE(NEW.raw_user_meta_data->>'department', 'General')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to create initial users
CREATE OR REPLACE FUNCTION create_initial_users()
RETURNS void AS $$
DECLARE
  convivencia_id uuid;
  director_id uuid;
  profesor_id uuid;
BEGIN
  -- Create users in auth.users
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
  VALUES 
    (gen_random_uuid(), 'convivencia@edu.com', crypt('password123', gen_salt('bf')), now())
  RETURNING id INTO convivencia_id;
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
  VALUES 
    (gen_random_uuid(), 'director@edu.com', crypt('password123', gen_salt('bf')), now())
  RETURNING id INTO director_id;
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
  VALUES 
    (gen_random_uuid(), 'profesor@edu.com', crypt('password123', gen_salt('bf')), now())
  RETURNING id INTO profesor_id;

  -- Update users with correct roles
  UPDATE users 
  SET role_id = (SELECT id FROM roles WHERE name = 'Responsable de Convivencia'),
      full_name = 'Ana Martínez',
      department = 'Convivencia Escolar'
  WHERE email = 'convivencia@edu.com';

  UPDATE users 
  SET role_id = (SELECT id FROM roles WHERE name = 'Director'),
      full_name = 'Carlos Rodríguez',
      department = 'Dirección'
  WHERE email = 'director@edu.com';

  UPDATE users 
  SET role_id = (SELECT id FROM roles WHERE name = 'Profesor'),
      full_name = 'María García',
      department = 'Matemáticas'
  WHERE email = 'profesor@edu.com';

  -- Insert personal info
  INSERT INTO personal_info (user_id, phone, address, emergency_contact)
  SELECT id, '+1234567890', 'Calle Principal 123', 'Juan Pérez - +1987654321'
  FROM users WHERE email = 'convivencia@edu.com';

  INSERT INTO personal_info (user_id, phone, address, emergency_contact)
  SELECT id, '+1234567891', 'Avenida Central 456', 'Laura López - +1987654322'
  FROM users WHERE email = 'director@edu.com';

  INSERT INTO personal_info (user_id, phone, address, emergency_contact)
  SELECT id, '+1234567892', 'Plaza Mayor 789', 'Pedro Sánchez - +1987654323'
  FROM users WHERE email = 'profesor@edu.com';
END;
$$ LANGUAGE plpgsql;

-- Create initial users
SELECT create_initial_users();

-- Clean up
DROP FUNCTION create_initial_users();