# Mein Vue 3 Projekt

Dies ist ein Test, um sicherzustellen, dass GitHub funktioniert!

hallo dina sagt elgam


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,  -- Speichere niemals Klartext-Passwörter!
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_activities (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL,
    activity_time TIMESTAMP DEFAULT NOW() ..
);