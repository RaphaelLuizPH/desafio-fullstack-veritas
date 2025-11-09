CREATE DATABASE IF NOT EXISTS VERITASdb;
USE VERITASdb;


SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET COLLATION_CONNECTION = utf8mb4_unicode_ci;


ALTER DATABASE VERITASdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS VERITASdb.Users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Tasks (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    DueDate DATE DEFAULT (CURRENT_DATE),
    Description TEXT,
    AssignedTo INT,
    Status ENUM( 'Completed', 'InProgress', 'ToDo') NOT NULL DEFAULT 'ToDo',
    CONSTRAINT FK_USER_TASK FOREIGN KEY (AssignedTo) REFERENCES Users(ID)
);




INSERT INTO VERITASdb.Users
(Name)
VALUES('Joao'), ('Maria'), ('Paulo'), ('Tiago');


INSERT INTO Tasks (Title, Description, DueDate, AssignedTo, Status) VALUES
('Implementar autenticação de usuários', 'Implementar sistema completo de autenticação com JWT, suportando login via email e redes sociais.', '2025-11-08', 1, 'ToDo'),
('Corrigir bug no login', 'Usuários relataram que não conseguem fazer login após atualização. Investigar logs e corrigir o problema.', '2025-11-09', 2, 'InProgress'),
('Design da página inicial', 'Criar layout moderno e responsivo para a página inicial, seguindo as diretrizes de design.', '2025-11-10', 3, 'Completed'),
('Integração com API de pagamento', 'Integrar gateway de pagamento Stripe/PayPal para processar transações de forma segura.', '2025-11-11', 4, 'ToDo'),
('Testes unitários do módulo de usuários', 'Escrever testes unitários cobrindo todos os métodos do módulo de gerenciamento de usuários.', '2025-11-12', 1, 'InProgress'),
('Documentação da API REST', 'Documentar todos os endpoints da API REST com exemplos de requisição e resposta.', '2025-11-13', 2, 'Completed'),
('Otimizar queries do banco de dados', 'Analisar e otimizar queries lentas do banco de dados que afetam a performance.', '2025-11-14', 3, 'ToDo'),
('Implementar cache com Redis', 'Configurar Redis para cache de sessões e dados frequentemente acessados.', '2025-11-15', 4, 'InProgress'),
('Criar relatório de vendas', 'Gerar relatório mensal de vendas com gráficos e métricas de desempenho.', '2025-11-16', 1, 'Completed'),
('Revisar código do frontend', 'Revisar pull requests do frontend para garantir qualidade e padrões de código.', '2025-11-17', 2, 'ToDo'),
('Configurar CI/CD pipeline', 'Configurar GitHub Actions para automação de testes e deploy contínuo.', '2025-11-18', 3, 'InProgress'),
('Migrar banco de dados para produção', 'Planejar e executar migração segura do banco de dados para ambiente de produção.', '2025-11-19', 4, 'Completed'),
('Implementar notificações por email', 'Implementar sistema de notificações por email para confirmações e alertas.', '2025-11-20', 1, 'ToDo'),
('Criar sistema de permissões', 'Criar sistema robusto de controle de acesso baseado em roles (RBAC).', '2025-11-21', 2, 'InProgress'),
('Melhorar performance do dashboard', 'Otimizar renderização do dashboard para melhorar velocidade de carregamento.', '2025-11-22', 3, 'Completed'),
('Refatorar código legado', 'Reescrever código antigo para padrões modernos e melhorar manutenibilidade.', '2025-11-23', 4, 'ToDo'),
('Adicionar suporte para i18n', 'Adicionar suporte para internacionalização (i18n) em português, inglês e espanhol.', '2025-11-24', 1, 'InProgress'),
('Implementar dark mode', 'Implementar tema escuro com sincronização com preferências do sistema.', '2025-11-25', 2, 'Completed'),
('Criar testes de integração', 'Escrever testes de integração para garantir funcionamento entre módulos.', '2025-11-26', 3, 'ToDo'),
('Documentar processo de deploy', 'Criar documentação passo a passo do processo de deployment em produção.', '2025-11-27', 4, 'InProgress');
