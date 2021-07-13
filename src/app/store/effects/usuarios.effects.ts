import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as usuariosActions from '../actions';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {UsuarioService} from '../../services/usuario.service';
import {cargarUsuariosSuccess} from '../actions';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
    constructor(
            private actions$: Actions,
            private usuariosService: UsuarioService

    ) {}

    cargarUsuarios$ = createEffect(
            () => this.actions$.pipe(
                    ofType( usuariosActions.cargarUsuarios ),
                    mergeMap(
                            () => this.usuariosService.getUsers()
                                    .pipe(
                                            map(users => usuariosActions.cargarUsuariosSuccess({usuarios: users}) ),
                                            catchError( err => of(usuariosActions.cargarUsuariosError({payload: err})))
                                    )
                    )
            )
    );
}
