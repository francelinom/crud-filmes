import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigParams } from "../shared/models/config-params";
import { Filme } from "../shared/models/filme";
import { ConfigParamsService } from "./config-params.service";

const url = "http://localhost:3000/filmes/";

@Injectable({
  providedIn: "root",
})
export class FilmesService {
  constructor(
    private httpClient: HttpClient,
    private configParamsService: ConfigParamsService
  ) {}

  salvar(filme: Filme): Observable<Filme> {
    return this.httpClient.post<Filme>(`${url}`, filme);
  }

  editar(filme: Filme): Observable<Filme> {
    return this.httpClient.put<Filme>(`${url}${filme.id}`, filme);
  }

  listar(config: ConfigParams): Observable<Filme[]> {
    const configParams = this.configParamsService.configurarParametros(config);
    return this.httpClient.get<Filme[]>(`${url}`, { params: configParams });
  }

  visulizar(id: number): Observable<Filme> {
    return this.httpClient.get<Filme>(`${url}${id}`);
  }

  excluir(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${url}${id}`);
  }
}
