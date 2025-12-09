# ToDo App - Projeto DAW3

Aplicação completa de gerenciamento de tarefas (ToDo) com backend Spring Boot e frontend React.

## Arquitetura

- **Backend**: Spring Boot 3.5.6 + PostgreSQL (Neon)
- **Frontend**: React 19.2.0 + Vite 7.2.4
- **Banco de Dados**: PostgreSQL (Neon Cloud)

## Estrutura do Projeto

```
ToDo_DAW3/
├── api/                    # Backend Spring Boot
│   ├── src/
│   │   └── main/
│   │       ├── java/       # Código fonte Java
│   │       └── resources/  # application.properties
│   └── pom.xml
└── frontend/               # Frontend React
    ├── src/
    │   ├── components/     # Componentes React
    │   ├── pages/          # Páginas da aplicação
    │   └── services/       # Serviços de API
    └── package.json
```

## Status do Projeto

- ✅ Backend completo com CRUD
- ✅ Frontend completo com todas as funcionalidades
- ✅ CORS configurado
- ✅ Validações implementadas
- ✅ Integração frontend-backend funcionando

## Como Executar

### Pré-requisitos

- **Java 17** ou superior
- **Maven** (ou use o wrapper `mvnw` incluído)
- **Node.js** 18+ e **npm**
- **Conexão com internet** (banco PostgreSQL na nuvem)

### Executar o Backend (API)

**IMPORTANTE:** Execute na pasta `api`, não na raiz do projeto!

Abra um terminal PowerShell na pasta `api`:

```powershell
cd api

# Usando Maven wrapper (Windows)
.\mvnw.cmd spring-boot:run

# Ou usando Maven instalado
mvn spring-boot:run
```

**Se a porta 8080 estiver em uso**, veja a seção "Troubleshooting" abaixo.

O backend estará disponível em: **http://localhost:8082**

**Endpoints disponíveis:**
- `GET /tarefas` - Listar todas as tarefas
- `GET /tarefas/{id}` - Buscar tarefa por ID
- `POST /tarefas` - Criar nova tarefa
- `PUT /tarefas/{id}` - Atualizar tarefa
- `PATCH /tarefas/{id}` - Alternar status (feito/pendente)
- `DELETE /tarefas/{id}` - Excluir tarefa

**Documentação Swagger:** http://localhost:8082/swagger-ui.html

###  Executar o Frontend

**IMPORTANTE:** Execute na pasta `frontend`, não na raiz do projeto!

Abra **outro terminal PowerShell** na pasta `frontend`:

```powershell
cd frontend

# Instalar dependências (primeira vez apenas)
npm install

# Executar em modo desenvolvimento
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

###  Acessar a Aplicação

Abra seu navegador em: **http://localhost:5173**

##  Funcionalidades

###  CRUD Completo
- ✅ Listar todas as tarefas
- ✅ Criar nova tarefa
- ✅ Editar tarefa (página dedicada + modal)
- ✅ Excluir tarefa (com confirmação)
- ✅ Alternar status (feito/pendente)

###  Interface
- ✅ Design responsivo
- ✅ Mensagens de sucesso/erro
- ✅ Loading states
- ✅ Validações de formulário
- ✅ Tratamento de erros

##  Configurações

### Backend

O arquivo `api/src/main/resources/application.properties` já está configurado com:
- Banco PostgreSQL (Neon Cloud)
- JPA/Hibernate
- CORS habilitado para `http://localhost:5173`

### Frontend

O arquivo `frontend/src/services/api.js` está configurado para:
- API base: `/api/tarefas` (base URL relativa)

O Vite (`vite.config.js`) está configurado com um proxy que redireciona chamadas de `/api` para `http://localhost:8082`.

Se precisar alterar a porta do backend, atualize:
1. `api/src/main/resources/application.properties` (porta do Spring Boot)
2. `frontend/vite.config.js` (atualize o target do proxy)

## 🐛 Troubleshooting

### Erro de CORS
Se aparecer erro de CORS, verifique se o backend está rodando e se a configuração em `AppConfiguration.java` está correta.

### Erro de conexão com banco
Verifique sua conexão com a internet. O banco está hospedado na nuvem (Neon).

### Porta 8082 já em uso

Se aparecer o erro "Port 8082 was already in use", significa que há outro processo usando a porta.

**Solução 1: Parar o processo (Recomendado)**

No PowerShell, execute:
```powershell
# Encontrar o processo na porta 8082
netstat -ano | findstr :8082

# Parar o processo (substitua PID pelo número encontrado)
taskkill /F /PID <PID>
```

**Solução 2: Mudar a porta do backend**

1. Edite `api/src/main/resources/application.properties` e altere a porta:
   ```properties
   server.port=8083
   ```

2. Atualize `frontend/vite.config.js`:
   ```javascript
   // Procure pela configuração do proxy e altere o target
   target: 'http://localhost:8083',
   ```

### Erro ao compilar o backend
Certifique-se de ter Java 17 instalado:
```bash
java -version
```

### Erro ao instalar dependências do frontend
Limpe o cache e reinstale:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📚 Tecnologias Utilizadas

### Backend
- Spring Boot 3.5.6
- Spring Data JPA
- PostgreSQL Driver
- Lombok
- SpringDoc OpenAPI (Swagger)
- Jakarta Validation

### Frontend
- React 19.2.0
- Vite 7.2.4
- React Router DOM 6.28.0
- Axios 1.7.7

## 📄 Licença

Projeto acadêmico - DAW3

