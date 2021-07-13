import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as usuarioActions from '../actions';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {UsuarioService} from '../../services/usuario.service';
import {cargarUsuarioSuccess} from '../actions';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
    constructor(
            private actions$: Actions,
            private usuariosService: UsuarioService

    ) {}

    cargarUsuario$ = createEffect(
            () => this.actions$.pipe(
                    ofType( usuarioActions.cargarUsuario ),
                    mergeMap(
                            (action) => this.usuariosService.getUserById(action.id)
                                    .pipe(
                                            map(user => usuarioActions.cargarUsuarioSuccess({ usuario: user }) ),
                                            catchError( err => of(usuarioActions.cargarUsuarioError({payload: err})))
                                    )
                    )
            )
    );
}
