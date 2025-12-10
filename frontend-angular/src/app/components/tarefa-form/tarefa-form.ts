import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarefa, TarefaRequest } from '../../models/tarefa.model';

@Component({
  selector: 'app-tarefa-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './tarefa-form.html',
  styleUrl: './tarefa-form.css',
})
export class TarefaForm implements OnInit, OnChanges {
  @Input() tarefaEditando?: Tarefa;
  @Output() salvar = new EventEmitter<TarefaRequest>();
  @Output() cancelar = new EventEmitter<void>();

  descricao: string = '';
  isEditando: boolean = false;

  ngOnInit() {
    this.atualizarFormulario();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tarefaEditando']) {
      console.log('tarefaEditando mudou:', this.tarefaEditando);
      this.atualizarFormulario();
    }
  }

  private atualizarFormulario() {
    if (this.tarefaEditando) {
      this.descricao = this.tarefaEditando.descricao;
      this.isEditando = true;
    } else {
      this.descricao = '';
      this.isEditando = false;
    }
    console.log('Formulário atualizado - descricao:', this.descricao, 'isEditando:', this.isEditando);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    const descricaoTrimmed = this.descricao.trim();
    if (!descricaoTrimmed) {
      return;
    }
    
    console.log('Formulário submetido:', descricaoTrimmed, 'Editando:', this.isEditando);
    this.salvar.emit({ descricao: descricaoTrimmed });
    
    // Limpar o campo imediatamente após emitir
    // O componente pai vai atualizar tarefaEditando se necessário
    this.descricao = '';
    // Se estava editando, o ngOnChanges vai resetar quando tarefaEditando for undefined
  }

  onCancelar() {
    this.descricao = '';
    this.isEditando = false;
    this.cancelar.emit();
  }
}
