-- Insere alguns esportes na tabela 'sports'
-- A tabela 'sports' tem apenas uma coluna chamada 'name' que é a chave primária.
INSERT INTO sports (name) VALUES ('FUTSAL') ON CONFLICT (name) DO NOTHING;
INSERT INTO sports (name) VALUES ('VOLEI') ON CONFLICT (name) DO NOTHING;
INSERT INTO sports (name) VALUES ('BASQUETE') ON CONFLICT (name) DO NOTHING;
INSERT INTO sports (name) VALUES ('HANDEBOL') ON CONFLICT (name) DO NOTHING;
INSERT INTO sports (name) VALUES ('BALEADO') ON CONFLICT (name) DO NOTHING;