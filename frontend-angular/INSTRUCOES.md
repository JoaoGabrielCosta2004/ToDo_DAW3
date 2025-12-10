# Frontend Angular - Gerenciador de Tarefas

Este é um projeto frontend simples desenvolvido em **Angular** que se integra com uma API REST de gerenciamento de tarefas (To-Do List).

## Requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **Angular CLI** (instalado globalmente)

## Instalação

1. **Navegue até o diretório do projeto:**

   ```bash
   cd frontend-angular
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

## Configuração

A URL base da API está configurada no arquivo `src/app/services/tarefa.service.ts`:

```typescript
private apiUrl = 'http://localhost:8080/tarefas';
```

Se o seu backend está rodando em um endereço diferente, atualize esta URL conforme necessário.

## Executar o Projeto

Para iniciar o servidor de desenvolvimento, execute:

```bash
ng serve
```

Ou, alternativamente:

```bash
npm start
```

O aplicativo estará disponível em `http://localhost:4200/`.

## Funcionalidades

O aplicativo oferece as seguintes funcionalidades:

- **Criar Tarefa:** Adicione uma nova tarefa preenchendo o campo de entrada e clicando em "Adicionar".
- **Listar Tarefas:** Todas as tarefas são exibidas em uma lista.
- **Editar Tarefa:** Clique em "Editar" para modificar a descrição de uma tarefa existente.
- **Marcar como Concluída:** Clique no checkbox para alternar o status de conclusão da tarefa.
- **Excluir Tarefa:** Clique em "Excluir" para remover uma tarefa.

## Estrutura do Projeto

```
frontend-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── tarefa-form/        # Componente de formulário
│   │   │   └── tarefa-lista/       # Componente de lista de tarefas
│   │   ├── models/
│   │   │   └── tarefa.model.ts     # Interfaces de dados
│   │   ├── services/
│   │   │   └── tarefa.service.ts   # Serviço de API
│   │   ├── app.ts                  # Componente raiz
│   │   ├── app.html                # Template da aplicação
│   │   ├── app.css                 # Estilos da aplicação
│   │   ├── app.config.ts           # Configuração da aplicação
│   │   └── app.routes.ts           # Rotas da aplicação
│   ├── styles.css                  # Estilos globais
│   ├── index.html                  # HTML principal
│   └── main.ts                     # Ponto de entrada
├── package.json                    # Dependências do projeto
├── angular.json                    # Configuração do Angular CLI
└── tsconfig.json                   # Configuração do TypeScript
```

## Integração com a API

O projeto se integra com a API REST através do serviço `TarefaService` (`src/app/services/tarefa.service.ts`).

### Endpoints da API

O serviço espera os seguintes endpoints:

- **GET `/tarefas`** - Listar todas as tarefas
- **GET `/tarefas/{id}`** - Buscar uma tarefa por ID
- **POST `/tarefas`** - Criar uma nova tarefa
- **PUT `/tarefas/{id}`** - Atualizar uma tarefa
- **PATCH `/tarefas/{id}`** - Alternar o status de conclusão
- **DELETE `/tarefas/{id}`** - Deletar uma tarefa

## Build para Produção

Para compilar o projeto para produção, execute:

```bash
ng build --configuration production
```

Os arquivos compilados serão gerados no diretório `dist/`.

## Testes

Para executar os testes unitários, execute:

```bash
ng test
```

## Troubleshooting

### Erro: "Cannot GET /"

Se receber este erro ao acessar `http://localhost:4200/`, certifique-se de que o servidor de desenvolvimento está rodando corretamente.

### Erro de Conexão com a API

Se o aplicativo não conseguir se conectar à API, verifique:

1. Se o backend está rodando na URL configurada (`http://localhost:8080`).
2. Se há problemas de CORS (Cross-Origin Resource Sharing) no backend.
3. Se a URL da API está corretamente configurada em `tarefa.service.ts`.

## Contribuição

Este é um projeto educacional. Sinta-se livre para fazer modificações e melhorias conforme necessário.

## Licença

Este projeto é fornecido como está, sem garantias.

---

**Desenvolvido com Angular 19+**
