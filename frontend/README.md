# ToDo App - Frontend React

Front-end completo desenvolvido em React + Vite para consumir a API REST do backend Spring Boot.

## 🚀 Tecnologias

- **React 19.2.0**
- **Vite 7.2.4**
- **React Router DOM** - Roteamento
- **Axios** - Requisições HTTP
- **CSS Modules** - Estilização

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.jsx       # Cabeçalho da aplicação
│   │   ├── TaskList.jsx     # Lista de tarefas
│   │   ├── TaskCard.jsx     # Card individual de tarefa
│   │   ├── TaskForm.jsx     # Formulário de criação/edição
│   │   └── Modal.jsx        # Modal para edição
│   ├── pages/               # Páginas da aplicação
│   │   ├── HomePage.jsx     # Página inicial (lista de tarefas)
│   │   ├── NovaTarefaPage.jsx    # Página de criação
│   │   └── EditarTarefaPage.jsx  # Página de edição
│   ├── services/            # Serviços de API
│   │   └── api.js           # Configuração Axios e serviços
│   ├── hooks/               # Custom hooks (se necessário)
│   ├── styles/              # Estilos globais
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Ponto de entrada
├── package.json
└── vite.config.js
```

## 📋 Funcionalidades Implementadas

✅ **CRUD Completo de Tarefas**
- ✅ Listar todas as tarefas
- ✅ Criar nova tarefa
- ✅ Editar tarefa (página dedicada + modal)
- ✅ Excluir tarefa (com confirmação)
- ✅ Atualizar status (feito/pendente)

✅ **Interface Completa**
- ✅ Header com navegação
- ✅ Lista responsiva de tarefas
- ✅ Cards de tarefa com ações
- ✅ Formulário com validações
- ✅ Modal de edição
- ✅ Mensagens de sucesso/erro
- ✅ Loading states
- ✅ Design responsivo

✅ **Tratamento de Erros**
- ✅ Try/catch em todas as operações
- ✅ Mensagens de erro amigáveis
- ✅ Interceptor Axios para erros globais

## 🛠️ Instalação e Execução

### 1. Instalar dependências

```bash
cd frontend
npm install
```

### 2. Configurar URL da API

O arquivo `src/services/api.js` está configurado para:
```javascript
const API_BASE_URL = 'http://localhost:8080/tarefas';
```

Se o backend estiver em outra porta ou URL, ajuste essa constante.

### 3. Executar o projeto

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173` (porta padrão do Vite).

### 4. Build para produção

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`.

## ⚙️ Configuração do Backend

⚠️ **Importante**: Para que o frontend funcione corretamente, o backend precisa ter CORS configurado.

Se o backend não tiver CORS configurado, você pode adicionar no `AppConfiguration.java`:

```java
@Configuration
public class AppConfiguration implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## 📱 Rotas da Aplicação

- `/` - Lista de tarefas (HomePage)
- `/nova` - Criar nova tarefa
- `/editar/:id` - Editar tarefa existente

## 🎨 Componentes Principais

### Header
Cabeçalho com logo e navegação principal.

### TaskList
Lista todas as tarefas com loading e estado vazio.

### TaskCard
Card individual mostrando:
- Descrição da tarefa
- Status (Concluída/Pendente)
- ID da tarefa
- Botões de ação (status, editar, excluir)

### TaskForm
Formulário reutilizável para criar/editar tarefas com:
- Validação de campos obrigatórios
- Validação de tamanho mínimo
- Estados de loading

### Modal
Modal reutilizável para edição rápida de tarefas.

## 🔌 Integração com API

O serviço `tarefaService` em `src/services/api.js` implementa todos os métodos:

- `listarTodas()` - GET /tarefas
- `buscarPorId(id)` - GET /tarefas/{id}
- `criar(tarefa)` - POST /tarefas
- `atualizar(id, tarefa)` - PUT /tarefas/{id}
- `atualizarStatus(id)` - PATCH /tarefas/{id}
- `excluir(id)` - DELETE /tarefas/{id}

## 📝 Estrutura de Dados

### TarefaRequestDTO
```javascript
{
  descricao: string  // obrigatório, mínimo 3 caracteres
}
```

### TarefaResponseDTO
```javascript
{
  id: number,
  lookupId: UUID,
  descricao: string,
  feito: boolean
}
```

## ✅ Checklist de Funcionalidades

- [x] Estrutura de diretórios conforme especificação
- [x] Páginas obrigatórias implementadas
- [x] Componentes obrigatórios criados
- [x] CRUD completo funcionando
- [x] Validações de formulário
- [x] Mensagens de sucesso/erro
- [x] Loading states
- [x] Tratamento de erros com try/catch
- [x] Design responsivo
- [x] Integração completa com API

## 🐛 Troubleshooting

### Erro de CORS
Se aparecer erro de CORS no console, configure o backend conforme instruções acima.

### Erro de conexão
Verifique se o backend está rodando em `http://localhost:8080`.

### Porta já em uso
O Vite usa a porta 5173 por padrão. Se estiver ocupada, ele tentará a próxima disponível.

## 📄 Licença

Projeto acadêmico - DAW3
