using System.Net.Http.Json;
using TaskManager.Models;

namespace TaskManager.Services
{
    public class TarefaService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiBaseUrl = "http://localhost:8080/tarefas";

        public TarefaService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        // GET - Obter todas as tarefas
        public async Task<List<Tarefa>> ObterTodasTarefasAsync()
        {
            try
            {
                var tarefas = await _httpClient.GetFromJsonAsync<List<Tarefa>>(_apiBaseUrl);
                return tarefas ?? new List<Tarefa>();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Erro GET: {ex.Message}");
                return new List<Tarefa>();
            }
        }

        // POST - Adicionar nova tarefa
        public async Task<Tarefa?> AdicionarTarefaAsync(string descricao)
        {
            try
            {
                Console.WriteLine($"📤 Tentando adicionar: {descricao}");
                
                var dto = new { descricao = descricao };
                var response = await _httpClient.PostAsJsonAsync(_apiBaseUrl, dto);
                
                Console.WriteLine($"📥 Status POST: {response.StatusCode}");
                
                if (response.IsSuccessStatusCode)
                {
                    var tarefa = await response.Content.ReadFromJsonAsync<Tarefa>();
                    Console.WriteLine($"✅ Tarefa adicionada: {tarefa?.Id}");
                    return tarefa;
                }
                else
                {
                    var erro = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"❌ Erro POST: {erro}");
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Exception POST: {ex.Message}");
                return null;
            }
        }

        // PUT - Atualizar descrição da tarefa
        public async Task<bool> AtualizarTarefaAsync(long id, string novaDescricao)
        {
            try
            {
                Console.WriteLine($"✏️ Tentando atualizar tarefa {id}: {novaDescricao}");
                
                var dto = new { descricao = novaDescricao };
                var response = await _httpClient.PutAsJsonAsync($"{_apiBaseUrl}/{id}", dto);
                
                Console.WriteLine($"📥 Status PUT: {response.StatusCode}");
                
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"✅ Tarefa {id} atualizada");
                    return true;
                }
                else
                {
                    var erro = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"❌ Erro PUT: {erro}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Exception PUT: {ex.Message}");
                return false;
            }
        }

        // PATCH - Marcar como concluída/não concluída
        public async Task<bool> MarcarConcluidaAsync(long id)
        {
            try
            {
                Console.WriteLine($"🔄 Tentando marcar tarefa {id}");
                
                var url = $"{_apiBaseUrl}/{id}";
                var response = await _httpClient.PatchAsync(url, null);
                
                Console.WriteLine($"📥 Status PATCH: {response.StatusCode}");
                
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"✅ Tarefa {id} marcada");
                    return true;
                }
                else
                {
                    var erro = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"❌ Erro PATCH: {erro}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Exception PATCH: {ex.Message}");
                return false;
            }
        }

        // DELETE - Excluir tarefa
        public async Task<bool> ExcluirTarefaAsync(long id)
        {
            try
            {
                Console.WriteLine($"🗑️ Tentando excluir tarefa {id}");
                
                var url = $"{_apiBaseUrl}/{id}";
                var response = await _httpClient.DeleteAsync(url);
                
                Console.WriteLine($"📥 Status DELETE: {response.StatusCode}");
                
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"✅ Tarefa {id} excluída");
                    return true;
                }
                else
                {
                    var erro = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"❌ Erro DELETE: {erro}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Exception DELETE: {ex.Message}");
                return false;
            }
        }
    }
}