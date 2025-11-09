# Veritas Mini Kanban

Mini Kanban Fullstack – React + Go

![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white) ![Go](https://img.shields.io/badge/Go-1.25-00ADD8?style=flat-square&logo=go&logoColor=white) ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=0c0c0c) ![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white) ![Beautiful DnD](https://img.shields.io/badge/Beautiful%20DnD-13.1-FF4785?style=flat-square&logo=react&logoColor=white)


<img width="1855" height="923" alt="image" src="https://github.com/user-attachments/assets/41c317e6-79d8-448b-adf5-eb31db94aa68" />



## Descrição geral

Aplicação fullstack que expõe um quadro Kanban com três colunas fixas (À Fazer, Em Progresso, Concluído). O frontend permite criar, editar, mover e excluir tarefas com drag and drop usando Beautiful DnD. O backend em Go fornece uma API REST que persiste dados em MySQL. Docker Compose orquestra aplicação e banco.

## Tecnologias utilizadas

- **Docker + Docker Compose**: provisionamento e orquestração de containers para backend e banco.

- **Go (Golang)**: implementação da API REST com [github.com/gin-gonic/gin](https://pkg.go.dev/github.com/gin-gonic/gin), responsável por autenticar CORS, mapear rotas e conectar-se ao MySQL.

- **React 19 com Vite 7**: construção do SPA e tooling rápido para desenvolvimento.

- **Tailwind CSS 4**: estilização utilitária via integração do plugin oficial (`@tailwindcss/vite`).

- **Beautiful DnD**: biblioteca de drag and drop utilizada em [`frontend/webapp/src/components/Board.jsx`](frontend/webapp/src/components/Board.jsx) para reordenar tarefas entre colunas e enviar atualizações ao backend.

- **Axios**: cliente HTTP centralizado em [`frontend/webapp/src/axios/axios.js`](frontend/webapp/src/axios/axios.js).

- **MySQL 8**: banco relacional persistido em container dedicado, com schema esperado para tabelas `Tasks` e `Users`.

## Arquitetura geral

A aplicação é dividida em dois serviços:

- **Backend Go**: exposto em `:8080`, conecta-se ao MySQL via [`backend/db/conn.go`](backend/db/conn.go). As rotas definidas em [`backend/main.go`](backend/main.go) delegam a controllers, que chamam casos de uso e repositórios para acesso aos modelos. CORS libera o domínio do Vite durante o desenvolvimento.

- **Frontend React**: servido pelo Vite em `:5173` (dev). Consome a API REST via Axios, usando Context API para compartilhar estado do quadro e gerenciamento dos formulários.

Comunicação entre frontend e backend acontece por chamadas RESTful com payloads JSON. A atualização de status após drag and drop dispara `PATCH /tasks/` para manter base sincronizada.

## Estrutura de diretórios

```
.
├── .gitignore
├── docker-compose.yml
├── README.md
│
├── backend/
│   ├── Dockerfile
│   ├── go.mod
│   ├── main.go
│   ├── controller/
│   │   ├── task_controller.go
│   │   └── user_controller.go
│   ├── db/
│   │   └── conn.go
│   ├── model/
│   │   ├── task.go
│   │   ├── updateRequest.go
│   │   └── user.go
│   ├── repository/
│   │   ├── task_Repository.go
│   │   └── user_repository.go
│   └── usecase/
│       ├── task_usecase.go
│       └── user_usecase.go
│
├── frontend/
│   └── webapp/
│       ├── Dockerfile
│       ├── eslint.config.js
│       ├── index.html
│       ├── package.json
│       ├── README.md
│       ├── vite.config.js
│       ├── public/
│       └── src/
│           ├── App.css
│           ├── App.jsx
│           ├── index.css
│           ├── main.jsx
│           ├── axios/
│           │   ├── axios.js
│           │   ├── delay.js
│           │   └── sql.js
│           └── components/
│               ├── Bin.jsx
│               ├── Board.jsx
│               ├── Column.jsx
│               ├── Container.jsx
│               ├── Form.jsx
│               ├── Task.jsx
│               ├── TaskContext.jsx
│               └── useTaskContext.jsx
│
├── init-scripts/
│   └── insert_tasks_real.sql
│
└── docs/
  └── (documentação)

```

- **backend/**: microcamadas organizadas (controller → usecase → repository → model) para manter responsabilidades claras.
- **frontend/webapp/**: SPA React criada com Vite; subpastas `components/` concentram UI e lógica do quadro; `axios/` centraliza configurações HTTP.
- **init-scripts/**: scripts SQL opcionais para carga inicial de dados (referenciados via `DB_INIT_SCRIPT`).
- **docs/**: diagramas do desafio (user flow obrigatório e outros opcionais).

## Como rodar o projeto

### Via Docker Compose (RECOMENDADO)

1. Certifique-se de ter Docker e Docker Compose instalados.

2. Execute:

```bash

docker-compose  up  --build

```
Caso aconteça alguma problema na criação dos conteiners, use o comando ```  docker-compose down -v ``` e tente novamente.


- O backend será exposto em `http://localhost:8080`.

- O frontend será exposto em `http://localhost:5174`.

- O container `veritas_db` inicia MySQL em `localhost:3307`.

### Execução manual

#### Backend

```bash

cd  backend

go  mod  download

DB_HOST=localhost  DB_PORT=3307  go  run  main.go

```

- O serviço sobe em `:8080`. O backend lê `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`, `DB_HOST` e `DB_PORT`, assumindo por padrão `db:3306` quando não informados.

#### Frontend

```bash

cd  frontend/webapp

npm  install

npm  run  dev

```

- A interface fica em `http://localhost:5173`. O proxy CORS já está liberado no backend.

## Variáveis de ambiente

| Variável | Descrição | Valor padrão (docker-compose) |

| --------------------- | -------------------------------- | ----------------------------------------- |

| `MYSQL_ROOT_PASSWORD` | senha do root no container MySQL | `VERITAS` |

| `MYSQL_DATABASE` | nome do schema utilizado | `VERITASdb` |

| `MYSQL_USER` | usuário de aplicação | `VERITAS` |

| `MYSQL_PASSWORD` | senha do usuário | `VERITAS` |

| `DB_HOST` | host do banco para o backend | `db` (no Docker) ou `localhost` (local) |

| `DB_PORT` | porta TCP | `3306` (Docker) / `3307` (local override) |

| `DB_INIT_SCRIPT` | caminho absoluto ou relativo do script SQL opcional | vazio |

[`backend/db/conn.go`](backend/db/conn.go) agora resolve host, porta, credenciais e schema a partir dessas variáveis, garantindo defaults seguros quando não forem informadas. Defina `DB_INIT_SCRIPT` para executar o SQL inicial automaticamente.

## Decisões técnicas

- **Go + Gin**: escolhido pela simplicidade para montar handlers REST claros e leves, com suporte fácil a middlewares como CORS.

- **Arquitetura em camadas**: controllers, usecases e repositórios desacoplados facilitam testes unitários e troca de fontes de dados.

- **React + Vite**: oferece hot reload rápido e build enxuto; integrações modernas (React 19, Context API) simplificam o gerenciamento de estado.

- **Beautiful DnD**: fornece experiência de drag and drop consistente com acessibilidade aceita e eventos ricos, integrados em [`frontend/webapp/src/components/Board.jsx`](frontend/webapp/src/components/Board.jsx).

- **MySQL 8**: banco relacional conhecido, com suporte nativo no driver Go e transações para futuras evoluções.

- **Docker Compose**: garante portabilidade do desafio, subindo API e banco com um comando.

- **Operações client-side**: à fim de evitar muitas chamadas à API, a UI é atualizada no cliente a partir das respostas do back-end, sem necessidade de requisições GET para cada alteração.

## Funcionalidades implementadas

- CRUD completo de tarefas via rotas REST (`/tasks/`).

- Possibilidade de associar uma tarefa à um usuário.

- Movimentação de cards entre colunas com atualização de status persistida.

- Exclusão rápida arrastando para o `Bin` no frontend.

- Formulário de criação/edição com preenchimento automático de usuários obtidos em `/users/all`.

- Feedback visual básico durante drag and drop e estados dos cards.

## Limitações conhecidas e melhorias futuras

- **Validação**: validações de entrada ainda simples (bindings do Gin). Implementar validação personalizada e mensagens localizadas.

- **Segurança**: Proteger endpoints com JWT, aplicando conceitos de autorização e autenticação.

## Documentação

- Fluxo do usuário disponível em `docs/user-flow.png`.

- Diagrama de dados em `docs/data-flow.png`.

  Ferramenta utilizada: Mermaid.


## Guia para utilização da aplicação

1. Acesse o frontend em `http://localhost:5174`.

2. Utilize o formulário para criar novas tarefas clicando no (+) na coluna de À Fazer. Atribuindo título, descrição, data de vencimento e usuário responsável. 

<img width="878" height="791" alt="image" src="https://github.com/user-attachments/assets/35ef29df-5fe6-4df4-ad21-dde700f397d5" />

3. Arraste e solte tarefas entre as colunas "À Fazer", "Em Progresso" e "Concluído" para atualizar seus status.

4. Para editar uma tarefa, clique nela para abrir o formulário preenchido com os dados atuais.

5. Para excluir uma tarefa, arraste-a para o ícone de lixeira (`Bin`) localizado na parte inferior da interface.

<img width="1235" height="788" alt="image" src="https://github.com/user-attachments/assets/c471aefa-b2b2-497a-85dc-1b8d59051c7c" />





## Licença

Projeto entregue para processo seletivo da Veritas Consultoria Empresarial.
