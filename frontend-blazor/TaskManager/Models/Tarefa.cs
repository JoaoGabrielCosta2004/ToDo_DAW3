using System.Text.Json.Serialization;

namespace TaskManager.Models
{
    public class Tarefa
    {
        [JsonPropertyName("id")]
        public long Id { get; set; }
        
        [JsonPropertyName("descricao")]
        public string Descricao { get; set; } = string.Empty;
        
        [JsonPropertyName("feito")]  // ← Backend usa "feito"
        public bool Feito { get; set; }
    }
}