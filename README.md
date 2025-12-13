#  Gerenciador de Tarefas - Frontend Blazor

Frontend desenvolvido com **Blazor Server (.NET 8.0.416)** que consome uma API REST Spring Boot.

---

##  Pré-requisitos

- **.NET SDK 8.0.416** ou superior
  - Download: https://dotnet.microsoft.com/download/dotnet/8.0
  - Verificar instalação: `dotnet --version`
- **Backend Spring Boot** rodando em `http://localhost:8080`

---

##  Como Executar

### **1. Navegar até a pasta do projeto:**
```bash
cd frontend-blazor/TaskManager
```

### **2. Restaurar dependências (primeira vez):**
```bash
dotnet restore
```

### **3. Executar a aplicação:**
```bash
dotnet run
```

Ou com hot reload (recompila automaticamente):
```bash
dotnet watch run
```

### **4. Acessar no navegador:**

A aplicação estará disponível em:
- `http://localhost:5041`

---

##  Configuração da API

A URL do backend está configurada em `Services/TarefaService.cs`:
```csharp
private readonly string _apiBaseUrl = "http://localhost:8080/tarefas";
```

**Se seu backend estiver em outra porta ou caminho, altere esta linha!**

---

##  Troubleshooting

### **Erro: "Nenhuma conexão pôde ser feita"**
 Certifique-se que o **Spring Boot está rodando** em `localhost:8080`

### **Erro: Porta já em uso**
 Pare outros processos ou mude a porta em `appsettings.json`

### **Erro de CORS**
 Configure CORS no Spring Boot para aceitar requisições de `localhost:5041`:
```java
@CrossOrigin(origins = {"http://localhost:5000", "https://localhost:5001"})
```

### **Botões não funcionam**
 Abra o Console do navegador (F12) e verifique erros  
 Confirme que o backend está respondendo

---

## 📋 Comandos Úteis
```bash
# Ver versão do .NET
dotnet --version

# Restaurar pacotes
dotnet restore

# Compilar
dotnet build

# Executar
dotnet run

# Executar com hot reload
dotnet watch run

# Limpar build
dotnet clean
```

---

##  Checklist Rápido

Antes de executar, certifique-se:

- [ ] .NET 8.0.416+ instalado
- [ ] Backend Spring Boot rodando em `localhost:8080`
- [ ] PostgreSQL rodando (se o backend usar)
- [ ] CORS configurado no backend
- [ ] Na pasta correta: `frontend-blazor/TaskManager`

---

##  Funcionalidades

-  Adicionar tarefas (Enter ou botão "Adicionar")
-  Marcar como feita (checkbox)
-  Editar tarefas (botão "Editar" + Enter para salvar)
-  Excluir tarefas (botão "Excluir")
-  Ordenação automática (pendentes no topo)
-  Estatísticas (Total, Feitas, Pendentes)

---

**Desenvolvido com Blazor Server e .NET 8** 
