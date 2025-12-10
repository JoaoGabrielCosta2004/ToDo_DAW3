import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tarefa, TarefaRequest } from '../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';
import { TarefaForm } from '../tarefa-form/tarefa-form';

@Component({
  selector: 'app-tarefa-lista',
  imports: [CommonModule, TarefaForm],
  templateUrl: './tarefa-lista.html',
  styleUrl: './tarefa-lista.css',
})
export class TarefaLista implements OnInit {
  tarefas: Tarefa[] = [];
  tarefaEditando?: Tarefa;
  carregando: boolean = false;
  erro?: string;
  processandoIds = new Set<number>();

  constructor(
    private tarefaService: TarefaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('TarefaLista ngOnInit - iniciando carregamento');
    this.carregarTarefas();
  }

  carregarTarefas() {
    console.log('carregarTarefas chamado');
    this.carregando = true;
    this.erro = undefined;
    this.cdr.detectChanges();
    
    this.tarefaService.listarTarefas().subscribe({
      next: (tarefas) => {
        console.log('Tarefas carregadas:', tarefas);
        this.tarefas = tarefas || [];
        this.carregando = false;
        this.erro = undefined;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar tarefas:', err);
        this.erro = 'Erro ao carregar tarefas. Verifique se o servidor está rodando.';
        this.carregando = false;
        this.tarefas = [];
        this.cdr.detectChanges();
      }
    });
  }

  onSalvarTarefa(tarefaRequest: TarefaRequest) {
    console.log('onSalvarTarefa chamado:', tarefaRequest, 'Editando:', this.tarefaEditando);
    
    if (this.tarefaEditando) {
      const id = this.tarefaEditando.id;
      
      if (this.processandoIds.has(id)) {
        console.log('Já processando tarefa', id);
        return;
      }
      
      this.processandoIds.add(id);
      this.cdr.detectChanges();
      
      this.tarefaService.atualizarTarefa(id, tarefaRequest).subscribe({
        next: (tarefaAtualizada) => {
          console.log('Tarefa atualizada:', tarefaAtualizada);
          const index = this.tarefas.findIndex(t => t.id === id);
          if (index !== -1) {
            this.tarefas[index] = tarefaAtualizada;
          }
          this.tarefaEditando = undefined;
          this.processandoIds.delete(id);
          this.erro = undefined;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao atualizar tarefa:', err);
          this.erro = 'Erro ao atualizar tarefa.';
          this.processandoIds.delete(id);
          this.cdr.detectChanges();
        }
      });
    } else {
      // Criar nova tarefa
      console.log('Criando nova tarefa');
      this.tarefaService.criarTarefa(tarefaRequest).subscribe({
        next: (novaTarefa) => {
          console.log('Nova tarefa criada:', novaTarefa);
          this.tarefas = [...this.tarefas, novaTarefa]; // Criar nova referência do array
          this.erro = undefined;
          this.tarefaEditando = undefined;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao criar tarefa:', err);
          this.erro = 'Erro ao criar tarefa.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  onCancelarEdicao() {
    this.tarefaEditando = undefined;
  }

  editarTarefa(tarefa: Tarefa) {
    this.tarefaEditando = { ...tarefa };
  }

  deletarTarefa(id: number) {
    if (this.processandoIds.has(id)) {
      console.log('Já processando exclusão da tarefa', id);
      return;
    }
    
    if (!confirm('Excluir esta tarefa?')) return;
    
    console.log('Deletando tarefa:', id);
    this.processandoIds.add(id);
    this.cdr.detectChanges();
    
    this.tarefaService.deletarTarefa(id).subscribe({
      next: () => {
        console.log('Tarefa deletada com sucesso:', id);
        this.tarefas = this.tarefas.filter(t => t.id !== id);
        this.processandoIds.delete(id);
        this.erro = undefined;
        // Se estava editando a tarefa deletada, limpar
        if (this.tarefaEditando?.id === id) {
          this.tarefaEditando = undefined;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao deletar tarefa:', err);
        this.erro = 'Erro ao excluir tarefa.';
        this.processandoIds.delete(id);
        this.cdr.detectChanges();
      }
    });
  }

  alternarStatusTarefa(id: number) {
    if (this.processandoIds.has(id)) return;
    
    const tarefa = this.tarefas.find(t => t.id === id);
    if (!tarefa) return;
    
    const estadoOriginal = tarefa.feito;
    tarefa.feito = !tarefa.feito;
    this.processandoIds.add(id);
    this.cdr.detectChanges();
    
    this.tarefaService.alternarStatusTarefa(id).subscribe({
      next: (tarefaAtualizada) => {
        const index = this.tarefas.findIndex(t => t.id === id);
        if (index !== -1) {
          this.tarefas[index] = tarefaAtualizada;
        }
        this.processandoIds.delete(id);
        this.erro = undefined;
        this.cdr.detectChanges();
      },
      error: (err) => {
        tarefa.feito = estadoOriginal;
        this.processandoIds.delete(id);
        this.erro = 'Erro ao alterar status da tarefa.';
        console.error('Erro ao alternar status:', err);
        this.cdr.detectChanges();
      }
    });
  }
}