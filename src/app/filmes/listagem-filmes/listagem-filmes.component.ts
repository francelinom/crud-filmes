import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FilmesService } from "src/app/core/filmes.service";
import { ConfigParams } from "src/app/shared/models/config-params";
import { Filme } from "src/app/shared/models/filme";

@Component({
  selector: "dio-listagem-filmes",
  templateUrl: "./listagem-filmes.component.html",
  styleUrls: ["./listagem-filmes.component.scss"],
})
export class ListagemFilmesComponent implements OnInit {
  filtrosListagem: FormGroup;
  filmes: Filme[] = [];
  generos: Array<string>;
  config: ConfigParams = {
    pagina: 0,
    limite: 4,
  };

  constructor(private filmesService: FilmesService, private fb: FormBuilder) {}

  ngOnInit() {
    this.filtrosListagem = this.fb.group({
      texto: [""],
      genero: [""],
    });

    this.filtrosListagem.get("texto").valueChanges.subscribe((val: string) => {
      this.config.pesquisa = val;
      this.resetarConsulta();
    });

    this.filtrosListagem.get("genero").valueChanges.subscribe((val: string) => {
      this.config.campo = { tipo: "genero", valor: val };
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
    this.config.pagina++;
    this.filmesService.listar(this.config).subscribe((filmes: Filme[]) => {
      this.filmes.push(...filmes);
    });
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }
}
