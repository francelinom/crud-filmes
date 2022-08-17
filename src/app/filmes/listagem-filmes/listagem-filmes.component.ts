import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FilmesService } from "src/app/core/filmes.service";
import { Filme } from "src/app/shared/models/filme";

@Component({
  selector: "dio-listagem-filmes",
  templateUrl: "./listagem-filmes.component.html",
  styleUrls: ["./listagem-filmes.component.scss"],
})
export class ListagemFilmesComponent implements OnInit {
  filtrosListagem: FormGroup;
  filmes: Filme[] = [];
  pagina = 0;
  readonly qtdPagina = 4;
  generos: Array<string>;
  texto = "";
  genero = "";

  constructor(private filmesService: FilmesService, private fb: FormBuilder) {}

  ngOnInit() {
    this.filtrosListagem = this.fb.group({
      texto: [""],
      genero: [""],
    });

    this.filtrosListagem.get("texto").valueChanges.subscribe((val: string) => {
      this.texto = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get("genero").valueChanges.subscribe((val: string) => {
      this.genero = val;
      this.resetarConsulta();
    });

    this.generos = [
      "Ação",
      "Romance",
      "Aventura",
      "Terror",
      "Ficção Cientifica",
      "Comédia",
      "Drama",
    ];
    this.listarFilmes();
  }

  open() {}

  onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.pagina++;
    this.filmesService
      .listar(this.pagina, this.qtdPagina, this.texto, this.genero)
      .subscribe((filmes: Filme[]) => {
        this.filmes.push(...filmes);
      });
  }

  private resetarConsulta(): void {
    this.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }
}
