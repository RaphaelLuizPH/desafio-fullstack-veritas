
# Veritas Mini Kanban

  

Mini Kanban Fullstack – React + Go

  

![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker&logoColor=white) ![Go](https://img.shields.io/badge/Go-1.25-00ADD8?style=flat-square&logo=go&logoColor=white) ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=0c0c0c) ![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white) ![Beautiful DnD](https://img.shields.io/badge/Beautiful%20DnD-13.1-FF4785?style=flat-square&logo=react&logoColor=white)

  

## Descrição geral

  

Aplicação fullstack que expõe um quadro Kanban com três colunas fixas (À Fazer, Em Progresso, Concluído). O frontend permite criar, editar, mover e excluir tarefas com drag and drop usando Beautiful DnD. O backend em Go fornece uma API REST que persiste dados em MySQL. Docker Compose orquestra aplicação e banco.

  

## Tecnologias utilizadas

  

-  **Docker + Docker Compose**: provisionamento e orquestração de containers para backend e banco.

-  **Go (Golang)**: implementação da API REST com [github.com/gin-gonic/gin](https://pkg.go.dev/github.com/gin-gonic/gin), responsável por autenticar CORS, mapear rotas e conectar-se ao MySQL.

-  **React 19 com Vite 7**: construção do SPA e tooling rápido para desenvolvimento.

-  **Tailwind CSS 4**: estilização utilitária via integração do plugin oficial (`@tailwindcss/vite`).

-  **Beautiful DnD**: biblioteca de drag and drop utilizada em [`frontend/webapp/src/components/Board.jsx`](frontend/webapp/src/components/Board.jsx) para reordenar tarefas entre colunas e enviar atualizações ao backend.

-  **Axios**: cliente HTTP centralizado em [`frontend/webapp/src/axios/axios.js`](frontend/webapp/src/axios/axios.js).

-  **MySQL 8**: banco relacional persistido em container dedicado, com schema esperado para tabelas `Tasks` e `Users`.

  

## Arquitetura geral

  

A aplicação é dividida em dois serviços:

  

-  **Backend Go**: exposto em `:8080`, conecta-se ao MySQL via [`backend/db/conn.go`](backend/db/conn.go). As rotas definidas em [`backend/main.go`](backend/main.go) delegam a controllers, que chamam casos de uso e repositórios para acesso aos modelos. CORS libera o domínio do Vite durante o desenvolvimento.

-  **Frontend React**: servido pelo Vite em `:5173` (dev). Consome a API REST via Axios, usando Context API para compartilhar estado do quadro e gerenciamento dos formulários.

  

Comunicação entre frontend e backend acontece por chamadas RESTful com payloads JSON. A atualização de status após drag and drop dispara `PATCH /tasks/` para manter base sincronizada.

  

## Estrutura de diretórios

  

```

/backend

main.go

controller/

task_controller.go

user_controller.go

usecase/

task_usecase.go

user_usecase.go

repository/

task_Repository.go

user_repository.go

model/

task.go

user.go

updateRequest.go

db/

conn.go

/frontend

webapp/

src/

App.jsx

main.jsx

components/

Board.jsx

Column.jsx

Task.jsx

TaskContext.jsx

Form.jsx

Bin.jsx

Container.jsx

useTaskContext.jsx

axios/

axios.js

index.css

package.json

vite.config.js

/docs

user-flow.png

```

  

-  **backend/**: microcamadas organizadas (controller → usecase → repository → model) para manter responsabilidades claras.

-  **frontend/webapp/**: SPA React criada com Vite; subpastas `components/` concentram UI e lógica do quadro; `axios/` centraliza configurações HTTP.

-  **docs/**: diagramas do desafio (user flow obrigatório e outros opcionais).

  

## Como rodar o projeto

  

### Via Docker Compose

  

1. Certifique-se de ter Docker e Docker Compose instalados.

2. Copie a configuração de variáveis (ver seção seguinte) para um arquivo `.env` na raiz, se necessário.

3. Execute:

  

```bash

docker-compose  up  --build

```

  

- O backend será exposto em `http://localhost:8080`.

- O frontend pode ser iniciado manualmente (veja próximo tópico) ou rodar via `npm run dev`.

- O container `veritas_db` inicia MySQL em `localhost:3306`.

  

### Execução manual

  

#### Backend

  

```bash

cd  backend

go  mod  download

go  run  main.go

```

  

- O serviço sobe em `:8080`. Ajuste [`backend/db/conn.go`](backend/db/conn.go) se quiser apontar para outro host/porta.

  

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

  

O backend hoje utiliza constantes em [`backend/db/conn.go`](backend/db/conn.go). Para ambientes diferentes, mover essas configurações para variáveis de ambiente é o próximo passo recomendado.

  

## Decisões técnicas

  

-  **Go + Gin**: escolhido pela simplicidade para montar handlers REST claros e leves, com suporte fácil a middlewares como CORS.

-  **Arquitetura em camadas**: controllers, usecases e repositórios desacoplados facilitam testes unitários e troca de fontes de dados.

-  **React + Vite**: oferece hot reload rápido e build enxuto; integrações modernas (React 19, Context API) simplificam o gerenciamento de estado.

-  **Beautiful DnD**: fornece experiência de drag and drop consistente com acessibilidade aceita e eventos ricos, integrados em [`frontend/webapp/src/components/Board.jsx`](frontend/webapp/src/components/Board.jsx).

-  **MySQL 8**: banco relacional conhecido, com suporte nativo no driver Go e transações para futuras evoluções.

-  **Docker Compose**: garante portabilidade do desafio, subindo API e banco com um comando.

  

## Funcionalidades implementadas

  

- CRUD completo de tarefas via rotas REST (`/tasks/`).

- Movimentação de cards entre colunas com atualização de status persistida.

- Exclusão rápida arrastando para o `Bin` no frontend.

- Formulário de criação/edição com preenchimento automático de usuários obtidos em `/users/all`.

- Feedback visual básico durante drag and drop e estados dos cards.

  

## Limitações conhecidas e melhorias futuras

  

-  **Validação**: validações de entrada ainda simples (bindings do Gin). Implementar validação personalizada e mensagens localizadas.



  

## Documentação

  

- Fluxo do usuário disponível em `docs/user-flow.png`.

- Diagrama de dados em `docs/data-flow.png`.

  



  

## Licença

  

Projeto entregue para processo seletivo da Veritas Consultoria Empresarial. 