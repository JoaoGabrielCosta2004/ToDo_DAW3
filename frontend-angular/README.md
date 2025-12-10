# Gerenciador de Tarefas - Frontend Angular

Este é o frontend de uma aplicação de gerenciamento de tarefas (To-Do List) desenvolvida em **Angular 21** que se integra com uma API REST desenvolvida em **Spring Boot**.

## 📋 Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Como Executar](#como-executar)
  - [Backend (Spring Boot)](#backend-spring-boot)
  - [Frontend (Angular)](#frontend-angular)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração](#configuração)
- [Build para Produção](#build-para-produção)
- [Testes](#testes)
- [Troubleshooting](#troubleshooting)

## 🔧 Requisitos

Antes de começar, certifique-se de ter instalado:

### Para o Backend:
- **Java JDK 17** ou superior
- **Maven 3.6+** (geralmente incluído com Spring Boot)
- **PostgreSQL** (ou acesso a um banco de dados PostgreSQL)

### Para o Frontend:
- **Node.js** (versão 18 ou superior)
- **npm** (gerenciador de pacotes do Node.js) - geralmente vem com o Node.js
- **Angular CLI** (opcional, mas recomendado para desenvolvimento)

## 📦 Instalação

### 1. Instalar Angular CLI (se ainda não tiver)

```bash
npm install -g @angular/cli
```

### 2. Instalar Dependências do Frontend

Navegue até o diretório do frontend e instale as dependências:

```bash
cd frontend-angular
npm install
```

## 🚀 Como Executar

### Backend (Spring Boot)

1. **Navegue até o diretório da API:**

   ```bash
   cd api
   ```

2. **Configure o Banco de Dados:**

   O projeto está configurado para usar PostgreSQL. As configurações estão em `src/main/resources/application.properties`.
   
   ⚠️ **Importante:** Atualize as credenciais do banco de dados no arquivo `application.properties` antes de executar.

3. **Execute o Backend:**

   **Opção 1 - Usando Maven Wrapper (recomendado):**
   
   No Windows:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
   
   No Linux/Mac:
   ```bash
   ./mvnw spring-boot:run
   ```

   **Opção 2 - Usando Maven instalado:**
   ```bash
   mvn spring-boot:run
   ```

   **Opção 3 - Executando o JAR:**
   ```bash
   mvn clean package
   java -jar target/todoproject-0.0.1-SNAPSHOT.jar
   ```

4. **Verifique se o Backend está rodando:**

   O backend estará disponível em `http://localhost:8080`
   
   Você pode testar acessando: `http://localhost:8080/tarefas` (deve retornar uma lista vazia `[]` ou uma lista de tarefas)

### Frontend (Angular)

1. **Certifique-se de que o Backend está rodando** (veja instruções acima)

2. **Navegue até o diretório do frontend:**

   ```bash
   cd frontend-angular
   ```

3. **Execute o servidor de desenvolvimento:**

   ```bash
   ng serve
   ```
   
   Ou alternativamente:
   ```bash
   npm start
   ```

4. **Acesse a aplicação:**

   Abra seu navegador e acesse: `http://localhost:4200/`
   
   A aplicação recarregará automaticamente sempre que você modificar os arquivos de código.

## ✨ Funcionalidades

O aplicativo oferece as seguintes funcionalidades:

- ✅ **Criar Tarefa:** Adicione uma nova tarefa preenchendo o campo de entrada e clicando em "Adicionar"
- 📋 **Listar Tarefas:** Todas as tarefas são exibidas em uma lista organizada
- ✏️ **Editar Tarefa:** Clique em "Editar" para modificar a descrição de uma tarefa existente
- ☑️ **Marcar como Concluída:** Clique no checkbox para alternar o status de conclusão da tarefa
- 🗑️ **Excluir Tarefa:** Clique em "Excluir" para remover uma tarefa permanentemente

## 📁 Estrutura do Projeto

```
frontend-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── tarefa-form/        # Componente de formulário (criar/editar)
│   │   │   └── tarefa-lista/       # Componente de lista de tarefas
│   │   ├── models/
│   │   │   └── tarefa.model.ts     # Interfaces TypeScript (Tarefa, TarefaRequest)
│   │   ├── services/
│   │   │   └── tarefa.service.ts   # Serviço de comunicação com a API REST
│   │   ├── app.ts                  # Componente raiz da aplicação
│   │   ├── app.html                # Template principal
│   │   ├── app.css                 # Estilos globais da aplicação
│   │   ├── app.config.ts           # Configuração da aplicação (providers, rotas)
│   │   └── app.routes.ts           # Configuração de rotas
│   ├── styles.css                  # Estilos globais
│   ├── index.html                  # HTML principal
│   └── main.ts                     # Ponto de entrada da aplicação
├── package.json                    # Dependências e scripts do projeto
├── angular.json                    # Configuração do Angular CLI
├── tsconfig.json                   # Configuração do TypeScript
└── README.md                       # Este arquivo
```

## ⚙️ Configuração

### URL da API

A URL base da API está configurada no arquivo `src/app/services/tarefa.service.ts`:

```typescript
private apiUrl = 'http://localhost:8080/tarefas';
```

Se o seu backend estiver rodando em uma porta diferente ou em outro endereço, atualize esta URL conforme necessário.

### CORS

O backend está configurado para aceitar requisições do frontend em `http://localhost:4200`. Se você alterar a porta do frontend, será necessário atualizar a configuração de CORS no backend também.

## 🏗️ Build para Produção

Para compilar o projeto para produção, execute:

```bash
ng build --configuration production
```

Os arquivos compilados serão gerados no diretório `dist/frontend-angular/`. Você pode servir esses arquivos usando qualquer servidor web estático ou integrá-los ao seu backend.

### Build com otimizações:

```bash
ng build --configuration production --optimization
```

## 🧪 Testes

Para executar os testes unitários, execute:

```bash
ng test
```

Os testes são executados usando [Vitest](https://vitest.dev/).

## 🔍 Troubleshooting

### Problema: Tarefas não carregam ao iniciar

**Solução:**
1. Verifique se o backend está rodando em `http://localhost:8080`
2. Abra o console do navegador (F12) e verifique se há erros
3. Verifique se a URL da API está correta em `tarefa.service.ts`

### Problema: Erro de CORS (Cross-Origin Resource Sharing)

**Solução:**
1. Certifique-se de que o backend está configurado para aceitar requisições de `http://localhost:4200`
2. Verifique o arquivo `TarefaController.java` no backend - deve ter `@CrossOrigin(origins = "http://localhost:4200")`

### Problema: Erro "Cannot GET /"

**Solução:**
1. Certifique-se de que o servidor de desenvolvimento está rodando (`ng serve`)
2. Verifique se está acessando a URL correta: `http://localhost:4200/`

### Problema: Erro de conexão com a API

**Solução:**
1. Verifique se o backend está rodando e acessível em `http://localhost:8080`
2. Teste a API diretamente no navegador: `http://localhost:8080/tarefas`
3. Verifique se não há firewall bloqueando a conexão
4. Verifique os logs do backend para identificar possíveis erros

### Problema: Dependências não instalam

**Solução:**
```bash
# Limpe o cache do npm
npm cache clean --force

# Delete node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstale as dependências
npm install
```

## 📚 Recursos Adicionais

- [Documentação do Angular](https://angular.dev)
- [Angular CLI](https://angular.dev/tools/cli)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [RxJS Documentation](https://rxjs.dev)

## 📝 Notas de Desenvolvimento

- O projeto usa **Angular 21** com standalone components
- A comunicação com a API é feita através de **RxJS Observables**
- O projeto utiliza **TypeScript** para tipagem estática
- Os estilos são escritos em **CSS** puro

## 🤝 Contribuição

Este é um projeto educacional. Sinta-se livre para fazer modificações e melhorias conforme necessário.

---

**Desenvolvido com Angular 21 e Spring Boot 3.5.6**
