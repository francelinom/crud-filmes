import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { FilmesService } from "src/app/core/filmes.service";
import { AlertaComponent } from "src/app/shared/components/alerta/alerta.component";
import { ValidarCamposService } from "src/app/shared/components/campos/validar-campos.service";
import { Alerta } from "src/app/shared/models/alerta";
import { Filme } from "src/app/shared/models/filme";

@Component({
  selector: "dio-cadastro-filmes",
  templateUrl: "./cadastro-filmes.component.html",
  styleUrls: ["./cadastro-filmes.component.scss"],
})
export class CadastroFilmesComponent implements OnInit {
  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    private fb: FormBuilder,
    private filmesService: FilmesService,
    private router: Router,
    public validacao: ValidarCamposService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    if (this.id) {
      this.filmesService
        .visulizar(this.id)
        .subscribe((filme: Filme) => this.criarFormulario(filme));
    } else {
      this.criarFormulario(this.criarFilmeEmBranco());
    }

    this.generos = [
      "Ação",
      "Romance",
      "Aventura",
      "Terror",
      "Ficção Cientifica",
      "Comédia",
      "Drama",
    ];
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlImdb: null,
      genero: null,
    } as Filme;
  }

  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo: [
        filme.titulo,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(256),
        ],
      ],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [
        filme.nota,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]],
    });
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(
      () => {
        const config = {
          data: {
            btnSucesso: "Ir para a listagem",
            btnCancelar: "Cadastrar um novo filme",
            possuiBtnFechar: true,
            corBtnCancelar: "primary",
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.router.navigateByUrl("filmes");
          } else {
            this.reiniciarForm();
          }
        });
      },
      () => {
        const config = {
          data: {
            titulo: "Erro ao salvar o registro!",
            descricao:
              "Não conseguimos salvar o seu registro, por favor tentar novamente mais tarde!",
            btnSucesso: "Fechar",
            corBtnSucesso: "warn",
          } as Alerta,
        };
        this.dialog.open(AlertaComponent, config);
      }
    );
  }
}
